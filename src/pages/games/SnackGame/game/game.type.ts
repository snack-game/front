export type SnackGameMod = 'default' | 'inf';

export type SnackGameAPIStats = 'IN_PROGRESS' | 'PAUSED' | 'EXPIRED';

export interface SnackGameDefaultResponse {
  metadata: {
    gameId: number;
    localizedName: string;
  };
  ownerId: number;
  sessionId: number;
  state: SnackGameAPIStats;
  score: number;
  createdAt: string;
  board: string;
}

export type SnackGameStart = SnackGameDefaultResponse;

export type SnackGamePause = SnackGameDefaultResponse;

export type SnackGameEnd = SnackGameDefaultResponse & {
  percentile: number;
};
