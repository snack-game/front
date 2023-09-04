export type appleGameMoveType = { x: number; y: number };

export interface appleGameStateType {
  apples: number[][];
  sessionId: number;
  score: number;
  move?: appleGameMoveType[];
}
