import {
  KEY_VOLUME_BGM,
  KEY_VOLUME_MASTER,
  KEY_VOLUME_SFX,
} from '@constants/common.constant';

import { bgm, setMasterVolume, sfx } from './audio';
import { storage } from './storage';

// Keys for saved items in storage
/**
 * Persistent user settings of volumes and game mode.
 */
class UserSettings {
  constructor() {
    setMasterVolume(this.getMasterVolume());
    bgm.setVolume(this.getBgmVolume());
    sfx.setVolume(this.getSfxVolume());
  }

  /** Get overall sound volume */
  public getMasterVolume() {
    return storage.getNumber(KEY_VOLUME_MASTER) ?? 0.5;
  }

  /** Set overall sound volume */
  public setMasterVolume(value: number) {
    setMasterVolume(value);
    storage.setNumber(KEY_VOLUME_MASTER, value);
  }

  /** Get background music volume */
  public getBgmVolume() {
    return storage.getNumber(KEY_VOLUME_BGM) ?? 1;
  }

  /** Set background music volume */
  public setBgmVolume(value: number) {
    bgm.setVolume(value);
    storage.setNumber(KEY_VOLUME_BGM, value);
  }

  /** Get sound effects volume */
  public getSfxVolume() {
    return storage.getNumber(KEY_VOLUME_SFX) ?? 1;
  }

  /** Set sound effects volume */
  public setSfxVolume(value: number) {
    sfx.setVolume(value);
    storage.setNumber(KEY_VOLUME_SFX, value);
  }
}

/** SHared user settings instance */
export const userSettings = new UserSettings();
