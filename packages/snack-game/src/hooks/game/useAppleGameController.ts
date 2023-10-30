import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameProgressState, appleGameState } from '@utils/atoms/game.atom';

import {
  useAppleGameCheck,
  useAppleGameRefresh,
  useAppleGameStart,
} from '@hooks/queries/appleGame.query';
import { useClientRect } from '@hooks/useClientRect';

const useAppleGameController = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const gameHUDRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { offsetTop, offsetWidth, offsetLeft, offsetHeight } = useClientRect({
    canvasBaseRef,
  });

  const drag = useMemo(() => new Drag(), []);
  const appleGameManager = useMemo(() => new AppleGameManager(), []);

  const { gameEnd } = useAppleGameCheck();
  const { gameStart, gameStartMutation } = useAppleGameStart();
  const gameRefresh = useAppleGameRefresh();

  const appleGameValue = useRecoilValue(appleGameState);
  const [appleGameProgressValue, setAppleGameProgress] = useRecoilState(
    appleGameProgressState,
  );

  const [start, setStart] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(120);

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
        setTimeRemaining((preTime) => preTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else if (timeRemaining === 0 && start) {
      handleGameEnd();
    }
  }, [start, timeRemaining]);

  return {
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
  };
};

export default useAppleGameController;
