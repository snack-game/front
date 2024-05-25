import { List } from '@pixi/ui';
import gsap from 'gsap';
import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';

import { GAMEVERSION } from '@constants/common.constant';

import { VolumeSlider } from './VolumeSlider';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { RoundedBox } from '../ui/RoundedBox';
import { navigation } from '../util/navigation';
import { userSettings } from '../util/userSetting';

/** Popup for volume and game mode settings - game mode cannot be changed during gameplay */
export class SettingsPopup extends Container {
  /** The dark semi-transparent background covering current screen */
  private bg: Sprite;
  /** Container for the popup UI components */
  private panel: Container;
  /** The popup title label */
  private title: Label;
  /** Button that closes the popup */
  private doneButton: LargeButton;
  /** The panel background */
  private panelBase: RoundedBox;
  /** The game build version label */
  private versionLabel: Label;
  /** Layout that organises the UI components */
  private layout: List;
  /** Slider that changes the master volume */
  private masterSlider: VolumeSlider;
  /** Slider that changes background music volume */
  private bgmSlider: VolumeSlider;
  /** Slider that changes sound effects volume */
  private sfxSlider: VolumeSlider;

  constructor() {
    super();

    this.bg = new Sprite(Texture.WHITE);
    this.bg.tint = 0x0a0025;
    this.bg.interactive = true;
    this.addChild(this.bg);

    this.panel = new Container();
    this.addChild(this.panel);

    this.panelBase = new RoundedBox({ height: 600 });
    this.panel.addChild(this.panelBase);

    this.title = new Label('설정', {
      fill: 0xffd579,
      fontSize: 50,
    });
    this.title.y = -this.panelBase.boxHeight * 0.5 + 60;
    this.panel.addChild(this.title);

    this.doneButton = new LargeButton({ text: '완료' });
    this.doneButton.y = this.panelBase.boxHeight * 0.5 - 78;
    this.doneButton.onPress.connect(() => navigation.dismissPopup());
    this.panel.addChild(this.doneButton);

    this.versionLabel = new Label(`게임 버전 ${GAMEVERSION}`, {
      fill: 0xffffff,
      fontSize: 12,
    });
    this.versionLabel.alpha = 0.5;
    this.versionLabel.y = this.panelBase.boxHeight * 0.5 - 15;
    this.panel.addChild(this.versionLabel);

    this.layout = new List({ type: 'vertical', elementsMargin: 4 });
    this.layout.x = -140;
    this.layout.y = -160;
    this.panel.addChild(this.layout);

    this.masterSlider = new VolumeSlider('Master');
    this.masterSlider.onUpdate.connect((v) => {
      userSettings.setMasterVolume(v / 100);
    });
    this.layout.addChild(this.masterSlider);

    this.bgmSlider = new VolumeSlider('BGM');
    this.bgmSlider.onUpdate.connect((v) => {
      userSettings.setBgmVolume(v / 100);
    });
    this.layout.addChild(this.bgmSlider);

    this.sfxSlider = new VolumeSlider('SFX');
    this.sfxSlider.onUpdate.connect((v) => {
      userSettings.setSfxVolume(v / 100);
    });
    this.layout.addChild(this.sfxSlider);
  }

  /** Resize the popup, fired whenever window size changes */
  public resize(width: number, height: number) {
    this.bg.width = width;
    this.bg.height = height;
    this.panel.x = width * 0.5;
    this.panel.y = height * 0.5;
  }

  /** Set things up just before showing the popup */
  public prepare() {
    this.masterSlider.value = userSettings.getMasterVolume() * 100;
    this.bgmSlider.value = userSettings.getBgmVolume() * 100;
    this.sfxSlider.value = userSettings.getSfxVolume() * 100;
  }

  /** Present the popup, animated */
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
  }

  /** Dismiss the popup, animated */
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
