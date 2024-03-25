import { memo, useEffect, useMemo, useState } from 'react';

import Button from '@components/Button/Button';
import { Particle } from '@pages/games/AppleGame/game/model/particle';
import { MouseEventType } from '@utils/types/common.type';

import useCanvas from '@hooks/useCanvas';
import { useCanvasOffset } from '@hooks/useCanvasOffset';
import useError from '@hooks/useError';

import { Click } from '../model/click';
import Snack from '../model/snack';
import { SnackGame } from '../model/snackGame';

interface SnackGameProps {
  isOngoing: boolean;
  snackGame: SnackGame;
  onRemove: (removedApples: Snack[]) => Promise<void>;
  startGame?: () => Promise<void>;
}

interface EventListenerInfo {
  event: string;
  handler: any;
}

const SnackGameController = ({
  isOngoing,
  snackGame,
  onRemove,
  startGame,
}: SnackGameProps) => {
  const setError = useError();
  const { canvasBaseRef, offsetWidth, offsetHeight, offsetLeft, offsetTop } =
    useCanvasOffset();

  const click = useMemo(() => new Click(), []);
  const [particles, setParticles] = useState<Particle[]>([]);

  const animationFrame = (ctx: CanvasRenderingContext2D) => {
    snackGame.getSnacks().forEach((snack) => {
      snack.drawSnack(ctx);

      if (snack.getIsSelected()) snack.highlightBorder(ctx);
    });

    // 파티클 렌더링
    particles.forEach((it) => {
      it.update();
      it.drawParticle(ctx);
      if (it.size <= 0) setParticles([]);
    });
  };

  const canvasRef = useCanvas({
    offsetWidth,
    offsetHeight,
    animationFrame,
  });

  const handleMouseDown = (event: MouseEventType) => {
    event.preventDefault();
    click.onMouseDown(event, offsetLeft, offsetTop);

    const apples = snackGame.getSnacks();
    apples.forEach((snack) => {
      const { x, y } = click.getClickedPosition();
      if (snack.isClicked(x, y)) {
        snack.setIsSelected(!snack.getIsSelected());
      }
    });
  };

  const handleMouseUp = async () => {
    try {
      const removedApples = snackGame.removeSnacks();
      if (removedApples.length === 0) return;

      removedApples.forEach((apple) => {
        for (let i = 0; i < 5; i++) {
          particles.push(
            new Particle(
              apple.getPosition().x + apple.getRadius(),
              apple.getPosition().y + apple.getRadius(),
            ),
          );
        }
      });
      await onRemove(removedApples);

      snackGame.updateSnackPosition(offsetWidth, offsetHeight);
    } catch (e) {
      setError(new Error('이벤트가 실패했습니다.'));
    }
  };

  useEffect(() => {
    snackGame.updateSnackPosition(offsetWidth, offsetHeight);
  }, [offsetWidth, offsetHeight, offsetLeft, offsetTop]);

  useEffect(() => {
    snackGame.updateSnackPosition(offsetWidth, offsetHeight);
  }, [snackGame]);

  useEffect(() => {
    const eventListeners: EventListenerInfo[] = [
      { event: 'touchstart', handler: handleMouseDown },
      { event: 'touchend', handler: handleMouseUp },
    ];

    if (canvasRef.current) {
      eventListeners.forEach((listener) =>
        canvasRef.current?.addEventListener(listener.event, listener.handler, {
          passive: false,
        }),
      );
      return () => {
        eventListeners.forEach((listener) =>
          canvasRef.current?.removeEventListener(
            listener.event,
            listener.handler,
          ),
        );
      };
    }
  }, [
    canvasRef.current,
    snackGame,
    offsetWidth,
    offsetHeight,
    offsetLeft,
    offsetTop,
  ]);

  return (
    <div ref={canvasBaseRef} className={'m-auto h-[80%] max-w-7xl bg-game'}>
      {isOngoing ? (
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Button onClick={startGame} size="lg">
            게임시작!
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(SnackGameController);
