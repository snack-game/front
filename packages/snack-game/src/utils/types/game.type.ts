export type appleGameMoveType = { y: number; x: number };

export type coordinatesType = { coordinates: appleGameMoveType[] }[];

export interface appleGameStateType {
  apples: number[][];
  sessionId: number;
  score: number;
  coordinates?: coordinatesType;
}

export interface appleGameCheckMovePropsType {
  sessionId: number;
  coordinates: coordinatesType;
}

export interface appleGameEndPropsType {
  sessionId: number;
}
