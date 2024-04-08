import { useRecoilValue } from 'recoil';

import OtherRanking from '@pages/games/AppleGame/components/OtherRanking';
import TopRanking from '@pages/games/AppleGame/components/TopRanking';
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

export default RankingSection;
