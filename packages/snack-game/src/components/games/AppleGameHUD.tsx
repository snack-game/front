import React from 'react';

import styled from '@emotion/styled';

import Refresh from '@assets/images/refresh.png';

interface AppleGameHUDProps {
  ref: React.RefObject<HTMLDivElement>;
  time: number;
  handleRefresh: () => void;
  score: number;
}

const AppleGameHUD = ({
  ref,
  time,
  handleRefresh,
  score,
}: AppleGameHUDProps) => {
  return (
    <GameHUD ref={ref}>
      <p>{score + '점'}</p>
      <p>{time + '초'}</p>
      <img src={Refresh} alt={'새로고침'} onClick={handleRefresh} />
    </GameHUD>
  );
};

const GameHUD = styled.div`
  width: 80%;
  height: 3rem;
  display: flex;
  margin: auto;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => props.theme.colors.titleText};

  & > img {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 768px) {
    height: 2rem;
  }
`;

export default AppleGameHUD;
