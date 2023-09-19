import Table from '@components/common/Table/Table';
import TableItem from '@components/common/Table/TableItem';

import { useGetTotalRanking } from '@hooks/queries/ranking.query';

const RankingTable = () => {
  const tableTitle = ['랭킹', '이름', '점수'];
  const totalRanking = useGetTotalRanking();

  return (
    <Table tableTitle={tableTitle}>
      {totalRanking?.map((item, index) => {
        return (
          <TableItem
            key={index}
            ranking={item.ranking}
            name={item.owner.name}
            score={item.score}
          />
        );
      })}
    </Table>
  );
};

export default RankingTable;
