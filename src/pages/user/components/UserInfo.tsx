import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useResetRecoilState } from 'recoil';

import authApi from '@api/auth.api';
import Spacing from '@components/Spacing/Spacing';
import ChartSection from '@pages/user/components/ChartSection';
import GuestToMember from '@pages/user/components/GuestToMember';
import ProfileSection from '@pages/user/components/ProfileSection';
import { resetUserState } from '@utils/atoms/member.atom';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import { useGetMemberProfile } from '@hooks/queries/members.query';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

const UserInfo = () => {
  const profile = useGetMemberProfile();
  const [isEditing, setIsEditing] = useState(false);

  const openToast = useToast();
  const resetUser = useResetRecoilState(resetUserState);
  const navigate = useNavigate();
  const { deleteStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleClickDone = () => {
    setIsEditing(false);
  };

  const handleClickClose = () => {
    setIsEditing(false);
  };

  const handleLogout = async () => {
    resetUser();
    await authApi.logOut();
    openToast('로그아웃 성공!', 'success');
    deleteStorageValue();
    navigate(PATH.MAIN, { replace: true });
  };

  return (
    <div className="relative mt-20 h-full pt-20">
      <button
        className="absolute right-0 top-14 z-10 mr-2 text-gray-400"
        onClick={handleLogout}
      >
        로그아웃
      </button>
      <div className={'flex min-h-full flex-col items-center bg-game pb-20'}>
        {profile && (
          <ProfileSection
            profile={profile}
            isEditing={isEditing}
            onClickEdit={handleClickEdit}
            onClickDone={handleClickDone}
            onClickClose={handleClickClose}
          />
        )}
        <Spacing size={14} />
        {profile.type === 'GUEST' && <GuestToMember />}
        {profile.type !== 'GUEST' && !isEditing && <ChartSection />}
      </div>
    </div>
  );
};

export default UserInfo;
