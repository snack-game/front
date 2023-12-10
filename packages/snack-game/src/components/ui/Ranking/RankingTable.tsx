import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';

import RankingTableItem from '@components/common/Table/RankingTableItem';
import Table from '@components/common/Table/Table';
import TopRankingCard from '@components/ui/Ranking/TopRankingCard';

import { useGetTotalRanking } from '@hooks/queries/ranking.query';

const RankingTable = () => {
  const { t } = useTranslation();
  const tableTitle = [t('rank_title'), t('name'), t('group'), t('score')];
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
