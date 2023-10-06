// useAppleGameLogic.js
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Apple } from '@modules/apple-game/apple';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameState } from '@utils/atoms/game.atom';
import { MouseEventType } from '@utils/types/common.type';
import { appleGameStateType, coordinatesType } from '@utils/types/game.type';

import { useAppleGameCheck } from '@hooks/queries/appleGame.query';
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
  appleGameInfo,
  drag,
  appleGameManager,
  clientLeft,
  clientTop,
}: AppleGameProps) => {
  const [apples, setApples] = useState<Apple[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const { checkMove } = useAppleGameCheck();
  const [appleGameStateValue, setAppleGameState] =
    useRecoilState(appleGameState);
  const debouncedApplePositionUpdate = useDebouncedCallback({
    target: () =>
      appleGameManager.updateApplePosition(clientWidth, clientHeight, apples),
    delay: 300,
  });

  useEffect(() => {
    debouncedApplePositionUpdate();
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
    console.log(appleGameStateValue);
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
      const removedAppleCoordinates: coordinatesType[] = removedApples.map(
        (apple: Apple) => apple.coordinates,
      );

      if (isGolden) {
        checkMove().then((response) => {
          if (response === undefined) {
            throw Error('게임판을 새로 받아오는데 실패했어요!');
          }

          setAppleGameState((prev: appleGameStateType) => ({
            ...prev,
            apples: response.apples,
            score: prev.score + score,
            rects: [
              ...(prev.rects || []),
              appleGameManager.getRectApplePosition(removedAppleCoordinates),
            ],
          }));
        });

        return;
      }

      setAppleGameState((prev: appleGameStateType) => ({
        ...prev,
        score: prev.score + score,
        rects: [
          ...(prev.rects || []),
          appleGameManager.getRectApplePosition(removedAppleCoordinates),
        ],
      }));

      setApples(newApples);
      setRemovedApples(removedApples);
    }
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
