import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import GameResult from '@components/ui/GameResult/GameResult';
import { Drag } from '@modules/game/drag';
import { GameManager } from '@modules/game/gameManager';
import { GameRenderer } from '@modules/game/gameRenderer';
import { appleGameProgressState, appleGameState } from '@utils/atoms/game.atom';

import {
  useAppleGameCheck,
  useAppleGameRefresh,
  useAppleGameStart,
} from '@hooks/queries/appleGame.query';
import { useClientRect } from '@hooks/useClientRect';
import useModal from '@hooks/useModal';

const useAppleGameController = () => {
  const appleGameValue = useRecoilValue(appleGameState);
  const [appleGameProgressValue, setAppleGameProgress] = useRecoilState(
    appleGameProgressState,
  );

  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const gameHUDRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const drag = useMemo(() => new Drag(), []);
  const gameManager = useMemo(() => new GameManager(), []);
  const gameRenderer = useMemo(() => new GameRenderer(), []);
  const [start, setStart] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(120);

  const { gameEnd } = useAppleGameCheck();
  const { gameStart, gameStartMutation } = useAppleGameStart();
  const gameRefresh = useAppleGameRefresh();

  const { openModal } = useModal();

  const clientRect = useClientRect({ canvasBaseRef });

  const handleStartButton = async () => {
    await gameStart();

    setStart(true);
    setTimeRemaining(120);

    if (gameHUDRef.current) {
      gameHUDRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGameEnd = async () => {
    await gameEnd(appleGameProgressValue);

    setStart(false);
    setAppleGameProgress([]);
  };

  const handleRefresh = async () => {
    if (!start) return;

    setStart(false);

    await gameRefresh.mutateAsync(appleGameValue.sessionId);

    setStart(true);
    setTimeRemaining(120);
    setAppleGameProgress([]);
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
      handleGameEnd().then(() =>
        openModal({
          children: (
            <GameResult
              score={appleGameValue.score}
              reStart={handleStartButton}
            />
          ),
        }),
      );
    }

    return () => {
      setAppleGameProgress([]);
    };
  }, [start, timeRemaining]);

  useEffect(() => {
    clientRect();

    window.addEventListener('resize', clientRect);

    return () => {
      window.removeEventListener('resize', clientRect);
    };
  }, []);

  return {
    canvasBaseRef,
    gameHUDRef,
    drag,
    gameManager,
    gameRenderer,
    gameStartMutation,
    start,
    timeRemaining,
    score: appleGameValue.score,
    handleStartButton,
    handleRefresh,
  };
};

export default useAppleGameController;
