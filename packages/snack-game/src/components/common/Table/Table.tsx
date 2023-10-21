import styled from '@emotion/styled';

interface TableProps {
  children?: React.ReactNode;
  title?: string;
  tableTitle?: string[];
}

const TableContainer = styled.div`
  width: 70%;
  margin: auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const TableTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.orange};
  color: white;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;

  & > div {
    flex: 1;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 0.1rem;
  }
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
