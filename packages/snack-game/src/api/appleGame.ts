import {
  appleGameCheckMovePropsType,
  appleGameEndPropsType,
  appleGameStateType,
} from '@utils/types/game.type';

import api from './index';

const appleGameApi = {
  endPoint: {
    game: '/games/1',
    checkMove: '/sessions',
    gameEnd: '/sessions',
    gameRefresh: '/sessions',
  },

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  gameStart: async (
    accessToken: string | void,
  ): Promise<appleGameStateType> => {
    if (accessToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const { data } = await api.post(appleGameApi.endPoint.game);

    return {
      apples: data.apples,
      sessionId: data.sessionId,
      score: data.score,
    };
  },

  checkGameMove: async ({
    sessionId,
    coordinates,
  }: appleGameCheckMovePropsType): Promise<void> => {
    await api.put(
      `${appleGameApi.endPoint.checkMove}/${sessionId}/moves`,
      coordinates,
    );
  },

  gameEnd: async ({ sessionId }: appleGameEndPropsType): Promise<void> => {
    await api.put(`${appleGameApi.endPoint.gameEnd}/${sessionId}/end`);
  },

  gameRefresh: async (sessionId: number): Promise<appleGameStateType> => {
    await api.delete(`${appleGameApi.endPoint.gameRefresh}/${sessionId}/board`);

    const { data } = await api.post(appleGameApi.endPoint.game);

    return {
      apples: data.apples,
      sessionId: data.sessionId,
      score: data.score,
    };
  },
};

export default appleGameApi;
