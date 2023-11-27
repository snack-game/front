import { Drag } from '@modules/game/drag';
import { GameManager } from '@modules/game/gameManager';
import { GameRenderer } from '@modules/game/gameRenderer';

export interface appleType {
  number: number;
  golden: boolean;
}

export type coordinatesType = { y: number; x: number };

export interface appleGameRectType {
  topLeft: coordinatesType;
  bottomRight: coordinatesType;
}

export type appleGameProgressType = appleGameRectType[];

export interface appleGameStateType {
  apples: appleType[][];
  sessionId: number;
  score: number;
}

export interface appleGameCheckMovePropsType {
  sessionId: number;
  rects: appleGameRectType[];
}

export interface appleGameEndPropsType {
  sessionId: number;
}

export interface appleGameOffsetType {
  offsetWidth: number;
  offsetHeight: number;
  offsetLeft: number;
  offsetTop: number;
}

export interface AppleGameProps {
  drag: Drag;
  gameManager: GameManager;
  gameRenderer: GameRenderer;
}
