import styled from '@emotion/styled';

import theme from '@utils/theme';

interface TableProps {
  children?: React.ReactNode;
  title?: string;
  tableTitle?: string[];
}

const TableContainer = styled.div`
  width: 100%;
`;

const TableTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  border-radius: 15px;
  background-color: ${theme.colors.primaryButton};
  color: white;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Table = ({ children, tableTitle }: TableProps) => {
  return (
    <TableContainer>
      {tableTitle && (
        <TableTitle>
          {tableTitle.map((title) => (
            <div key={title}>{title}</div>
          ))}
        </TableTitle>
      )}
      {children}
    </TableContainer>
  );
};

export default Table;
