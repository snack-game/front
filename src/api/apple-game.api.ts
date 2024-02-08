import {
  checkMoveType,
  goldModeType,
} from '@pages/games/AppleGame/game/game.type';

import api from './index';

const appleGameApi = {
  endPoint: {
    game: '/v2/games/1',
    checkMove: '/v2/sessions',
    gameEnd: '/v2/sessions',
    gameRefresh: '/v2/sessions',
  },

  gameStart: async (): Promise<goldModeType> => {
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
  }: checkMoveType): Promise<void | goldModeType> => {
    const { data } = await api.put(
      `${appleGameApi.endPoint.checkMove}/${sessionId}/moves`,
      rects,
    );

    return {
      apples: data.apples,
      sessionId: data.sessionId,
      score: data.score,
    };
  },

  gameEnd: async (sessionId: number): Promise<void> => {
    await api.put(`${appleGameApi.endPoint.gameEnd}/${sessionId}/end`);
  },

  gameRefresh: async (sessionId: number): Promise<goldModeType> => {
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
