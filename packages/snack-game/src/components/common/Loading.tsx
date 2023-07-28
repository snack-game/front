import { FC } from 'react';

import styled from '@emotion/styled';

import LoadingImage from '@assets/images/logo.png';

interface LoadingProps {
  type?: 'page' | 'component';
}

const Loading: FC<LoadingProps> = ({ type }) => {
  return (
    <LoadingContainer type={type}>
      <Image src={LoadingImage} alt={'loading image'} />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div<LoadingProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.type === 'page' ? '100vw' : '100%')};
  height: ${(props) => (props.type === 'page' ? '100vh' : '100%')};
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
