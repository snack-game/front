import Spacing from '@components/Spacing/Spacing';

import HistoryChart from './HistoryChart';
import Profile from './Profile';

const UserInfo = () => {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-7xl flex-col items-center`}
    >
      <div className={`h-52 w-full bg-rose-100`}></div>
      <Profile />
      <Spacing size={16} />
      <HistoryChart />
    </div>
  );
};

export default UserInfo;
