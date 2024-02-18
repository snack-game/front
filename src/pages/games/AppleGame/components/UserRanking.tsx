import { useEffect } from 'react';

import { useGetUserRanking } from '@hooks/queries/ranking.query';

const UserRanking = () => {
  const userRanking = useGetUserRanking();

  return (
    <div className="fixed bottom-5 left-1/2 w-[90%] -translate-x-1/2 rounded-full border-2 border-primary bg-primary-light px-6 py-3 text-primary-deep-dark lg:w-1/3">
      <div className="flex h-full w-full items-center justify-around">
        <div className="flex flex-col">
          <div className="text-xs">{userRanking?.owner.group?.name}</div>
          <div className="text-primary">{userRanking?.owner.name}</div>
        </div>
        <div>{userRanking?.score} 점</div>
        <div>{userRanking?.rank} 등!</div>
      </div>
    </div>
  );
};

export default UserRanking;
