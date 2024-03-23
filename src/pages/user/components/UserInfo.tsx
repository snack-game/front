import { useState } from 'react';

import Spacing from '@components/Spacing/Spacing';
import ChartSection from '@pages/user/components/ChartSection';
import ProfileSection from '@pages/user/components/ProfileSection';

import { useGetMemberProfile } from '@hooks/queries/members.query';

const UserInfo = () => {
  const profile = useGetMemberProfile();
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
    <div
      className={'relative mx-auto flex w-full max-w-7xl flex-col items-center'}
    >
      <div
        className={
          'mt-52 flex h-fit w-full flex-col items-center rounded-xl bg-game pb-24'
        }
      >
        {profile && (
          <ProfileSection
            profile={profile}
            isEditing={isEditing}
            onClickEdit={handleClickEdit}
            onClickDone={handleClickDone}
            onClickClose={handleClickClose}
          />
        )}
        <Spacing size={16} />
        {!isEditing && <ChartSection />}
      </div>
    </div>
  );
};

export default UserInfo;
