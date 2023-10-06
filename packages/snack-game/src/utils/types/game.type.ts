export interface appleType {
  number: number;
  golden: boolean;
}

export type coordinatesType = { y: number; x: number };

export interface appleGameRectType {
  topLeft: coordinatesType;
  bottomRight: coordinatesType;
}

export interface appleGameStateType {
  apples: appleType[][];
  sessionId: number;
  score: number;
  rects?: appleGameRectType[];
}

export interface appleGameCheckMovePropsType {
  sessionId: number;
  rects: appleGameRectType[];
}

export interface appleGameEndPropsType {
  sessionId: number;
}
