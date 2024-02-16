import { useState } from 'react';

import Spacing from '@components/Spacing/Spacing';
import ChartSection from '@pages/user/components/ChartSection';
import ProfileSection from '@pages/user/components/ProfileSection';

import { useGetMemberProfile } from '@hooks/queries/members.query';

const UserInfo = () => {
  const profile = useGetMemberProfile();
  const [isEditing, setIsEditing] = useState(false);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickDone = () => {
    setIsEditing(false);
  };

  const onClickClose = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`relative mx-auto flex w-full max-w-7xl flex-col items-center`}
    >
      <div className={`h-52 w-full bg-rose-100`}></div>
      <ProfileSection
        profile={profile}
        isEditing={isEditing}
        onClickEdit={onClickEdit}
        onClickDone={onClickDone}
        onClickClose={onClickClose}
      />
      <Spacing size={16} />
      {!isEditing && <ChartSection />}
    </div>
  );
};

export default UserInfo;
