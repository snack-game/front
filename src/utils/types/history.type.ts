export interface GameHistoryResponse {
  sessionId: number;
  memberId: number;
  score: number;
  updatedAt: string;
}

export type HistoryViewType = 'DATE' | 'SESSION';
