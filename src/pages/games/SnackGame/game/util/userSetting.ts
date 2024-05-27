import {
  KEY_VOLUME_BGM,
  KEY_VOLUME_MASTER,
  KEY_VOLUME_SFX,
} from '@constants/common.constant';

import { bgm, setMasterVolume, sfx } from './audio';
import { storage } from './storage';

/**
 * 볼륨 및 게임 모드의 지속적인 사용자 설정.
 */
class UserSettings {
  constructor() {
    setMasterVolume(this.getMasterVolume());
    bgm.setVolume(this.getBgmVolume());
    sfx.setVolume(this.getSfxVolume());
  }

  /** 전체 사운드 볼륨을 가져옵니다. */
  public getMasterVolume() {
    return storage.getNumber(KEY_VOLUME_MASTER) ?? 0.5;
  }

  /** 전체 사운드 볼륨을 설정합니다. */
  public setMasterVolume(value: number) {
    setMasterVolume(value);
    storage.setNumber(KEY_VOLUME_MASTER, value);
  }

  /** 배경 음악 볼륨을 가져옵니다. */
  public getBgmVolume() {
    return storage.getNumber(KEY_VOLUME_BGM) ?? 1;
  }

  /** 배경 음악 볼륨을 설정합니다. */
  public setBgmVolume(value: number) {
    bgm.setVolume(value);
    storage.setNumber(KEY_VOLUME_BGM, value);
  }

  /** 효과음 볼륨을 가져옵니다. */
  public getSfxVolume() {
    return storage.getNumber(KEY_VOLUME_SFX) ?? 1;
  }

  /** 효과음 볼륨을 설정합니다. */
  public setSfxVolume(value: number) {
    sfx.setVolume(value);
    storage.setNumber(KEY_VOLUME_SFX, value);
  }
}

/** 공유된 사용자 설정 인스턴스 */
export const userSettings = new UserSettings();
