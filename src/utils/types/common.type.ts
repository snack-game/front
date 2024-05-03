import React from 'react';

import { AnimationItem } from 'lottie-web';

import { GroupType, MemberType } from '@utils/types/member.type';

export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';

export interface ModalType {
  open?: boolean;
  children?: React.ReactNode;
  handleOutsideClick?: () => void;
}

export interface toastStateType {
  id?: string;
  message: string;
  type?: ToastType;
}

export type LottieOptionTypes = {
  loop?: boolean;
  autoplay?: boolean;
  assetsPath?: string;
  name?: string;
  animationData: object;
  controller?: React.MutableRefObject<AnimationItem | null>;
  stopFrame?: number;
  playOnHover?: boolean;
  playOnToggle?: boolean;
};

export type RankingType = {
  rank: number;
  owner: MemberType;
  score: number;
  message?: string;
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
