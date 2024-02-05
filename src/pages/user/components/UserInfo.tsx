import { useState } from 'react';

import Spacing from '@components/Spacing/Spacing';

import HistoryChart from './HistoryChart';
import Profile from './Profile';

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
      <Profile
        isEditing={isEditing}
        onClickEdit={onClickEdit}
        onClickDone={onClickDone}
        onClickClose={onClickClose}
      />
      <Spacing size={16} />
      {!isEditing && <HistoryChart />}
    </div>
  );
};

export default UserInfo;
