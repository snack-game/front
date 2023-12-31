import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';

import Refresh from '@assets/images/refresh.png';

interface AppleGameHUDProps {
  time: number;
  handleRefresh: () => void;
  score: number;
}

const AppleGameHUD = ({ time, handleRefresh, score }: AppleGameHUDProps) => {
  const { t } = useTranslation();
  return (
    <GameHUD>
      <p>{score + t('game_score')}</p>
      <p>{time + t('game_time')}</p>
      <img src={Refresh} alt={'새로고침'} onClick={handleRefresh} />
    </GameHUD>
  );
};

const GameHUD = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${(props) => props.theme.colors.titleText};
  background-color: ${(props) => props.theme.colors.background};

  & > img {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 768px) {
    height: 2rem;
  }
`;

export default AppleGameHUD;
