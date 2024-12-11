import React from 'react';

import { MemberType } from '@utils/types/member.type';

import { SnackGameId } from '@constants/common.constant';

export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';

export interface ModalType {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export interface toastStateType {
  id?: string;
  message: string;
  type: ToastType;
}

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

export type MouseEventType = React.MouseEvent<HTMLCanvasElement> | TouchEvent;

export interface canvasOffsetType {
  offsetWidth: number;
  offsetHeight: number;
  offsetLeft: number;
  offsetTop: number;
}

export interface GameHistoryResponse {
  sessionId: number;
  memberId: number;
  score: number;
  updatedAt: string;
}

export type HistoryViewType = 'DATE' | 'SESSION';

export type NoticeItemType = {
  id: number;
  title: string;
  description: string;
  date: string;
};
