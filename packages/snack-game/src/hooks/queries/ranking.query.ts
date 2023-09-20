import { useQuery } from 'react-query';

import { AxiosError } from 'axios';

import rankingApi from '@api/ranking';
import { RankingType } from '@utils/types/common.type';

import { ServerError } from '@constants/api.constant';

export const useGetTotalRanking = () => {
  const { data } = useQuery<RankingType[], AxiosError>(
    'totalRanking',
    rankingApi.totalRanking,
    {
      retry: false,
      useErrorBoundary: true,
    },
  );

  return data;
};

export const useGetUserRanking = () => {
  const { data } = useQuery<RankingType, AxiosError<ServerError>>(
    'userRanking',
    rankingApi.userRanking,
    {
      retry: false,
      onError: (error: AxiosError<ServerError>) => {
        if (error.response?.status === 400) {
          return;
        }

        throw error;
      },
    },
  );

  return data;
};
