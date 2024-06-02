import { useRecoilValue } from 'recoil';

import LogoImage from '@assets/images/main.png';
import OtherRanking from '@pages/games/SnackGame/ranking/components/OtherRanking';
import TopRanking from '@pages/games/SnackGame/ranking/components/TopRanking';
import { userState } from '@utils/atoms/member.atom';

import {
  useGetSeasonRanking,
  useGetTotalRanking,
} from '@hooks/queries/ranking.query';

import UserRanking from './UserRanking';

interface RankingSectionProps {
  season: number;
}

const RankingSection = ({ season }: RankingSectionProps) => {
  let totalRanking;

  const userInfo = useRecoilValue(userState);

  if (season === 0) {
    totalRanking = useGetTotalRanking();
  } else {
    totalRanking = useGetSeasonRanking(season);
  }

  const topRanking = totalRanking?.slice(0, 3);
  const otherRanking = totalRanking?.slice(3);

  if (totalRanking.length === 0) return <EmptyRanking />;
  return (
    <div className={'mx-auto w-full max-w-4xl'}>
      {topRanking && <TopRanking topRanking={topRanking} />}
      {otherRanking && <OtherRanking otherRanking={otherRanking} />}
      {userInfo.type && userInfo.type !== 'GUEST' && (
        <UserRanking season={season} />
      )}
    </div>
  );
};

const EmptyRanking = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* TODO: 이미지 교체 */}
      <img src={LogoImage} />
      <p className="text-primary-deep-dark">
        지금 바로 플레이하고 1등에 올라보세요!
      </p>
    </div>
  );
};

export default RankingSection;
