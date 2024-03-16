import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
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

  const {
    value: newName,
    handleChangeValue: handleNameChange,
    valid: nameValid,
  } = useInput<string>({
    initialValue: profile.name || '',
    isInvalid: (name) => NAME_REGEXP.test(name),
  });
  const {
    value: newGroup,
    handleChangeValue: handleGroupChange,
    valid: groupValid,
    setFieldValue,
  } = useInput<string>({
    initialValue: profile.group?.name || '',
    isInvalid: (group) => GROUP_CHANGE_REGEXP.test(group),
  });

  const debounceValue = useDebounce({
    target: newGroup,
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
    if (profile.name !== newName) {
      await changeUserName.mutateAsync(newName);
    }
    if (profile.group?.name !== newGroup) {
      await changeGroupName.mutateAsync(newGroup);
    }
    if (newImageFile !== null) {
      await changeUserImage.mutateAsync(newImageFile);
    }

    setUserState((prevInfo) => ({
      ...prevInfo,
      name: newName,
      group: { name: newGroup },
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
        <>
          <div className={'my-10'}>
            <Input
              fieldLabel={'이름'}
              value={newName}
              onChange={handleNameChange}
              valid={nameValid}
              errorMessage={
                '이름은 2글자 이상, 특수문자를 포함하지 않아야 해요.'
              }
            />

            <Input
              fieldLabel={'그룹'}
              value={newGroup}
              onChange={handleGroupChange}
              list={'group-list'}
              valid={groupValid}
              errorMessage={
                '그룹은 2글자 이상, 특수문자를 포함하지 않아야 해요.'
              }
            />
            {data && (
              <datalist id={'group-list'}>
                {data.map((candidate) => (
                  <option
                    className={
                      'cursor-pointer rounded-lg px-2 py-1 hover:bg-slate-100'
                    }
                    key={candidate}
                    value={candidate}
                    onClick={() => {
                      setFieldValue(candidate);
                    }}
                  ></option>
                ))}
              </datalist>
            )}
          </div>

          <div className={'flex gap-2'}>
            <button
              onClick={() => {
                setNewImage(null);
                onClickClose();
              }}
              className={
                'rounded-md border bg-white px-4 py-1 hover:bg-white hover:text-black '
              }
            >
              닫기
            </button>
            <button
              disabled={!nameValid || !groupValid}
              onClick={handleClickDone}
              className={
                'rounded-md bg-button-enabled px-4 py-1 text-white disabled:cursor-not-allowed disabled:bg-button-disabled disabled:opacity-100'
              }
            >
              확인
            </button>
          </div>
        </>
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
