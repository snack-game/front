import { useRecoilValue } from 'recoil';

import OtherRanking from '@pages/games/AppleGame/components/OtherRanking';
import TopRanking from '@pages/games/AppleGame/components/TopRanking';
import { userState } from '@utils/atoms/member.atom';

import { useGetTotalRanking } from '@hooks/queries/ranking.query';

import UserRanking from './UserRanking';

const RankingSection = () => {
  const totalRanking = useGetTotalRanking();
  const userInfo = useRecoilValue(userState);

  const topRanking = totalRanking?.slice(0, 3);
  const otherRanking = totalRanking?.slice(3);

  return (
    <div className={'mx-auto w-full max-w-4xl'}>
      {topRanking && <TopRanking topRanking={topRanking} />}
      {otherRanking && <OtherRanking otherRanking={otherRanking} />}
      {userInfo.member.id && <UserRanking />}
    </div>
  );
};

export default RankingSection;
