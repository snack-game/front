import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import { QUERY_KEY } from '@constants/api.constant';
import { GROUP_CHANGE_REGEXP, NAME_REGEXP } from '@constants/regexp.constant';
import {
  useChangeGroupName,
  useGetGroupsNames,
} from '@hooks/queries/groups.query';
import {
  useChangeUserImage,
  useChangeUserName,
} from '@hooks/queries/members.query';
import useDebounce from '@hooks/useDebounce';
import useInput from '@hooks/useInput';

import EditImage from './EditImage';
import EditInfo from './EditInfo';
import ExpChart from './ExpChart';

interface ProfileSectionProps {
  profile: MemberType;
  isEditing: boolean;
  onClickEdit: () => void;
  onClickDone: () => void;
  onClickClose: () => void;
}

const ProfileSection = ({
  profile,
  isEditing,
  onClickEdit,
  onClickDone,
  onClickClose,
}: ProfileSectionProps) => {
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);

  const newName = useInput<string>({
    initialValue: profile.name || '',
    isInvalid: (name) => NAME_REGEXP.test(name),
  });

  const newGroup = useInput<string>({
    initialValue: profile.group?.name || '',
    isInvalid: (group) => GROUP_CHANGE_REGEXP.test(group),
  });

  const debounceValue = useDebounce({
    target: newGroup.value,
    delay: 300,
  });
  const { data } = useGetGroupsNames({
    startWidth: debounceValue,
    enabled: !!debounceValue,
  });

  const setUserState = useSetRecoilState(userState);

  const queryClient = useQueryClient();

  const changeUserName = useChangeUserName();
  const changeGroupName = useChangeGroupName();
  const changeUserImage = useChangeUserImage();

  const handleClickDone = async () => {
    if (profile.name !== newName.value) {
      await changeUserName.mutateAsync(newName.value);
    }
    if (profile.group?.name !== newGroup.value) {
      await changeGroupName.mutateAsync(newGroup.value);
    }
    if (newImageFile !== null) {
      await changeUserImage.mutateAsync(newImageFile);
    }

    setUserState((prevInfo) => ({
      ...prevInfo,
      name: newName.value,
      group: { name: newGroup.value },
    }));
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_PROFILE] });
    onClickDone();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setNewImageFile(event.target.files[0]);
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className={'absolute top-32 flex flex-col items-center'}>
      <div className={'relative'}>
        {profile.status && <ExpChart status={profile.status} />}
        <img
          className={
            'absolute left-2 top-2 mb-4 h-40 w-40 rounded-full object-cover'
          }
          src={newImage || profile.profileImage}
        />
        <EditImage
          isEditing={isEditing}
          onClickEdit={onClickEdit}
          onChangeFile={handleFileChange}
        />
      </div>

      {isEditing ? (
        <EditInfo
          newName={newName}
          newGroup={newGroup}
          groupSearchResult={data}
          onClickDone={handleClickDone}
          onClickClose={() => {
            setNewImage(null);
            newName.setFieldValue(profile.name || '');
            newGroup.setFieldValue(profile.group?.name || '');
            onClickClose();
          }}
        />
      ) : (
        <>
          <span className={'mt-6 text-lg text-primary-deep-dark'}>
            {profile.group && profile.group.name}
          </span>
          <span className={'text-2xl text-primary'}>{profile.name}</span>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
