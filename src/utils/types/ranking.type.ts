import { MemberType } from '@utils/types/member.type';

import { SnackGameId } from '@constants/common.constant';

export type RankingViewType = (typeof SnackGameId)[keyof typeof SnackGameId];

export interface GameSeasonProps {
  season: number;
  gameId: RankingViewType;
}

export type RankingType = {
  rank: number;
  owner: MemberType;
  score: number;
  message?: string;
};

export type SeasonType = {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string | null;
};
