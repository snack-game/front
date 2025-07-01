export const QUERY_KEY = {
  GROUPS_NAMES: 'groupsNames',

  TOTAL_RANKING: 'totalRanking',
  USER_RANKING: 'userRanking',

  USER_PROFILE: 'userProfile',
  USER_ITEM: 'userItem',

  SEASON_RANKING: 'seasonRanking',
  SEASON_USER_RANKING: 'seasonUserRanking',
  SEASONS: 'seasons',

  GAME_HISTORY: 'gameHistory',
};

export interface ServerError {
  messages: string;
}
