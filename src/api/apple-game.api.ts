import {
  goldModeType,
  checkMoveType,
  gameEndType,
} from '@pages/games/SnackGame/game/legacy/legacyType';

import api from './index';

export const snackGameStart = async (): Promise<goldModeType> => {
  const { data } = await api.post('/v2/games/1');

  return {
    apples: data.apples,
    sessionId: data.sessionId,
    score: data.score,
  };
};

export const checkSnackGameMove = async ({
  sessionId,
  rects,
}: checkMoveType): Promise<void | goldModeType> => {
  const { data } = await api.put(`/v2/sessions/${sessionId}/moves`, rects);

  return {
    apples: data.apples,
    sessionId: data.sessionId,
    score: data.score,
  };
};

export const snackGameEnd = async (sessionId: number): Promise<gameEndType> => {
  const { data } = await api.put(`/v2/sessions/${sessionId}/end`);

  return { ...data };
};

export const snackGameRefresh = async (
  sessionId: number,
): Promise<goldModeType> => {
  const { data } = await api.delete(`/v2/sessions/${sessionId}/board`);

  return {
    apples: data.apples,
    sessionId: data.sessionId,
    score: data.score,
  };
};
