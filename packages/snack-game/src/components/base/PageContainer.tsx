import React, { FC, ReactNode } from 'react';

import tw from 'tailwind-styled-components';

import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainerWrapper = tw.div`
mx-auto mx-auto md:max-w-screen-xl max-md:min-w-sm
`;

const PageContainerInner = tw.div`
h-auto
pb-8 md:pb-10
px-1 md:px-4
font-dove
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
