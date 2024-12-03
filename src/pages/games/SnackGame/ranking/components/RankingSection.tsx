import { useTranslation } from 'react-i18next';

import { useRecoilValue } from 'recoil';

import LogoImage from '@assets/images/main.avif';
import LogoWebpImage from '@assets/images/main.webp';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';
import Spacing from '@components/Spacing/Spacing';
import OtherRanking from '@pages/games/SnackGame/ranking/components/OtherRanking';
import TopRanking from '@pages/games/SnackGame/ranking/components/TopRanking';
import { userState } from '@utils/atoms/member.atom';
import { GameSeasonProps } from '@utils/types/common.type';

import {
  useGetSeasonRanking,
  useGetTotalRanking,
} from '@hooks/queries/ranking.query';

import UserRanking from './UserRanking';

const RankingSection = ({ season, gameId }: GameSeasonProps) => {
  let totalRanking;

  const userInfo = useRecoilValue(userState);

  if (season === 0) {
    totalRanking = useGetTotalRanking(gameId);
  } else {
    totalRanking = useGetSeasonRanking({ season, gameId });
  }

  const topRanking = totalRanking?.slice(0, 3);
  const otherRanking = totalRanking?.slice(3);

  if (totalRanking.length === 0) return <EmptyRanking />;
  return (
    <div className={'mx-auto mb-16 w-full max-w-4xl'}>
      {userInfo.type && userInfo.type !== 'GUEST' ? (
        <UserRanking season={season} gameId={gameId} />
      ) : (
        <Spacing size={5} />
      )}
      {topRanking && <TopRanking topRanking={topRanking} />}
      {otherRanking && <OtherRanking otherRanking={otherRanking} />}
    </div>
  );
};

const EmptyRanking = () => {
  const { t } = useTranslation('ranking');

  return (
    <div className="flex flex-col items-center justify-center">
      <ImageWithFallback
        sources={[{ srcSet: LogoImage, type: 'avif' }]}
        src={LogoWebpImage}
        alt="empty ranking"
        className="h-[250px] w-[250px]"
      />
      <p className="whitespace-pre-line text-center text-primary-deep-dark">
        {t('empty')}
      </p>
    </div>
  );
};

export default RankingSection;
