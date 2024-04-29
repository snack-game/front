import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import historyApi from '@api/history.api';
import { GameHistoryResponse } from '@utils/types/common.type';

import { QUERY_KEY } from '@constants/api.constant';

export const useGetGameHistory = (by: string) => {
  const { data } = useSuspenseQuery<GameHistoryResponse[], AxiosError>({
    queryKey: [QUERY_KEY.GAME_HISTORY, by],
    queryFn: () => historyApi.getGameHistory(by),
  });

  return data;
};
