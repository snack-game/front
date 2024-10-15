import api from '@api/index';
import { Streak } from '@pages/games/SnackGame/game/snackGame/SnackGameUtil';

import {
  SnackGameDefaultResponse,
  SnackGameEnd,
  SnackGamePause,
  SnackGameStart,
  SnackGameVerify,
} from '../../SnackGame/game/game.type';

const GAME_ID = 4;

export const gameStart = async (): Promise<SnackGameStart> => {
  const { data } = await api.post(`/games/${GAME_ID}`);

  return data;
};

export const checkMoves = async (
  sessionId: number,
  streaks: Streak[],
): Promise<SnackGameVerify> => {
  const { data } = await api.post(`/games/${GAME_ID}/${sessionId}/streaks`, {
    streaks,
  });

  return data;
};

export const gamePause = async (sessionId: number): Promise<SnackGamePause> => {
  const { data } = await api.post(`games/${GAME_ID}/${sessionId}/pause`);

  return data;
};

export const gameResume = async (
  sessionId: number,
): Promise<SnackGameDefaultResponse> => {
  const { data } = await api.post(`games/${GAME_ID}/${sessionId}/resume`);

  return data;
};

export type SnackGameBizEnd = {
  original: SnackGameEnd;
  signed: string;
};

export const gameEnd = async (sessionId: number): Promise<SnackGameBizEnd> => {
  const { data } = await api.post(`games/${GAME_ID}/${sessionId}/end`);

  return data;
};
