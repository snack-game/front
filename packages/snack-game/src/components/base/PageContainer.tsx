import React, { FC, ReactNode } from 'react';

import styled from '@emotion/styled';

import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainerWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    max-width: 1280px;
  }
`;

const PageContainerInner = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 2rem;
  height: auto;

  @media (min-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2.5rem;
  }
`;

const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
  return (
    <>
      <Header />
      <PageContainerWrapper>
        <PageContainerInner className={className}>
          {children}
        </PageContainerInner>
      </PageContainerWrapper>
      <Footer />
    </>
  );
};

export default PageContainer;
