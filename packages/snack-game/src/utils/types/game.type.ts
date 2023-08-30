export interface appleGameStateType {
  apples: number[][];
  sessionId: number;
  score: number;
  proceed?: [];
}

export type appleGameMoveType = { x: number; y: number };
