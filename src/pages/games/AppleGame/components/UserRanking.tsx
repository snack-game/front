import { Level } from '@components/Level/Level';

import {
  useGetSeasonRankingMe,
  useGetUserRanking,
} from '@hooks/queries/ranking.query';

interface UserRankingProps {
  season: number;
}

const UserRanking = ({ season }: UserRankingProps) => {
  let userRanking;

  if (season === 0) {
    userRanking = useGetUserRanking();
  } else {
    userRanking = useGetSeasonRankingMe(season);
  }

  return (
    <div className="fixed bottom-5 left-1/2 w-[90%] -translate-x-1/2 rounded-full border-2 border-primary bg-primary-light px-6 py-3 text-primary-deep-dark lg:w-1/3">
      <div className="flex h-full w-full items-center justify-around">
        <div className="flex flex-col">
          <div className="text-xs">{userRanking?.owner.group?.name}</div>
          <div className="flex items-center gap-2">
            <div className="text-primary">{userRanking?.owner.name}</div>
            {userRanking?.owner.status?.level !== undefined && (
              <Level level={userRanking.owner.status.level} />
            )}
          </div>
        </div>
        <div>{userRanking?.score} 점</div>
        <div>{userRanking?.rank} 등!</div>
      </div>
    </div>
  );
};

export default UserRanking;
