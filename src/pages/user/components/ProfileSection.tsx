import { useQueryClient } from 'react-query';

import { useSetRecoilState } from 'recoil';

import CameraIcon from '@assets/icon/camera.svg?react';
import EditIcon from '@assets/icon/edit.svg?react';
import DefaultImage from '@assets/images/profile_image.png';
import Button from '@components/Button/Button';
import { userState } from '@utils/atoms/member.atom';
import { MemberProfileType } from '@utils/types/member.type';

import { QUERY_KEY } from '@constants/api.constant';
import { GROUP_CHANGE_REGEXP, NAME_REGEXP } from '@constants/regexp.constant';
import {
  useChangeGroupName,
  useGetGroupsNames,
} from '@hooks/queries/groups.query';
import { useChangeUserName } from '@hooks/queries/members.query';
import useDebounce from '@hooks/useDebounce';
import useInput from '@hooks/useInput';

import ExpChart from './ExpChart';

interface ProfileSectionProps {
  profile: MemberProfileType;
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

  const handleClickDone = async () => {
    if (profile.name !== newName) {
      await changeUserName.mutateAsync(newName);
    }
    if (profile.group?.name !== newGroup) {
      await changeGroupName.mutateAsync(newGroup);
    }

    setUserState((prev) => ({
      member: {
        ...prev.member,
        name: newName,
        group: { name: newGroup },
      },
    }));
    queryClient.invalidateQueries(QUERY_KEY.USER_PROFILE);
    onClickDone();
  };

  return (
    <div className={'absolute top-32 flex flex-col items-center'}>
      <div className={'relative'}>
        <ExpChart status={profile.status} />
        <img
          className={'absolute left-2 top-2 mb-4 w-40 rounded-full'}
          src={DefaultImage}
        />

        {!isEditing ? (
          <button
            className={
              'absolute right-2 top-32 h-8 w-8 rounded-full border bg-white'
            }
            onClick={onClickEdit}
          >
            <EditIcon className={'mx-auto'} />
          </button>
        ) : (
          <></>
        )}
      </div>
      {isEditing ? (
        <>
          <div className={'my-10'}>
            <label className={'flex gap-2 text-lg'}>
              이름
              <div className={'flex grow flex-col gap-1'}>
                <input
                  value={newName}
                  onChange={handleNameChange}
                  spellCheck={false}
                  className={
                    'grow rounded-lg border border-primary bg-transparent bg-white px-2 focus:outline-none'
                  }
                />

                <span
                  className={`${
                    nameValid && 'invisible'
                  } mb-4 px-1 text-sm text-rose-500`}
                >
                  이름은 2글자 이상, 특수문자를 포함하지 않아야 해요.
                </span>
              </div>
            </label>

            <label className={'flex gap-2 text-lg'}>
              그룹
              <div className={'flex grow flex-col gap-1'}>
                <input
                  list={'group-list'}
                  value={newGroup}
                  onChange={handleGroupChange}
                  spellCheck={false}
                  className={
                    'grow rounded-lg border border-primary bg-transparent bg-white px-2 focus:outline-none'
                  }
                />
                <span
                  className={`${
                    groupValid && 'invisible'
                  } px-1 text-sm text-rose-500`}
                >
                  그룹은 2글자 이상, 특수문자를 포함하지 않아야 해요.
                </span>
              </div>
            </label>
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
              onClick={onClickClose}
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
          <span className={'text-xl text-primary-deep-dark'}>
            레벨 {profile.status.level}
          </span>
          {profile.group && (
            <span className={'text-lg text-primary-deep-dark'}>
              {profile.group.name}
            </span>
          )}
          <span className={'text-2xl text-primary'}>{profile.name}</span>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
