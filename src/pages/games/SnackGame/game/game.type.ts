export type SnackGameMod = 'default' | 'inf';

export type SnackGameAPIStats = 'IN_PROGRESS' | 'PAUSED' | 'EXPIRED';

export interface SnackGameDefalutResponse {
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

export type SnackGameStart = SnackGameDefalutResponse;

export type SnackGamePauese = SnackGameDefalutResponse;

export type SnackGameEnd = SnackGameDefalutResponse & {
  percentile: number;
};
