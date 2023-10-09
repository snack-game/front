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
  const { checkGameMove } = useAppleGameCheck();
  const [appleGameProgressValue, setAppleGameProgress] = useRecoilState(
    appleGameProgressState,
  );
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
      setApplesByGameInfo(appleGameInfo.apples);
    }
  }, []);

  const setApplesByGameInfo = (apples: appleType[][]) => {
    setApples(
      appleGameManager.generateApples(clientWidth, clientHeight, apples),
    );
  };

  const handleMouseDown = (event: MouseEventType) => {
    console.log(appleGameProgressValue);
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
