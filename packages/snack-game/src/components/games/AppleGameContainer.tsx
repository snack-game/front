import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import Button from '@components/common/Button/Button';
import Loading from '@components/common/Loading';
import AppleGame from '@components/games/AppleGame';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameState } from '@utils/atoms/game';

import {
  useAppleGameCheck,
  useAppleGameStart,
} from '@hooks/queries/appleGame.query';
import { useClientRect } from '@hooks/useClientRect';

const AppleGameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: #ffedd5;
  width: 80%;
  height: 80vh;
`;

const GameHUD = styled.div`
  width: 80%;
  height: 2rem;
  display: flex;
  margin: auto;
  justify-content: space-around;
`;

const AppleGameContainer = () => {
  const drag = useMemo(() => new Drag(), []);
  const appleGameManager = useMemo(() => new AppleGameManager(), []);

  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { clientWidth, clientHeight, clientLeft, clientTop } = useClientRect({
    canvasBaseRef,
  });

  const { gameEnd } = useAppleGameCheck();
  const { gameStart, gameStartMutation } = useAppleGameStart();

  const [start, setStart] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(120);
  const appleGameValue = useRecoilValue(appleGameState);

  const handleStartButton = () => {
    gameStart().then(() => {
      setStart(true);
      setTimeRemaining(120);
    });
  };

  const handleGameEnd = () => {
    setStart(false);
    gameEnd();
  };

  useEffect(() => {
    if (start && timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else if (timeRemaining === 0 && start) {
      handleGameEnd();
    }
  }, [start, timeRemaining]);

  return (
    <>
      <GameHUD>
        <p>{appleGameValue.score + '점'}</p>
        <p>{timeRemaining + '초'}</p>
      </GameHUD>
      <AppleGameWrapper ref={canvasBaseRef}>
        {gameStartMutation.isLoading && <Loading />}
        {start && (
          <AppleGame
            clientWidth={clientWidth}
            clientHeight={clientHeight}
            clientLeft={clientLeft}
            clientTop={clientTop}
            appleGameInfo={gameStartMutation.data}
            drag={drag}
            appleGameManager={appleGameManager}
          />
        )}
        <Button
          content={'시작!'}
          onClick={handleStartButton}
          show={!start}
          wrapper={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        />
      </AppleGameWrapper>
    </>
  );
};

export default AppleGameContainer;
