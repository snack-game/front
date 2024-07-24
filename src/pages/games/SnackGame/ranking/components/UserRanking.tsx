import { useTranslation } from 'react-i18next';

import { Level } from '@components/Level/Level';
import { GameSeasonProps } from '@utils/types/common.type';

import {
  useGetSeasonRankingMe,
  useGetUserRanking,
} from '@hooks/queries/ranking.query';

const UserRanking = ({ season, gameId }: GameSeasonProps) => {
  const { t } = useTranslation('ranking');

  let userRanking;

  if (season === 0) {
    userRanking = useGetUserRanking(gameId);
  } else {
    userRanking = useGetSeasonRankingMe({ season, gameId });
  }

  return (
    <>
      {userRanking && (
        <div className="m-auto mb-20 mt-8 w-[90%] rounded-full border-2 border-primary bg-primary-light px-6 py-3 text-primary-deep-dark lg:w-1/2">
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
            <div>
              {userRanking?.score} {t('score')}
            </div>
            <div>
              {userRanking?.rank} {t('rank')}!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRanking;
