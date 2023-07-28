import styled from '@emotion/styled';

import theme from '@utils/theme';

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 1.25rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const Title = styled.a`
  display: flex;
  color: ${theme.colors.titleText};
  font-weight: 500;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  & > span {
    margin-left: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

export const CopyRight = styled.p`
  margin-top: 1rem;
  color: ${theme.colors.description};
  font-size: 0.875rem;
  line-height: 1.25rem;

  @media (min-width: 640px) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    margin-top: 0;
    margin-left: 1rem;
    border-left-width: 2px;
    border-color: ${theme.colors.boxBorder};
  }

  & > a {
    margin-left: 0.25rem;
    color: #4b5563;
  }
`;

export const IconProvider = styled.span`
  display: inline-flex;
  margin-top: 1rem;
  color: ${theme.colors.description};
  font-size: 0.75rem;
  line-height: 1rem;
  justify-content: center;

  @media (min-width: 640px) {
    margin-top: 0;
    margin-left: auto;
    justify-content: flex-start;
  }
`;
