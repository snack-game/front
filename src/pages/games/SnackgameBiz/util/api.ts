import axios from 'axios';

import { StreakWithMeta } from '@pages/games/SnackGame/game/snackGame/SnackGameUtil';

import {
  SnackGameBizDefaultResponse,
  SnackGameBizPause,
  SnackGameBizStart,
  SnackGameBizVerify,
  SnackGameBizEnd,
} from '../game.type';

const GAME_ID = 5;

export const createGameApiClient = () => {
  let token: string | null = null;

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  });

  return {
    setToken: (newToken: string) => {
      token = newToken;
    },
    clearToken: () => {
      token = null;
    },
    start: async (): Promise<SnackGameBizStart> => {
      const { data } = await api.post(`/games/${GAME_ID}`);
      return data;
    },
    verifyStreaks: async (
      sessionId: number,
      streaks: StreakWithMeta[],
    ): Promise<SnackGameBizVerify> => {
      const { data } = await api.post(
        `/games/${GAME_ID}/${sessionId}/streaks`,
        {
          streaks,
        },
      );
      return data;
    },
    pause: async (sessionId: number): Promise<SnackGameBizPause> => {
      const { data } = await api.post(`games/${GAME_ID}/${sessionId}/pause`);
      return data;
    },
    resume: async (sessionId: number): Promise<SnackGameBizDefaultResponse> => {
      const { data } = await api.post(`games/${GAME_ID}/${sessionId}/resume`);
      return data;
    },
    end: async (sessionId: number): Promise<SnackGameBizEnd> => {
      const { data } = await api.post(`games/${GAME_ID}/${sessionId}/end`);
      return data;
    },
  };
};
