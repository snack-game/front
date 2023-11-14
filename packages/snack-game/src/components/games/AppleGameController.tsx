import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Refresh from '@assets/images/refresh.png';
import Button from '@components/common/Button/Button';
import Loading from '@components/common/Loading/Loading';
import AppleGame from '@components/games/AppleGame';

import useAppleGameController from '@hooks/game/useAppleGameController';

const AppleGameController = () => {
  const {
    canvasBaseRef,
    gameHUDRef,
    offsetTop,
    offsetWidth,
    offsetLeft,
    offsetHeight,
    drag,
    appleGameManager,
    gameStartMutation,
    start,
    timeRemaining,
    appleGameValue,
    handleStartButton,
    handleRefresh,
  } = useAppleGameController();

  return (
    <>
      <GameHUD ref={gameHUDRef}>
        <p>{appleGameValue.score + '점'}</p>
        <p>{timeRemaining + '초'}</p>
        <img src={Refresh} alt={'새로고침'} onClick={handleRefresh} />
      </GameHUD>
      <AppleGameWrapper ref={canvasBaseRef}>
        {gameStartMutation.isLoading && <Loading />}
        {start && (
          <AppleGame
            offsetWidth={offsetWidth}
            offsetHeight={offsetHeight}
            offsetLeft={offsetLeft}
            offsetTop={offsetTop}
            drag={drag}
            appleGameManager={appleGameManager}
          />
        )}
        {!start && (
          <Button
            content={'시작!'}
            onClick={handleStartButton}
            wrapper={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          />
        )}
      </AppleGameWrapper>
    </>
  );
};

const AppleGameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.appleGameBackground};
  width: 80%;
  height: 80vh;

  @media (max-width: 900px) {
    width: 100%;
    height: 90vh;
  }
`;

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

export default AppleGameController;
