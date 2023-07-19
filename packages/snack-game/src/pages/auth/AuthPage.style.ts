import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  padding: 6rem 1.25rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const TextWrapper = styled.div`
  padding-right: 0;

  @media (min-width: 768px) {
    padding-right: 4rem;
    width: 50%;
  }
  @media (min-width: 1024px) {
    padding-right: 0;
    width: 60%;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 500;
  color: #111827;
`;

export const Description = styled.p`
  margin-top: 1rem;
  line-height: 1.625;
  color: #6b7280;
`;
