import React from 'react';

import Refresh from '@assets/images/refresh.png';

interface AppleGameHUDProps {
  time: number;
  handleRefresh: () => void;
  score: number;
}

const AppleGameHUD = ({ time, handleRefresh, score }: AppleGameHUDProps) => {
  return (
    <div
      className={
        'mx-auto my-4 flex h-6 w-full max-w-7xl items-center justify-around text-primary-deep-dark'
      }
    >
      <p>{score + ' 점'}</p>
      <p>{time + ' 초'}</p>
      <img
        src={Refresh}
        alt={'새로고침'}
        onClick={handleRefresh}
        className={'h-6 w-6 cursor-pointer'}
      />
    </div>
  );
};

export default AppleGameHUD;
