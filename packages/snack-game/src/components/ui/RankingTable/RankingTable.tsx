import Loading from '@components/common/Loading';
import Table from '@components/common/Table/Table';
import TableItem from '@components/common/Table/TableItem';

import { useGetTotalRanking } from '@hooks/queries/ranking.query';

const RankingTable = () => {
  const tableTitle = ['랭킹', '이름', '점수'];
  const { isLoading, data } = useGetTotalRanking();

  return (
    <Table tableTitle={tableTitle}>
      {isLoading ? (
        <Loading />
      ) : (
        data?.map((item, index) => {
          return (
            <TableItem
              key={index}
              ranking={item.ranking}
              name={item.owner.name}
              score={item.score}
            />
          );
        })
      )}
    </Table>
  );
};

export default RankingTable;
