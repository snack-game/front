import { useTranslation } from 'react-i18next';

import { useRecoilValue } from 'recoil';

import LogoImage from '@assets/images/main.png';
import OtherRanking from '@pages/games/SnackGame/ranking/components/OtherRanking';
import TopRanking from '@pages/games/SnackGame/ranking/components/TopRanking';
import { userState } from '@utils/atoms/member.atom';
import { RankingViewType } from '@utils/types/common.type';

import {
  useGetSeasonRanking,
  useGetTotalRanking,
} from '@hooks/queries/ranking.query';

import UserRanking from './UserRanking';

interface RankingSectionProps {
  season: number;
  gameId: RankingViewType;
}

const RankingSection = ({ season, gameId }: RankingSectionProps) => {
  let totalRanking;

  const userInfo = useRecoilValue(userState);

  if (season === 0) {
    totalRanking = useGetTotalRanking(gameId);
  } else {
    totalRanking = useGetSeasonRanking(season, gameId);
  }

  const topRanking = totalRanking?.slice(0, 3);
  const otherRanking = totalRanking?.slice(3);

  if (totalRanking.length === 0) return <EmptyRanking />;
  return (
    <div className={'mx-auto w-full max-w-4xl'}>
      {topRanking && <TopRanking topRanking={topRanking} />}
      {otherRanking && <OtherRanking otherRanking={otherRanking} />}
      {userInfo.type && userInfo.type !== 'GUEST' && (
        <UserRanking season={season} gameId={gameId} />
      )}
    </div>
  );
};

const EmptyRanking = () => {
  const { t } = useTranslation('ranking');

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={LogoImage} />
      <p className="whitespace-pre-line text-center text-primary-deep-dark">
        {t('empty')}
      </p>
    </div>
  );
};

export default RankingSection;
