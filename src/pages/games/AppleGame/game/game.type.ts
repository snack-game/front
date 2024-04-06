export interface goldModAppleType {
  number: number;
  golden: boolean;
}

export interface classicModAppleType {
  number: number;
}

export type AppleData = goldModAppleType | classicModAppleType;

export type coordinatesType = { y: number; x: number };

export interface scoredAppleRectType {
  topLeft: coordinatesType;
  bottomRight: coordinatesType;
}

export interface goldModeType {
  apples: goldModAppleType[][];
  sessionId: number;
  score: number;
}

export interface checkMoveType {
  sessionId: number;
  rects: scoredAppleRectType[];
}

export interface gameEndType {
  score: number;
  percentile: number;
}
