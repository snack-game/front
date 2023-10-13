// useAppleGameLogic.js
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Apple } from '@modules/apple-game/apple';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameProgressState, appleGameState } from '@utils/atoms/game.atom';
import { MouseEventType } from '@utils/types/common.type';
import {
  appleGameStateType,
  appleType,
  coordinatesType,
} from '@utils/types/game.type';

import { useAppleGameCheck } from '@hooks/queries/appleGame.query';
import useCanvas from '@hooks/useCanvas';
import useDebouncedCallback from '@hooks/useDebouncedCallback';

interface AppleGameProps {
  clientWidth: number;
  clientHeight: number;
  clientLeft: number;
  clientTop: number;
  appleGameInfo?: appleGameStateType;
  drag: Drag;
  appleGameManager: AppleGameManager;
}

export const useAppleGameLogic = ({
  clientWidth,
  clientHeight,
  clientLeft,
  clientTop,
  appleGameInfo,
  drag,
  appleGameManager,
}: AppleGameProps) => {
  const [stage, setStage] = useState<number>(0);
  const [apples, setApples] = useState<Apple[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const [appleGameProgressValue, setAppleGameProgress] = useRecoilState(
    appleGameProgressState,
  );
  const [appleGameStateValue, setAppleGameState] =
    useRecoilState(appleGameState);

  const { checkGameMove } = useAppleGameCheck();

  const debouncedApplePositionUpdate = useDebouncedCallback({
    target: () =>
      appleGameManager.updateApplePosition(clientWidth, clientHeight, apples),
    delay: 300,
  });

  const appleGameCanvasRef = useCanvas({
    clientWidth,
    clientHeight,
    animation: (ctx: CanvasRenderingContext2D) => {
      // background
      ctx.clearRect(0, 0, clientWidth, clientHeight);

      drag.drawDragArea(ctx);

      // render game
      apples.forEach((apple: Apple) => {
        appleGameManager.handleAppleRendering(
          ctx,
          drag.startX,
          drag.startY,
          drag.currentX,
          drag.currentY,
          drag.isDrawing,
          apple,
        );
      });

      removedApples.forEach((removedApple: Apple) => {
        appleGameManager.updateFallingPosition(ctx, clientHeight, removedApple);
        if (removedApple.remove) {
          setRemovedApples([]);
        }
      });
    },
  });

  useEffect(() => {
    debouncedApplePositionUpdate();
  }, [clientWidth, clientHeight]);

  useEffect(() => {
    if (appleGameCanvasRef.current) {
      appleGameCanvasRef.current.addEventListener(
        'touchstart',
        handleMouseDown,
        { passive: false },
      );
      appleGameCanvasRef.current.addEventListener(
        'touchmove',
        handleMouseMove,
        { passive: false },
      );
      appleGameCanvasRef.current.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      if (appleGameCanvasRef.current) {
        appleGameCanvasRef.current.removeEventListener(
          'touchstart',
          handleMouseDown,
        );
        appleGameCanvasRef.current.removeEventListener(
          'touchmove',
          handleMouseMove,
        );
        appleGameCanvasRef.current.removeEventListener(
          'touchend',
          handleMouseUp,
        );
      }
    };
  }, [appleGameCanvasRef.current, stage, appleGameStateValue.score]);

  useEffect(() => {
    if (appleGameInfo) {
      setApplesByGameInfo(appleGameInfo.apples);
    }
  }, []);

  const setApplesByGameInfo = (apples: appleType[][]) => {
    setApples(
      appleGameManager.generateApples(clientWidth, clientHeight, apples),
    );
  };

  const handleMouseDown = (event: MouseEventType) => {
    drag.onMouseDown(event, clientLeft, clientTop);
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEventType) => {
    drag.onMouseMove(event, clientLeft, clientTop);
    event.preventDefault();
  };

  const handleMouseUp = (event: MouseEventType) => {
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

            setApplesByGameInfo(response.apples);
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

    drag.onMouseUp(event);
    event.preventDefault();
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
