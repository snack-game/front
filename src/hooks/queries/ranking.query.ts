import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  seasonRanking,
  seasonRankingMe,
  seasons,
  totalRanking,
  userRanking,
} from '@api/ranking.api';
import {
  GameSeasonProps,
  RankingType,
  RankingViewType,
  SeasonType,
} from '@utils/types/ranking.type';

import { QUERY_KEY, ServerError } from '@constants/api.constant';

export const useGetTotalRanking = (gameId: RankingViewType) => {
  const { data } = useSuspenseQuery<RankingType[], AxiosError>({
    queryKey: [QUERY_KEY.TOTAL_RANKING, gameId],
    queryFn: () => totalRanking(gameId),
  });

  return data;
};

export const useGetUserRanking = (gameId: RankingViewType) => {
  const { data } = useQuery<RankingType, AxiosError<ServerError>>({
    queryKey: [QUERY_KEY.USER_RANKING, gameId],
    queryFn: () => userRanking(gameId),
    throwOnError: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });

  return data;
};

export const useGetSeasonRanking = ({ season, gameId }: GameSeasonProps) => {
  const { data } = useSuspenseQuery<RankingType[], AxiosError>({
    queryKey: [QUERY_KEY.SEASON_RANKING, season, gameId],
    queryFn: () => seasonRanking(season, gameId),
  });

  return data;
};

export const useGetSeasonRankingMe = ({ season, gameId }: GameSeasonProps) => {
  const { data } = useQuery<RankingType, AxiosError<ServerError>>({
    queryKey: [QUERY_KEY.SEASON_USER_RANKING, season, gameId],
    queryFn: () => seasonRankingMe(season, gameId),
    throwOnError: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });

  return data;
};

export const useGetSeasons = () => {
  const { data } = useSuspenseQuery<SeasonType[], AxiosError<ServerError>>({
    queryKey: [QUERY_KEY.SEASONS],
    queryFn: () => seasons(),
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });

  return data;
};
