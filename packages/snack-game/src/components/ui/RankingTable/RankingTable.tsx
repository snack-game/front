import styled from '@emotion/styled';

import TopRankingCard from '@components/common/Card/TopRankingCard';
import Table from '@components/common/Table/Table';
import TableItem from '@components/common/Table/TableItem';

import { useGetTotalRanking } from '@hooks/queries/ranking.query';

const RankingTable = () => {
  const tableTitle = ['랭킹', '이름', '점수'];
  const totalRanking = useGetTotalRanking();

  const topRanking = totalRanking?.slice(0, 3);
  const otherRanking = totalRanking?.slice(3);

  return (
    <RankingTableWrapper>
      <TopRankingCardWrapper>
        {topRanking?.map((item) => {
          return <TopRankingCard key={item.ranking} rankInfo={item} />;
        })}
      </TopRankingCardWrapper>
      <Table tableTitle={tableTitle}>
        {otherRanking?.map((item, index) => {
          return (
            <TableItem
              key={index + 3}
              ranking={item.ranking}
              name={item.owner.name}
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
