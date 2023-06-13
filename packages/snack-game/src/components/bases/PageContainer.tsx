import React, { FC, ReactNode } from 'react';

import tw from 'tailwind-styled-components';

interface PageContainerProps {
	children: ReactNode;
	className?: string;
	footerBgTransparent?: boolean;
}

const PageContainerWrapper = tw.div`
mx-auto mx-auto md:max-w-screen-xl max-md:min-w-sm
`;

const PageContainerInner = tw.div`
h-auto
pb-[14rem] md:pb-[14rem]
min-h-[calc(100vh-13rem)]
md:min-h-[calc(100vh-13rem)]
px-1 md:px-4
`;

const PageContainer: FC<PageContainerProps> = ({children, className}) => {
	return (
		<>
			<PageContainerWrapper>
				<PageContainerInner className={className}>
					{children}
				</PageContainerInner>
			</PageContainerWrapper>
		</>
	);
};

export default PageContainer;
