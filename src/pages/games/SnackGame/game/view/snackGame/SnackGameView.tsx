import { memo, useEffect, useMemo, useState } from 'react';

import { Particle } from '@pages/games/SnackGame/game/model/common/particle';
import { MouseEventType } from '@utils/types/common.type';

import useCanvas from '@hooks/useCanvas';
import { useCanvasOffset } from '@hooks/useCanvasOffset';
import useError from '@hooks/useError';

import { Click } from '../../model/common/click';
import Snack from '../../model/snackGame/snack';
import { SnackGame } from '../../model/snackGame/snackGame';

interface SnackGameProps {
  isOngoing: boolean;
  snackGame: SnackGame;
  onRemove: (removedsnacks: Snack[]) => Promise<void>;
}

interface EventListenerInfo {
  event: string;
  handler: any;
}

const SnackGameView = ({ isOngoing, snackGame, onRemove }: SnackGameProps) => {
  const setError = useError();
  const { canvasBaseRef, offsetWidth, offsetHeight, offsetLeft, offsetTop } =
    useCanvasOffset();

  const click = useMemo(() => new Click(), []);
  const [particles, setParticles] = useState<Particle[]>([]);

  const animationFrame = (ctx: CanvasRenderingContext2D) => {
    snackGame.getSnacks().forEach((snack) => {
      snack.drawSnack(ctx);

      if (snack.getIsSelected()) snack.highlightBorder(ctx, 'red');
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

    const { x, y } = click.getClickedPosition();
    snackGame.caculateSnackClicked({ x, y });
  };

  const handleMouseUp = async () => {
    try {
      const removedSnacks = snackGame.removeSnacks();
      if (!removedSnacks) return;

      removedSnacks.forEach((snack) => {
        for (let i = 0; i < 5; i++) {
          particles.push(
            new Particle(
              snack.getPosition().x + snack.getRadius(),
              snack.getPosition().y + snack.getRadius(),
            ),
          );
        }
      });

      await onRemove(removedSnacks);

      snackGame.updateSnackPosition(offsetWidth, offsetHeight);
    } catch (e) {
      setError(new Error('이벤트가 실패했습니다.'));
    }
  };

  useEffect(() => {
    snackGame.updateSnackPosition(offsetWidth, offsetHeight);
  }, [snackGame, offsetWidth, offsetHeight, offsetLeft, offsetTop]);

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
    <div
      ref={canvasBaseRef}
      className={'mx-auto mb-20  h-[75%] w-full max-w-xl'}
    >
      {isOngoing && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas>
      )}
    </div>
  );
};

export default memo(SnackGameView);
