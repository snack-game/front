import { GameHistoryResponse } from '@utils/types/common.type';

import api from './index';

const historyApi = {
  endPoint: {
    gameHistory: '/histories/me?by=',
  },

  getGameHistory: async (by: string): Promise<GameHistoryResponse[]> => {
    const { data } = await api.get(`${historyApi.endPoint.gameHistory}${by}`);
    return data.reverse();
  },
};

export default historyApi;
