import styled from '@emotion/styled';

import TopRankingCard from '@components/common/Card/TopRankingCard';
import RankingTableItem from '@components/common/Table/RankingTableItem';
import Table from '@components/common/Table/Table';

import { useGetTotalRanking } from '@hooks/queries/ranking.query';

const RankingTable = () => {
  const tableTitle = ['랭킹', '이름', '그룹', '점수'];
  const totalRanking = useGetTotalRanking();

  const topRanking = totalRanking?.slice(0, 3);
  const otherRanking = totalRanking?.slice(3);

  return (
    <RankingTableWrapper>
      <TopRankingCardWrapper>
        {topRanking?.map((item) => {
          return <TopRankingCard key={item.owner.name} rankInfo={item} />;
        })}
      </TopRankingCardWrapper>
      <Table tableTitle={tableTitle}>
        {otherRanking?.map((item) => {
          return (
            <RankingTableItem
              key={item.owner.name}
              rank={item.rank}
              name={item.owner.name}
              group={item.owner.group}
              score={item.score}
            />
          );
        })}
      </Table>
    </RankingTableWrapper>
  );
};

const RankingTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopRankingCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2rem;
  gap: 2rem;
`;

export default RankingTable;
