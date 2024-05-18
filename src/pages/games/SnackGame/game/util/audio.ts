import { PlayOptions, Sound, sound } from '@pixi/sound';
import gsap from 'gsap';

/**
 * 배경 음악을 관리하며, 한 번에 하나의 오디오 파일만 루프로 재생하고,
 * 새로운 음악이 요청될 때 이전 음악을 페이드 아웃하거나 정지합니다.
 * 또한, 다른 사운드의 볼륨은 변경하지 않고 배경 음악만의 볼륨 조절 기능을 제공합니다.
 */
class BGM {
  /** 현재 재생 중인 음악의 별칭 */
  public currentAlias?: string;
  /** 현재 재생 중인 음악 인스턴스 */
  public current?: Sound;
  /** 설정된 현재 볼륨 */
  private volume = 1;

  /** 배경 음악을 재생하며, 이전 음악이 있다면 페이드 아웃 후 정지합니다 */
  public async play(alias: string, options?: PlayOptions) {
    // 요청된 음악이 이미 재생 중이면 아무 것도 하지 않음
    if (this.currentAlias === alias) return;

    // 현재 음악을 페이드 아웃 후 정지
    if (this.current) {
      const current = this.current;
      gsap.killTweensOf(current);
      gsap.to(current, { volume: 0, duration: 1, ease: 'linear' }).then(() => {
        current.stop();
      });
    }

    // 재생될 새로운 인스턴스를 찾기
    this.current = sound.find(alias);

    // 새 음악 재생 및 페이드 인
    this.currentAlias = alias;
    this.current.play({ loop: true, ...options });
    this.current.volume = 0;
    gsap.killTweensOf(this.current);
    gsap.to(this.current, { volume: this.volume, duration: 1, ease: 'linear' });
  }

  /** 배경 음악의 볼륨을 가져옵니다 */
  public getVolume() {
    return this.volume;
  }

  /** 배경 음악의 볼륨을 설정합니다 */
  public setVolume(v: number) {
    this.volume = v;
    if (this.current) this.current.volume = this.volume;
  }
}

/**
 * 짧은 특수 효과음을 처리합니다. 주로 자체 볼륨 설정이 필요하기 때문입니다.
 * 볼륨 조절은 이 유형의 사운드만 작동하도록 하는 해결책이며,
 * 현재 재생 중인 인스턴스의 볼륨은 제어하지 않고 새로운 인스턴스만 볼륨이 변경됩니다.
 * 하지만 대부분의 효과음이 짧기 때문에 이는 일반적으로 문제가 되지 않습니다.
 */
class SFX {
  /** 새 인스턴스의 볼륨 스케일 */
  private volume = 1;

  /** 한 번만 재생되는 사운드 효과를 재생합니다 */
  public play(alias: string, options?: PlayOptions) {
    const volume = this.volume * (options?.volume ?? 1);
    sound.play(alias, { ...options, volume });
  }

  /** 사운드 효과의 볼륨을 가져옵니다 */
  public getVolume() {
    return this.volume;
  }

  /** 사운드 효과의 볼륨을 설정합니다. 현재 재생 중인 인스턴스에는 영향을 주지 않습니다 */
  public setVolume(v: number) {
    this.volume = v;
  }
}

/** 전체 사운드 볼륨을 가져옵니다 */
export function getMasterVolume() {
  return sound.volumeAll;
}

/** 전체 사운드 볼륨을 설정합니다. 모든 음악과 사운드 효과에 영향을 줍니다 */
export function setMasterVolume(v: number) {
  sound.volumeAll = v;
  if (!v) {
    sound.muteAll();
  } else {
    sound.unmuteAll();
  }
}
/** 공유 배경 음악 컨트롤러 */
export const bgm = new BGM();

/** 공유 사운드 효과 컨트롤러 */
export const sfx = new SFX();
