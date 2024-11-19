import axios from 'axios';

import { Streak } from '@pages/games/SnackGame/game/snackGame/SnackGameUtil';

import {
  SnackGameBizDefaultResponse,
  SnackGameBizPause,
  SnackGameBizStart,
  SnackGameBizVerify,
  SnackGameBizEnd,
} from '../game.type';

const GAME_ID = 5;

export const createGameApiClient = () => {
  let accessToken: string | null = null;

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return {
    setAccessToken: (token: string) => {
      accessToken = token;
    },
    clearAccessToken: () => {
      accessToken = null;
    },
    start: async (): Promise<SnackGameBizStart> => {
      const { data } = await api.post(`/games/${GAME_ID}`);
      return data;
    },
    verifyStreaks: async (streaks: Streak[]): Promise<SnackGameBizVerify> => {
      const { data } = await api.post(`/games/${GAME_ID}/streaks`, {
        streaks,
      });
      return data;
    },
    pause: async (): Promise<SnackGameBizPause> => {
      const { data } = await api.post(`games/${GAME_ID}/pause`);
      return data;
    },
    resume: async (): Promise<SnackGameBizDefaultResponse> => {
      const { data } = await api.post(`games/${GAME_ID}/resume`);
      return data;
    },
    end: async (): Promise<SnackGameBizEnd> => {
      const { data } = await api.post(`games/${GAME_ID}/end`);
      return data;
    },
  };
};
