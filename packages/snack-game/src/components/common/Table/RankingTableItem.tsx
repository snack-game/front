import styled from '@emotion/styled';

import { GroupType } from '@utils/types/member.type';

interface TableItemProps {
  rank: number;
  name: string;
  group: GroupType | null;
  score: number;
}

const TableItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 1.5rem 2.5rem;
  border: 1.5px solid ${(props) => props.theme.colors.boxBorder};
  border-radius: 15px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.titleText};
  margin-bottom: 0.5rem;

  & > p {
    color: ${(props) => props.theme.colors.orange};
  }

  & > span,
  & > p {
    flex: 1;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 0.1rem;
  }
`;

const RankingTableItem = ({ rank, name, group, score }: TableItemProps) => {
  return (
    <TableItemContainer>
      <p>{rank}</p>
      <span>{name}</span>
      <span>{group?.name == null || group?.name == '' ? 'x' : group.name}</span>
      <p>{score}</p>
    </TableItemContainer>
  );
};

export default RankingTableItem;
