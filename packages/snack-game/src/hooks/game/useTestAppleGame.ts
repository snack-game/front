import { useEffect, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Apple } from '@modules/apple-game/apple';
import { Particle } from '@modules/apple-game/particle';
import { appleGameProgressState, appleGameState } from '@utils/atoms/game.atom';
import { MouseEventType } from '@utils/types/common.type';
import {
  AppleGameProps,
  appleGameStateType,
  coordinatesType,
} from '@utils/types/game.type';

import { useAppleGameCheck } from '@hooks/queries/appleGame.query';

const useTestAppleGame = ({
  offsetWidth,
  offsetHeight,
  offsetLeft,
  offsetTop,
  drag,
  appleGameManager,
}: AppleGameProps) => {
  const [appleGameProgressValue, setAppleGameProgress] = useRecoilState(
    appleGameProgressState,
  );
  const [appleGameStateValue, setAppleGameState] =
    useRecoilState(appleGameState);

  const [stage, setStage] = useState<number>(0);
  const [worker, setWorker] = useState<Worker>();
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const [apples, setApples] = useState<Apple[]>([]);

  const { checkGameMove } = useAppleGameCheck();

  const appleGameCanvasRef = useRef<HTMLCanvasElement>(null);

  const initializeWorker = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || worker) return;
    const offScreen = canvas.transferControlToOffscreen();
    const newWorker = new Worker(new URL('worker.ts', import.meta.url), {
      type: 'module',
    });
    newWorker.postMessage(
      { offScreen, devicePixelRatio, drag, offsetWidth, offsetHeight },
      [offScreen],
    );
    setWorker(newWorker);
  };

  const updateWorkerData = () => {
    const particles: Particle[] = [];

    removedApples.forEach((removedApple: Apple) => {
      appleGameManager.updateFallingPosition(offsetHeight, removedApple);
      if (removedApple.remove) {
        setRemovedApples([]);
      }
    });

    worker?.postMessage({
      drag,
      offsetWidth,
      offsetHeight,
      apples,
      particles,
      removedApples,
    });
  };

  const handleWorkerMessage = (e: any) => {
    if (e.data === 'frameRendered') {
      updateWorkerData();
    }
  };

  useEffect(() => {
    const canvas = appleGameCanvasRef.current;
    initializeWorker(canvas);

    return () => {
      if (worker) {
        console.log('worker terminated');
        worker.terminate();
      }
    };
  }, [appleGameCanvasRef.current]);

  useEffect(() => {
    if (worker) {
      worker.onmessage = handleWorkerMessage;
      updateWorkerData();
    }
  }, [worker, apples, removedApples]);

  useEffect(() => {
    appleGameManager.updateApplePosition(offsetWidth, offsetHeight, apples);
  }, [offsetWidth, offsetHeight, offsetLeft, offsetTop]);

  useEffect(() => {
    const canvas = appleGameCanvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('touchstart', handleMouseDown, { passive: false });
    canvas.addEventListener('touchmove', handleMouseMove, { passive: false });
    canvas.addEventListener('touchend', handleMouseUp);

    return () => {
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, [appleGameCanvasRef, stage, appleGameStateValue.score]);

  useEffect(() => {
    setApplesByGameInfo();
  }, []);

  const setApplesByGameInfo = async () => {
    setApples(
      await appleGameManager.generateApples(
        offsetWidth,
        offsetHeight,
        appleGameStateValue.apples,
      ),
    );
  };

  const handleMouseDown = (event: MouseEventType) => {
    event.preventDefault();
    drag.onMouseDown(event, offsetLeft, offsetTop);
  };

  const handleMouseMove = (event: MouseEventType) => {
    event.preventDefault();
    drag.onMouseMove(event, offsetLeft, offsetTop);
  };

  const handleMouseUp = () => {
    const { newApples, removedApples, isGolden, getScore, score } =
      appleGameManager.checkApplesInDragArea(
        apples,
        drag.startX,
        drag.startY,
        drag.currentX,
        drag.currentY,
      );

    if (getScore) {
      const removedAppleCoordinates: coordinatesType[] = removedApples.map(
        (apple: Apple) => apple.coordinates,
      );

      const rects = [
        ...appleGameProgressValue,
        appleGameManager.getRectApplePosition(removedAppleCoordinates),
      ];

      if (isGolden) {
        checkGameMove
          .mutateAsync({
            sessionId: appleGameStateValue.sessionId,
            rects,
          })
          .then((response) => {
            if (!response) {
              throw Error('게임판을 새로 받아오는데 실패했어요!');
            }

            setAppleGameState((prev: appleGameStateType) => ({
              ...prev,
              apples: response.apples,
            }));

            setApplesByGameInfo();
            setAppleGameProgress([]);
            setStage((prev: number) => prev + 1);
          });
      }

      setAppleGameState((prev: appleGameStateType) => ({
        ...prev,
        score: prev.score + score,
      }));

      if (!isGolden) setApples(newApples);
      setAppleGameProgress(rects);
      setRemovedApples(removedApples);
    }

    drag.onMouseUp();
  };

  return {
    apples,
    removedApples,
    setRemovedApples,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    appleGameCanvasRef,
  };
};

export default useTestAppleGame;
