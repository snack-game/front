import { KEY_GAME_SETTINGS } from '@constants/localStorage.constant';

import { bgm, setMasterVolume, sfx } from './audio';
import { storage } from './storage';

class NewUserSettings {
  private settings: {
    hapticEnabled: boolean;
    volumeMaster: number;
    volumeBGM: number;
    volumeSFX: number;
  };

  constructor() {
    this.settings = this.loadSettings();
    setMasterVolume(this.getMasterVolume());
    bgm.setVolume(this.getBgmVolume());
    sfx.setVolume(this.getSfxVolume());
  }

  private loadSettings() {
    return storage.getObject(KEY_GAME_SETTINGS) ?? this.getDefaultSettings();
  }

  private getDefaultSettings() {
    return {
      hapticEnabled: true,
      volumeMaster: 0.5,
      volumeBGM: 1,
      volumeSFX: 1,
    };
  }

  private saveSettings() {
    storage.setObject(KEY_GAME_SETTINGS, this.settings);
  }

  /** 전체 사운드 볼륨을 가져옵니다. */
  public getMasterVolume() {
    return this.settings.volumeMaster;
  }

  /** 전체 사운드 볼륨을 설정합니다. */
  public setMasterVolume(value: number) {
    setMasterVolume(value);
    this.settings.volumeMaster = value;
    this.saveSettings();
  }

  /** 배경 음악 볼륨을 가져옵니다. */
  public getBgmVolume() {
    return this.settings.volumeBGM;
  }

  /** 배경 음악 볼륨을 설정합니다. */
  public setBgmVolume(value: number) {
    bgm.setVolume(value);
    this.settings.volumeBGM = value;
    this.saveSettings();
  }

  /** 효과음 볼륨을 가져옵니다. */
  public getSfxVolume() {
    return this.settings.volumeSFX;
  }

  /** 효과음 볼륨을 설정합니다. */
  public setSfxVolume(value: number) {
    sfx.setVolume(value);
    this.settings.volumeSFX = value;
    this.saveSettings();
  }

  /** 햅틱 활성화 여부를 설정합니다. */
  public setHapticEnabled(value: boolean) {
    this.settings.hapticEnabled = value;
    this.saveSettings();
  }

  /** 햅틱 활성화 여부를 가져옵니다. */
  public getHapticEnabled() {
    return this.settings.hapticEnabled;
  }
}

/** 공유된 사용자 설정 인스턴스 */
export const newUserSettings = new NewUserSettings();
