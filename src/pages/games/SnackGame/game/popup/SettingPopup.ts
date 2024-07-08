import { List } from '@pixi/ui';
import gsap from 'gsap';
import { t } from 'i18next';
import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';

import { GAMEVERSION } from '@constants/common.constant';

import { eventEmitter } from '../SnackGameBase';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { RoundedBox } from '../ui/RoundedBox';
import { VolumeSlider } from '../ui/VolumeSlider';
import { gamePause, gameResume } from '../util/api';
import { navigation } from '../util/navigation';
import { storage } from '../util/storage';
import { userSettings } from '../util/userSetting';

/** 볼륨 설정을 위한 팝업 */
export class SettingsPopup extends Container {
  /** 현재 화면을 덮는 어두운 반투명 배경 */
  private bg: Sprite;
  /** 팝업 UI 구성 요소를 위한 컨테이너 */
  private panel: Container;
  /** 팝업 제목 레이블 */
  private title: Label;
  /** 팝업을 닫는 버튼 */
  private doneButton: LargeButton;
  /** 패널 배경 */
  private panelBase: RoundedBox;
  /** 게임 빌드 버전 레이블 */
  private versionLabel: Label;
  /** UI 구성 요소를 정리하는 레이아웃 */
  private layout: List;
  /** 마스터 볼륨을 변경하는 슬라이더 */
  private masterSlider: VolumeSlider;
  /** 배경 음악 볼륨을 변경하는 슬라이더 */
  private bgmSlider: VolumeSlider;
  /** 효과음 볼륨을 변경하는 슬라이더 */
  private sfxSlider: VolumeSlider;

  constructor() {
    super();

    this.bg = new Sprite(Texture.WHITE);
    this.bg.tint = 0xffedd5;
    this.bg.interactive = true;
    this.addChild(this.bg);

    this.panel = new Container();
    this.addChild(this.panel);

    this.panelBase = new RoundedBox({ height: 600 });
    this.panel.addChild(this.panelBase);

    this.title = new Label(t('setting', { ns: 'game' }), {
      fill: 0xfb923c,
      fontSize: 50,
    });
    this.title.y = -this.panelBase.boxHeight * 0.5 + 60;
    this.panel.addChild(this.title);

    this.doneButton = new LargeButton({ text: t('confirm', { ns: 'game' }) });
    this.doneButton.y = this.panelBase.boxHeight * 0.5 - 78;
    this.doneButton.onPress.connect(this.handleDoneButton);
    this.panel.addChild(this.doneButton);

    this.versionLabel = new Label(
      `${t('version', { ns: 'game' })} ${GAMEVERSION}`,
      {
        fill: 0xfb923c,
        fontSize: 12,
      },
    );
    this.versionLabel.alpha = 0.5;
    this.versionLabel.y = this.panelBase.boxHeight * 0.5 - 15;
    this.panel.addChild(this.versionLabel);

    this.layout = new List({ type: 'vertical', elementsMargin: 4 });
    this.layout.x = -140;
    this.layout.y = -160;
    this.panel.addChild(this.layout);

    this.masterSlider = new VolumeSlider(t('master_volume', { ns: 'game' }));
    this.masterSlider.onUpdate.connect((v) => {
      userSettings.setMasterVolume(v / 100);
    });
    this.layout.addChild(this.masterSlider);

    this.bgmSlider = new VolumeSlider(t('bgm_volume', { ns: 'game' }));
    this.bgmSlider.onUpdate.connect((v) => {
      userSettings.setBgmVolume(v / 100);
    });
    this.layout.addChild(this.bgmSlider);

    this.sfxSlider = new VolumeSlider(t('sfx_volume', { ns: 'game' }));
    this.sfxSlider.onUpdate.connect((v) => {
      userSettings.setSfxVolume(v / 100);
    });
    this.layout.addChild(this.sfxSlider);
  }

  public handleDoneButton = async () => {
    try {
      const gameStats = storage.getObject('game-stats');

      if (gameStats.state === 'PAUSED') {
        const data = await gameResume(gameStats.sessionId);
        storage.setObject('game-stats', { ...data });
      }

      navigation.dismissPopup();
    } catch (error) {
      eventEmitter.emit('error', error);
    }
  };

  /** 창 크기가 변경될 때마다 팝업 크기 조정 */
  public resize(width: number, height: number) {
    this.bg.width = width;
    this.bg.height = height;
    this.panel.x = width * 0.5;
    this.panel.y = height * 0.5;
  }

  /** 팝업을 표시하기 직전에 설정 */
  public prepare() {
    this.masterSlider.value = userSettings.getMasterVolume() * 100;
    this.bgmSlider.value = userSettings.getBgmVolume() * 100;
    this.sfxSlider.value = userSettings.getSfxVolume() * 100;
  }

  /** 팝업을 애니메이션과 함께 표시 */
  public async show() {
    if (navigation.currentScreen) {
      navigation.currentScreen.filters = [new BlurFilter({ strength: 4 })];
    }
    gsap.killTweensOf(this.bg);
    gsap.killTweensOf(this.panel.pivot);
    this.bg.alpha = 0;
    this.panel.pivot.y = -400;
    gsap.to(this.bg, { alpha: 0.8, duration: 0.2, ease: 'linear' });
    await gsap.to(this.panel.pivot, { y: 0, duration: 0.3, ease: 'back.out' });

    const gameStats = storage.getObject('game-stats');

    if (gameStats.state === 'IN_PROGRESS') {
      try {
        const data = await gamePause(gameStats.sessionId);
        storage.setObject('game-stats', { ...data });
      } catch (error) {
        eventEmitter.emit('error', error);
      }
    }
  }

  /** 팝업을 애니메이션과 함께 해제 */
  public async hide() {
    if (navigation.currentScreen) {
      navigation.currentScreen.filters = [];
    }
    gsap.killTweensOf(this.bg);
    gsap.killTweensOf(this.panel.pivot);
    gsap.to(this.bg, { alpha: 0, duration: 0.2, ease: 'linear' });
    await gsap.to(this.panel.pivot, {
      y: -500,
      duration: 0.3,
      ease: 'back.in',
    });
  }
}
