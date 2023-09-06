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
  },

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  gameStart: async (): Promise<appleGameStateType> => {
    const { data } = await api.post(appleGameApi.endPoint.game, null, {
      headers: {
        ...appleGameApi.headers,
      },
    });

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
    await api.put(`${appleGameApi.endPoint.checkMove}/${sessionId}/moves`, {
      headers: {
        ...appleGameApi.headers,
      },
      data: coordinates,
    });
  },

  gameEnd: async ({ sessionId }: appleGameEndPropsType): Promise<void> => {
    await api.put(`${appleGameApi.endPoint.gameEnd}/${sessionId}/end`, {
      headers: {
        ...appleGameApi.headers,
      },
    });
  },
};

export default appleGameApi;
