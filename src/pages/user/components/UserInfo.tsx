import { useState } from 'react';

import SettingIcon from '@assets/icon/settings.svg?react';
import RouterLink from '@components/RouterLink/RouterLink';
import Spacing from '@components/Spacing/Spacing';
import ChartSection from '@pages/user/components/ChartSection';
import GuestToMember from '@pages/user/components/GuestToMember';
import ItemSection from '@pages/user/components/ItemSection';
import ProfileSection from '@pages/user/components/ProfileSection';

import PATH from '@constants/path.constant';
import { useGetMemberProfile } from '@hooks/queries/members.query';

const UserInfo = () => {
  const { data: profile, isFetching } = useGetMemberProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleClickDone = () => {
    setIsEditing(false);
  };

  const handleClickClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative mt-20 h-full pt-20">
      <RouterLink to={PATH.SETTING}>
        <SettingIcon className="absolute right-0 top-12 mr-2" />
      </RouterLink>
      <div className={'flex min-h-full flex-col items-center bg-game pb-20'}>
        {!isFetching && (
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
        {profile.type !== 'GUEST' && !isEditing && (
          <>
            <ItemSection />
            <Spacing size={2} />
            <ChartSection />
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
