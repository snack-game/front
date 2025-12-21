import {
  SnackGameBizStart,
  SnackGameBizVerify,
} from '@pages/games/SnackgameBiz/game.type';

import {
  SnackGameDefaultResponse,
  SnackGameStart,
  SnackGameVerify,
} from './game.type';
import { SnackGamePosition, StreakWithMeta } from './snackGame/SnackGameUtil';

/**
 * 게임 핸들러 타입
 */
export interface GameHandlers {
  start: () => Promise<SnackGameStart | SnackGameBizStart>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  end: () => Promise<void>;
  streak: (
    streak: StreakWithMeta,
    isGolden: boolean,
  ) => Promise<SnackGameVerify | SnackGameBizVerify>;
}

/**
 * 아이템 핸들러 타입
 */
export interface ItemHandlers {
  bomb: (
    position: SnackGamePosition,
    isGolden: boolean,
  ) => Promise<SnackGameDefaultResponse>;
  fever: () => Promise<SnackGameDefaultResponse>;
}
