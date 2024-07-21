import api from '@api/index';

import {
  SnackGameDefaultResponse,
  SnackGameEnd,
  SnackGamePause,
  SnackGameStart,
} from '../game.type';

export const gameStart = async (): Promise<SnackGameStart> => {
  const { data } = await api.post('/games/2');

  return data;
};

export const gameScore = async (
  score: number,
  sessionId: number,
): Promise<SnackGameDefaultResponse> => {
  const { data } = await api.put(`/games/2/${sessionId}`, {
    score,
  });

  return data;
};

export const gamePause = async (sessionId: number): Promise<SnackGamePause> => {
  const { data } = await api.post(`games/2/${sessionId}/pause`);

  return data;
};

export const gameResume = async (
  sessionId: number,
): Promise<SnackGameDefaultResponse> => {
  const { data } = await api.post(`games/2/${sessionId}/resume`);

  return data;
};

export const gameEnd = async (sessionId: number): Promise<SnackGameEnd> => {
  const { data } = await api.post(`games/2/${sessionId}/end`);

  return data;
};
