import { GameHistoryResponse } from '@utils/types/history.type';

import api from './index';

export const getGameHistory = async (
  by: string,
): Promise<GameHistoryResponse[]> => {
  const { data } = await api.get(`/histories/me?by=${by}`);
  return data.reverse();
};
