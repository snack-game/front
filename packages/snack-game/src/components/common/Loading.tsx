import { FC } from 'react';

import LoadingImage from '@assets/images/logo.png';

interface LoadingProps {
  children?: never;
}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className={'flex justify-center items-center w-screen h-screen '}>
      <img src={LoadingImage} className={'animate-spin w-10 h-10'} />
    </div>
  );
};

export default Loading;
