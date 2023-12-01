import styled from '@emotion/styled/dist/emotion-styled.cjs';

interface SimpleCardProps {
  title: string;
  subTitle: string;
  description: string;
}

const SimpleCard = ({ title, subTitle, description }: SimpleCardProps) => {
  return (
    <SimpleCardContainer>
      <Info>
        <h2>{title}</h2>
        <span>{subTitle}</span>
        <p>{description}</p>
      </Info>
    </SimpleCardContainer>
  );
};

export const SimpleCardContainer = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.colors.boxBorder};
  width: 30%;
  margin: auto;
  height: fit-content;
  align-items: center;
  text-align: center;
  min-width: 225px;
`;

const Info = styled.div`
  flex-grow: 1;
  white-space: pre-wrap;
  color: ${(props) => props.theme.colors.orange};

  & > h2 {
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.titleText};
  }

  & > p {
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 0.25rem;
  }

  & > span {
    color: ${(props) => props.theme.colors.description};
  }
`;

export default SimpleCard;
