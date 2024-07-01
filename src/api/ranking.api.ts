import api from '@api/index';
import {
  RankingType,
  RankingViewType,
  SeasonType,
} from '@utils/types/common.type';

const rankingApi = {
  endPoint: {
    totalRanking: '/rankings',
    userRanking: '/rankings',

    seasonRanking: '/rankings',
    seasonRankingMe: '/rankings',

    seasons: '/seasons',
  },

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  totalRanking: async (gameId: RankingViewType) => {
    const { data } = await api.get(
      `${rankingApi.endPoint.totalRanking}/${gameId}?by=BEST_SCORE`,
    );
    return data;
  },

  userRanking: async (gameId: RankingViewType) => {
    const { data } = await api.get(
      `${rankingApi.endPoint.userRanking}/${gameId}/me?by=BEST_SCORE`,
    );
    return data;
  },

  // TODO: season -> game 이 아니라 game -> season 순서로 변경 필요 (테스트 후 마지막으로 변경 예정)
  seasonRanking: async (
    season: number,
    gameId: RankingViewType,
  ): Promise<RankingType[]> => {
    const { data } = await api.get(
      `${rankingApi.endPoint.seasonRanking}/${season}/${gameId}?by=BEST_SCORE`,
    );
    return data;
  },

  seasonRankingMe: async (season: number, gameId: RankingViewType) => {
    const { data } = await api.get(
      `${rankingApi.endPoint.seasonRankingMe}/${season}/${gameId}/me?by=BEST_SCORE`,
    );
    return data;
  },

  seasons: async (): Promise<SeasonType[]> => {
    const { data } = await api.get(rankingApi.endPoint.seasons);
    return data;
  },
};

export default rankingApi;
