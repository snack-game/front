import styled from '@emotion/styled';

import theme from '@utils/theme';

interface TableItemProps {
  ranking: number;
  name: string;
  score: number;
}

const TableItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 1.5rem 2.5rem;
  border: 1.5px solid ${theme.colors.boxBorder};
  border-radius: 15px;
  font-size: 1rem;
  color: ${theme.colors.titleText};
  margin-bottom: 0.5rem;
`;

const TableItem = ({ ranking, name, score }: TableItemProps) => {
  return (
    <TableItemContainer>
      <p>{ranking}</p>
      <p>{name}</p>
      <p>{score}</p>
    </TableItemContainer>
  );
};

export default TableItem;