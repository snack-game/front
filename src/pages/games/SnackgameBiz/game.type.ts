import { SnackGameDefaultResponse } from '../SnackGame/game/game.type';

export interface SnackGameBizDefaultResponse
  extends Omit<SnackGameDefaultResponse, 'sessionId'> {
  accessToken: string;
}

export type SnackGameBizStart = SnackGameBizDefaultResponse;

export type SnackGameBizVerify = SnackGameBizDefaultResponse;

export type SnackGameBizPause = SnackGameBizDefaultResponse;

export type SnackGameBizEnd = {
  original: SnackGameBizDefaultResponse & {
    percentile: number;
  };
  signed: string;
};
