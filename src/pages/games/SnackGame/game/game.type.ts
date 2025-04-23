export type SnackGameMod = 'default' | 'inf';

export type SnackGameAPIStats = 'IN_PROGRESS' | 'PAUSED' | 'EXPIRED';

export type SnackResponse = {
  number: number;
  golden: boolean;
};

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
  board: SnackResponse[][];
}

export type SnackGameStart = SnackGameDefaultResponse;

export type SnackGameVerify = SnackGameDefaultResponse;

export type SnackGamePause = SnackGameDefaultResponse;

export type SnackGameEnd = SnackGameDefaultResponse & {
  percentile: number;
};

export type ProvocationTarget = {
  name: string;
  beforeRank: number;
  currentRank: number;
};
