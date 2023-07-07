import { FC } from 'react';

import styled from '@emotion/styled';

import LoadingImage from '@assets/images/logo.png';

interface LoadingProps {
  children?: never;
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Image = styled.img`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  width: 2.5rem;
  height: 2.5rem;
`;

const Loading: FC<LoadingProps> = () => {
  return (
    <LoadingWrapper>
      <Image src={LoadingImage} alt={'loading image'} />
    </LoadingWrapper>
  );
};

export default Loading;
