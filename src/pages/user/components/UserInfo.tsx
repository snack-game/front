import { useState } from 'react';

import Spacing from '@components/Spacing/Spacing';
import ChartSection from '@pages/user/components/ChartSection';
import ProfileSection from '@pages/user/components/ProfileSection';

const UserInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickDone = () => {
    setIsEditing(false);
    // 프로필 수정 요청
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
