import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';

import Refrash from '@assets/images/refresh.png';
import Button from '@components/common/Button/Button';
import Loading from '@components/common/Loading/Loading';
import AppleGame from '@components/games/AppleGame';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameProgressState, appleGameState } from '@utils/atoms/game.atom';

import {
  useAppleGameCheck,
  useAppleGameRefresh,
  useAppleGameStart,
} from '@hooks/queries/appleGame.query';
import { useClientRect } from '@hooks/useClientRect';

const AppleGameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.appleGameBackground};
  width: 100%;
  height: 90vh;

  @media (max-width: 768px) {
    height: 95vh;
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

const AppleGameContainer = () => {
  const drag = useMemo(() => new Drag(), []);
  const appleGameManager = useMemo(() => new AppleGameManager(), []);

  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const gameHUDRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { gameEnd } = useAppleGameCheck();
  const { gameStart, gameStartMutation } = useAppleGameStart();
  const gameRefresh = useAppleGameRefresh();

  const [appleGameProgressValue, setAppleGameProgress] = useRecoilState(
    appleGameProgressState,
  );
  const appleGameValue = useRecoilValue(appleGameState);

  const [start, setStart] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(120);

  const { clientWidth, clientHeight, clientLeft, clientTop } = useClientRect({
    canvasBaseRef,
  });

  const handleStartButton = () => {
    gameStart().then(() => {
      setStart(true);
      setTimeRemaining(120);

      if (gameHUDRef.current) {
        gameHUDRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const handleGameEnd = () => {
    setStart(false);
    gameEnd(appleGameProgressValue);
    setAppleGameProgress([]);
  };

  const handleRefresh = () => {
    if (!start) return;

    setStart(false);
    gameRefresh.mutateAsync(appleGameValue.sessionId).then(() => {
      setStart(true);
      setTimeRemaining(120);
      setAppleGameProgress([]);
    });
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
      <GameHUD ref={gameHUDRef}>
        <p>{appleGameValue.score + '점'}</p>
        <p>{timeRemaining + '초'}</p>
        <img src={Refrash} alt={'새로고침'} onClick={handleRefresh} />
      </GameHUD>
      <AppleGameWrapper ref={canvasBaseRef}>
        {gameStartMutation.isLoading && <Loading />}
        {start && (
          <AppleGame
            clientWidth={clientWidth}
            clientHeight={clientHeight}
            clientLeft={clientLeft}
            clientTop={clientTop}
            appleGameInfo={appleGameValue}
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
