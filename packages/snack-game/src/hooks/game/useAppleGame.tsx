import { useCallback, useEffect, useState } from 'react';

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
import useCanvas from '@hooks/useCanvas';
import useDebouncedCallback from '@hooks/useDebouncedCallback';

const useAppleGame = ({
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
  const [particles] = useState<Particle[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const [apples, setApples] = useState<Apple[]>(
    appleGameManager.generateApples(
      offsetWidth,
      offsetHeight,
      appleGameStateValue.apples,
    ),
  );

  const { checkGameMove } = useAppleGameCheck();

  const debouncedApplePositionUpdate = useDebouncedCallback({
    target: () => {
      appleGameManager.updateApplePosition(offsetWidth, offsetHeight, apples);
    },
    delay: 100,
  });

  const animation = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      // background
      ctx.clearRect(0, 0, offsetWidth, offsetHeight);

      drag.drawDragArea(ctx);

      handleParticles(ctx);

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
        appleGameManager.updateFallingPosition(ctx, offsetHeight, removedApple);
        if (removedApple.remove) {
          setRemovedApples([]);
        }
      });
    },
    [apples, removedApples, drag, offsetWidth, offsetHeight],
  );

  const appleGameCanvasRef = useCanvas({
    offsetWidth,
    offsetHeight,
    animation,
  });

  useEffect(() => {
    debouncedApplePositionUpdate();
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
  }, [appleGameCanvasRef.current, stage, appleGameStateValue.score]);

  const handleParticles = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].size <= 1) {
        particles.splice(i, 1);
        i--;
      }
    }
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
      removedApples.forEach((apple) => {
        for (let i = 0; i < 5 + Math.floor(Math.random() * 2); i++) {
          particles.push(
            new Particle(
              apple.position.x + apple.radius,
              apple.position.y + apple.radius,
            ),
          );
        }
      });

      const removedAppleCoordinates: coordinatesType[] = removedApples.map(
        (apple: Apple) => apple.coordinates,
      );

      const newRect = appleGameManager.getRectApplePosition(
        removedAppleCoordinates,
      );
      const rects = [...appleGameProgressValue, newRect];

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

            setApples(
              appleGameManager.generateApples(
                offsetWidth,
                offsetHeight,
                response.apples,
              ),
            );
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

export default useAppleGame;
