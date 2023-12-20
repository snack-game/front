import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

import Footer from '@components/ui/Footer/Footer';
import Header from '@components/ui/Header/Header';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <PageContainerWrapper>
      <Header />
      <PageContainerInner>{children}</PageContainerInner>
      <Footer />
    </PageContainerWrapper>
  );
};

export default PageContainer;

const PageContainerWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const PageContainerInner = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 2rem;

  @media (min-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2.5rem;
  }
`;
