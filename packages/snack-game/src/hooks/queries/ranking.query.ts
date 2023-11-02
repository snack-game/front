import { useQuery } from 'react-query';

import { AxiosError } from 'axios';

import rankingApi from '@api/ranking.api';
import { RankingType } from '@utils/types/common.type';

import { QUERY_KEY, ServerError } from '@constants/api.constant';

export const useGetTotalRanking = () => {
  const { data } = useQuery<RankingType[], AxiosError>(
    QUERY_KEY.TOTAL_RANKING,
    rankingApi.totalRanking,
    {
      suspense: true,
      useErrorBoundary: true,
    },
  );

  return data;
};

export const useGetUserRanking = () => {
  const { data } = useQuery<RankingType, AxiosError<ServerError>>(
    QUERY_KEY.USER_RANKING,
    rankingApi.userRanking,
    {
      cacheTime: 0,
      suspense: true,
      useErrorBoundary: (error: AxiosError<ServerError>) => {
        if (!error.response) throw error;

        return error.response?.status >= 500;
      },
    },
  );

  return data;
};
