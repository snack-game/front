import { FC } from 'react';

import styled from '@emotion/styled';

interface FooterProps {
  children?: never;
}

const StyledFooterWrapper = styled.div`
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

const StyledTitle = styled.a`
  display: flex;
  color: #111827;
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

const StyledCopyRight = styled.p`
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;

  @media (min-width: 640px) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    margin-top: 0;
    margin-left: 1rem;
    border-left-width: 2px;
    border-color: #e5e7eb;
  }

  & > a {
    margin-left: 0.25rem;
    color: #4b5563;
  }
`;

const StyledIconProvider = styled.span`
  display: inline-flex;
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.75rem;
  line-height: 1rem;
  justify-content: center;

  @media (min-width: 640px) {
    margin-top: 0;
    margin-left: auto;
    justify-content: flex-start;
  }
`;

const Footer: FC<FooterProps> = () => {
  return (
    <StyledFooterWrapper>
      <StyledTitle>
        <span>SnackGame</span>
      </StyledTitle>
      <StyledCopyRight>
        © 2023 SnackGame —
        <a rel="noopener noreferrer" target="_blank">
          @dev-dong-su, @0chil
        </a>
      </StyledCopyRight>
      <StyledIconProvider>
        <a href="https://www.flaticon.com/kr/free-icons/" title="아이콘">
          아이콘 제작자: Freepik - Flaticon
        </a>
      </StyledIconProvider>
    </StyledFooterWrapper>
  );
};

export default Footer;
