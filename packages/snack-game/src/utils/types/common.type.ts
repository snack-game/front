import { AnimationItem } from 'lottie-web';

export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';

export interface ModalType {
  title?: string;
  description?: string;
  open?: boolean;
  children?: React.ReactNode;
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
  ranking: number;
  owner: {
    id: number;
    name: string;
    group: string | null;
  };
  score: number;
  message?: string;
};
