import { appleGameStateType } from '@utils/types/game.type';

import api from './index';

const appleGameApi = {
  endPoint: {
    game: '/games/1',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  gameStart: async (accessToken: string): Promise<appleGameStateType> => {
    const { data } = await api.post(appleGameApi.endPoint.game, null, {
      headers: {
        ...appleGameApi.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      apples: data.apples,
      sessionId: data.sessionId,
      score: data.score,
    };
  },
};

export default appleGameApi;
