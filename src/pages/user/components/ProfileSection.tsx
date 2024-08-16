import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { userState } from '@utils/atoms/member.atom';
import { convertHeic } from '@utils/heicConverter';
import { MemberType } from '@utils/types/member.type';

import { QUERY_KEY } from '@constants/api.constant';
import { GROUP_CHANGE_REGEXP, NAME_REGEXP } from '@constants/regexp.constant';
import { useChangeGroupName } from '@hooks/queries/groups.query';
import {
  useChangeUserImage,
  useChangeUserName,
} from '@hooks/queries/members.query';
import useInput from '@hooks/useInput';
import useToast from '@hooks/useToast';

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
  const openToast = useToast();

  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);

  const newName = useInput<string>({
    initialValue: profile.name || '',
    isValid: (name) => NAME_REGEXP.test(name),
  });

  const newGroup = useInput<string>({
    initialValue: profile.group?.name || '',
    isValid: (group) => (group ? GROUP_CHANGE_REGEXP.test(group) : true),
  });

  const setUserState = useSetRecoilState(userState);
  const queryClient = useQueryClient();

  const changeUserName = useChangeUserName();
  const changeGroupName = useChangeGroupName();
  const changeUserImage = useChangeUserImage();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files !== null) {
      let imageFile = event.target.files[0];
      if (imageFile.type == 'image/heic') {
        try {
          imageFile = await convertHeic(imageFile);
        } catch (error) {
          openToast('사용할 수 없는 이미지입니다', 'error');
          return;
        }
      }
      setNewImageFile(imageFile);
      setNewImage(URL.createObjectURL(imageFile));
    }
  };

  const handleProfileChange = async () => {
    let newProfile = undefined;

    if (profile.name !== newName.value) {
      newProfile = await changeUserName.mutateAsync(newName.value);
    }
    if (profile.group?.name !== newGroup.value) {
      if (profile.group === null && newGroup.value === '') return;
      newProfile = await changeGroupName.mutateAsync(newGroup.value || null);
    }
    if (newImageFile !== null) {
      newProfile = await changeUserImage.mutateAsync(newImageFile);
      setNewImageFile(null);
    }

    return newProfile;
  };

  const handleClickDone = async () => {
    const newProfile = await handleProfileChange();

    if (newProfile) {
      setUserState({ ...newProfile });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_PROFILE] });
    }

    onClickDone();
  };

  return (
    <div className={'absolute top-0 flex flex-col items-center'}>
      <div className={'relative'}>
        {profile.status && <ExpChart status={profile.status} />}
        <div
          className={
            'absolute left-2 top-2 mb-4 h-40 w-40 rounded-full bg-white'
          }
        />
        <img
          className={
            'absolute left-2 top-2 mb-4 h-40 w-40 rounded-full object-cover'
          }
          src={newImage || profile.profileImage}
        />
        {profile.type !== 'GUEST' && (
          <EditImage
            isEditing={isEditing}
            onClickEdit={onClickEdit}
            onChangeFile={handleFileChange}
          />
        )}
      </div>

      {isEditing ? (
        <EditInfo
          newName={newName}
          newGroup={newGroup}
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
