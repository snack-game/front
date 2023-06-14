import React, { FC, ReactNode } from 'react';

import tw from 'tailwind-styled-components';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainerWrapper = tw.div`
mx-auto mx-auto md:max-w-screen-xl max-md:min-w-sm h-screen font-omyu
`;

const PageContainerInner = tw.div`
h-auto
pb-[14rem] md:pb-[14rem]
min-h-[calc(100vh-13rem)]
md:min-h-[calc(100vh-13rem)]
px-1 md:px-4
`;

const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
  return (
    <>
      <PageContainerWrapper>
        <PageContainerInner className={className}>
          {children}
        </PageContainerInner>
        {/*<div>*/}
        {/*  <a href="https://www.flaticon.com/kr/free-icons/" title="사과 아이콘">*/}
        {/*    사과 아이콘 제작자: Freepik - Flaticon*/}
        {/*  </a>*/}
        {/*</div>*/}
      </PageContainerWrapper>
    </>
  );
};

export default PageContainer;
