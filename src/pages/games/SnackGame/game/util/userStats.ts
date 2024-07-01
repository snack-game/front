import { KEY_PREFIX_STATS } from '@constants/localStorage.constant';

import { storage } from './storage';
import { SnackGameStateData } from '../snackGame/SnackGameStats';
import { SnackGameMode } from '../snackGame/SnackGameUtil';

/**
 * Organise persistent user gameplay stats by game mode, meaning that each
 * game mode will have its own score and best score saved, also a bunch of other
 * properties that could be useful like number of matches, popped pieces, etc.
 */
export class UserStats {
  /**
   * Load last saved gameplay stats for a game mode
   * @param mode A valid game mode
   * @returns Gameplay stats of given mode
   */
  public load(mode: SnackGameMode): SnackGameStateData {
    const obj = storage.getObject(KEY_PREFIX_STATS + mode);
    if (!obj) {
      return {
        score: 0,
        matches: 0,
        pops: 0,
        grade: 0,
      };
    }
    return obj;
  }

  /**
   * Save gameplay stats for given gamemode.It will also update the best score
   * for the game mode, if the provided score is higher.
   * @param mode A valid game mode
   * @param data The stats data to be saved
   */
  public save(mode: SnackGameMode, data: SnackGameStateData) {
    storage.setObject(KEY_PREFIX_STATS + mode, data);
  }
}

/** Shared user stats instance */
export const userStats = new UserStats();
