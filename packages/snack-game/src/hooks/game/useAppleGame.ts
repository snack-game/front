// useAppleGameLogic.js
import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { Apple } from '@modules/apple-game/apple';
import { Drag } from '@modules/apple-game/drag';
import { appleGameState } from '@utils/atoms/game.atom';
import { MouseEventType } from '@utils/types/common.type';
import { appleGameMoveType, appleGameStateType } from '@utils/types/game.type';

import useDebouncedCallback from '@hooks/useDebouncedCallback';

interface AppleGameProps {
  clientWidth: number;
  clientHeight: number;
  clientLeft: number;
  clientTop: number;
  appleGameInfo?: appleGameStateType;
  drag: Drag;
  appleGameManager: any;
}

export const useAppleGameLogic = ({
  clientWidth,
  clientHeight,
  appleGameInfo,
  drag,
  appleGameManager,
  clientLeft,
  clientTop,
}: AppleGameProps) => {
  const [apples, setApples] = useState<Apple[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const setAppleGameState = useSetRecoilState(appleGameState);
  const debouncedUpdate = useDebouncedCallback({
    target: () =>
      appleGameManager.updateApplePosition(clientWidth, clientHeight, apples),
    delay: 300,
  });

  useEffect(() => {
    // appleGameManager.updateApplePosition(clientWidth, clientHeight, apples);
    debouncedUpdate();
  }, [clientWidth, clientHeight]);

  useEffect(() => {
    if (appleGameInfo) {
      setApples(
        appleGameManager.generateApples(
          clientWidth,
          clientHeight,
          appleGameInfo.apples,
        ),
      );
    }
  }, []);

  const handleMouseDown = (event: MouseEventType) => {
    drag.onMouseDown(event, clientLeft, clientTop);
  };

  const handleMouseUp = () => {
    drag.onMouseUp();

    const { newApples, removedApples, isGolden, getScore, score } =
      appleGameManager.checkApplesInDragArea(
        apples,
        drag.startX,
        drag.startY,
        drag.currentX,
        drag.currentY,
      );

    if (getScore) {
      const removedAppleCoordinates: appleGameMoveType[] = removedApples.map(
        (apple: Apple) => apple.coordinates,
      );

      setAppleGameState((prev: appleGameStateType) => ({
        ...prev,
        score: prev.score + score,
        coordinates: [
          ...(prev.coordinates || []),
          { coordinates: removedAppleCoordinates },
        ],
      }));
    }

    setApples(newApples);
    setRemovedApples(removedApples);

    // if (isGolden) setApples(appleGameManager.generateApples(rect));
  };

  const handleMouseMove = (event: MouseEventType) => {
    drag.onMouseMove(event, clientLeft, clientTop);
  };

  return {
    apples,
    removedApples,
    setRemovedApples,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  };
};
