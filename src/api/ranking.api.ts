import api from '@api/index';
import {
  RankingType,
  RankingViewType,
  SeasonType,
} from '@utils/types/ranking.type';

export const totalRanking = async (gameId: RankingViewType) => {
  const { data } = await api.get(`/rankings/${gameId}?by=BEST_SCORE`);
  return data;
};

export const userRanking = async (gameId: RankingViewType) => {
  const { data } = await api.get(`/rankings/${gameId}/me?by=BEST_SCORE`);
  return data;
};

export const seasonRanking = async (
  season: number,
  gameId: RankingViewType,
): Promise<RankingType[]> => {
  const { data } = await api.get(`/rankings/${gameId}/${season}?by=BEST_SCORE`);
  return data;
};

export const seasonRankingMe = async (
  season: number,
  gameId: RankingViewType,
) => {
  const { data } = await api.get(
    `/rankings/${gameId}/${season}/me?by=BEST_SCORE`,
  );
  return data;
};

export const seasons = async (): Promise<SeasonType[]> => {
  const { data } = await api.get('/seasons');
  return data;
};
