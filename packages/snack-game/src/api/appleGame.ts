import { appleGameMoveType, appleGameStateType } from '@utils/types/game.type';

import api from './index';

const appleGameApi = {
  endPoint: {
    game: '/games/1',
    gameEnd: '/sessionId',
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

  gameEnd: async (accessToken: string, sessionId: string): Promise<void> => {
    await api.put(`${appleGameApi.endPoint.gameEnd}/${sessionId}/end`, {
      headers: {
        ...appleGameApi.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  checkGameMove: async (
    accessToken: string,
    sessionId: string,
    move: appleGameMoveType[],
  ): Promise<void> => {
    await api.put(`${appleGameApi.endPoint.gameEnd}/${sessionId}/end`, {
      headers: {
        ...appleGameApi.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        move,
      },
    });
  },
};

export default appleGameApi;
