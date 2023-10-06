import {
  appleGameCheckMovePropsType,
  appleGameEndPropsType,
  appleGameStateType,
} from '@utils/types/game.type';

import api from './index';

const appleGameApi = {
  endPoint: {
    game: '/v2/games/1',
    checkMove: '/v2/sessions',
    gameEnd: '/v2/sessions',
    gameRefresh: '/v2/sessions',
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
    rects,
  }: appleGameCheckMovePropsType): Promise<void | appleGameStateType> => {
    await api.put(
      `${appleGameApi.endPoint.checkMove}/${sessionId}/moves`,
      rects,
    );
  },

  gameEnd: async ({ sessionId }: appleGameEndPropsType): Promise<void> => {
    await api.put(`${appleGameApi.endPoint.gameEnd}/${sessionId}/end`);
  },

  gameRefresh: async (sessionId: number): Promise<appleGameStateType> => {
    const { data } = await api.delete(
      `${appleGameApi.endPoint.gameRefresh}/${sessionId}/board`,
    );

    return {
      apples: data.apples,
      sessionId: data.sessionId,
      score: data.score,
    };
  },
};

export default appleGameApi;
