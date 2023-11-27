import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/common/Button/Button';
import Loading from '@components/common/Loading/Loading';
import AppleGame from '@components/games/AppleGame';
import AppleGameHUD from '@components/games/AppleGameHUD';

import useAppleGameController from '@hooks/game/useAppleGameController';

const AppleGameController = () => {
  const {
    canvasBaseRef,
    gameHUDRef,
    drag,
    gameManager,
    gameRenderer,
    gameStartMutation,
    start,
    timeRemaining,
    score,
    handleStartButton,
    handleRefresh,
  } = useAppleGameController();

  return (
    <>
      <AppleGameHUD
        gameHUDRef={gameHUDRef}
        time={timeRemaining}
        score={score}
        handleRefresh={handleRefresh}
      />
      <AppleGameWrapper ref={canvasBaseRef}>
        {gameStartMutation.isLoading && <Loading />}
        {start ? (
          <AppleGame
            drag={drag}
            gameRenderer={gameRenderer}
            gameManager={gameManager}
          />
        ) : (
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

export default AppleGameController;
