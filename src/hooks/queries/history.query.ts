import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getGameHistory } from '@api/history.api';
import { GameHistoryResponse } from '@utils/types/history.type';

import { QUERY_KEY } from '@constants/api.constant';

export const useGetGameHistory = (by: string) => {
  const { data } = useSuspenseQuery<GameHistoryResponse[], AxiosError>({
    queryKey: [QUERY_KEY.GAME_HISTORY, by],
    queryFn: () => getGameHistory(by),
  });

  return data;
};
