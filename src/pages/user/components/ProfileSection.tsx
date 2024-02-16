import { useQueryClient } from 'react-query';

import { useSetRecoilState } from 'recoil';

import CameraIcon from '@assets/icon/camera.svg?react';
import EditIcon from '@assets/icon/edit.svg?react';
import DefaultImage from '@assets/images/kakao.png';
import Button from '@components/Button/Button';
import { userState } from '@utils/atoms/member.atom';
import { MemberProfileType } from '@utils/types/member.type';

import { QUERY_KEY } from '@constants/api.constant';
import { NAME_REGEXP } from '@constants/regexp.constant';
import { useChangeUserName } from '@hooks/queries/members.query';
import useInput from '@hooks/useInput';

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

  const setUserState = useSetRecoilState(userState);

  const queryClient = useQueryClient();

  const changeUserName = useChangeUserName();

  const handleClickDone = async () => {
    await changeUserName.mutateAsync(newName);
    setUserState((prev) => ({ ...prev, name: newName }));
    queryClient.invalidateQueries(QUERY_KEY.USER_PROFILE);
    onClickDone();
  };

  return (
    <div className={`absolute top-32 flex flex-col items-center`}>
      <div className="relative">
        <div className={`h-44 w-44 rounded-full bg-rose-200`}></div>
        <img
          className={`absolute left-2 top-2 mb-4 w-40 rounded-full`}
          src={DefaultImage}
        />
        {!isEditing ? (
          <button
            className={`absolute right-2 top-32 h-8 w-8 rounded-full border bg-white`}
            onClick={onClickEdit}
          >
            <EditIcon className="mx-auto" />
          </button>
        ) : (
          <label
            className={`absolute left-2 top-2 h-40 w-40 cursor-pointer rounded-full bg-black bg-opacity-50`}
          >
            <input className="hidden" type="file" />
            <CameraIcon className="mx-auto h-full" />
          </label>
        )}
      </div>

      <span className={`text-2xl`}>레벨</span>
      {isEditing ? (
        <>
          <div className="my-10 flex flex-col items-end gap-y-4">
            <label>
              유저 이름
              <input
                value={newName}
                onChange={handleNameChange}
                className={`ml-2 rounded-lg border border-primary bg-transparent focus:outline-none`}
              />
            </label>
          </div>

          <div className={`flex gap-2`}>
            <Button
              onClick={onClickClose}
              style={`border`}
              className={`hover:bg-white hover:text-slate-950`}
            >
              닫기
            </Button>
            <Button
              disabled={!nameValid}
              onClick={handleClickDone}
              className="bg-button-enabled disabled:bg-button-disabled"
            >
              확인
            </Button>
          </div>
        </>
      ) : (
        <>
          {profile.group && (
            <span className={`text-lg`}>{profile.group.name}</span>
          )}
          <span className={`text-xl`}>{profile.name}</span>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
