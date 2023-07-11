import React, { FC, ReactNode } from 'react';

import styled from '@emotion/styled';

import Footer from '@components/ui/Footer/Footer';
import Header from '@components/ui/Header/Header';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <>
      <Header />
      <PageContainerWrapper>
        <PageContainerInner>{children}</PageContainerInner>
      </PageContainerWrapper>
      <Footer />
    </>
  );
};

export default PageContainer;

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
