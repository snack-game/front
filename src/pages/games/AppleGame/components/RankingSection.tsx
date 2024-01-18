import OtherRanking from '@pages/games/AppleGame/components/OtherRanking';
import TopRanking from '@pages/games/AppleGame/components/TopRanking';

import { useGetTotalRanking } from '@hooks/queries/ranking.query';

const RankingSection = () => {
  const totalRanking = useGetTotalRanking();

  const topRanking = totalRanking?.slice(0, 3);
  const otherRanking = totalRanking?.slice(3);

  return (
    <div className={'mx-auto w-full max-w-4xl'}>
      {topRanking && <TopRanking topRanking={topRanking} />}
      {otherRanking && <OtherRanking otherRanking={otherRanking} />}
    </div>
  );
};

export default RankingSection;
