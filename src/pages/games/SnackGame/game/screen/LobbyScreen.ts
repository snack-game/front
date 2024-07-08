import gsap from 'gsap';
import { t } from 'i18next';
import { Container } from 'pixi.js';

import { GameScreen } from './GameScreen';
import { SettingsPopup } from '../popup/SettingPopup';
import { app, eventEmitter } from '../SnackGameBase';
import { IconButton } from '../ui/IconButton';
import { LargeButton } from '../ui/LargeButton';
import { SnackGameLetter } from '../ui/SnackGameLetter';
import { Waves } from '../ui/Waves';
import { gameStart } from '../util/api';
import { bgm } from '../util/audio';
import { setUrlParam } from '../util/getUrlParams';
import { navigation } from '../util/navigation';
import { storage } from '../util/storage';

export class LobbyScreen extends Container {
  public static assetBundles = ['common'];

  /** 기본 모드 시작 버튼 */
  private defaultModButton: LargeButton;
  /** wave 효과 */
  private waves: Waves;
  /** snack game letter logo */
  private snackGameLetter: SnackGameLetter;
  /** 설정 버튼 */
  private settingsButton: IconButton;

  constructor() {
    super();

    this.settingsButton = new IconButton({
      image: 'settings',
      ripple: 'ripple',
    });
    this.settingsButton.onPress.connect(() =>
      navigation.presentPopup(SettingsPopup),
    );
    this.addChild(this.settingsButton);

    this.waves = new Waves([0xdb7b2d, 0xfb923c, 0xffedd5]);
    this.addChild(this.waves);

    this.defaultModButton = new LargeButton({
      text: t('default_mode', { ns: 'game' }),
    });
    this.defaultModButton.onPress.connect(this.handleGameStartButton);

    this.addChild(this.defaultModButton);
    this.snackGameLetter = new SnackGameLetter();
    this.addChild(this.snackGameLetter);
  }

  public handleGameStartButton = async () => {
    try {
      const data = await gameStart();
      storage.setObject('game-stats', { ...data });
      setUrlParam('mode', 'default');
      navigation.showScreen(GameScreen);
    } catch (error) {
      eventEmitter.emit('error', error);
    }
  };

  /** 화면 크기 변경 시 트리거 됩니다. */
  public resize(width: number, height: number) {
    this.defaultModButton.x = width * 0.5;
    this.defaultModButton.y = height * 0.8;
    this.defaultModButton.width = width * 0.5;
    this.defaultModButton.height = height * 0.1;

    this.waves.x = 0;
    this.waves.y = height;
    this.waves.width = width;

    this.snackGameLetter.x = width * 0.5;
    this.snackGameLetter.y = height * 0.3;

    this.settingsButton.x = width - 25;
    this.settingsButton.y = 25;
  }

  /** Screen 시작 시 보여지는 애니메이션 입니다. */
  public async show() {
    bgm.play('common/bgm-lobby.mp3', { volume: 0.5 });

    this.defaultModButton.hide(false);
    this.settingsButton.hide(false);
    this.snackGameLetter.hide(false);

    gsap.to(this.waves, {
      y: app.renderer.height * 0.85,
      height: app.renderer.height * 0.3,
      duration: 1,
      ease: 'quad.out',
      delay: 0.5,
    });

    this.snackGameLetter.show();
    this.defaultModButton.show();
    this.settingsButton.show();
  }

  /** Screen 시작 시 보여지는 애니메이션 입니다. */
  public async hide() {
    this.defaultModButton.hide();
    this.snackGameLetter.hide();
    this.settingsButton.hide(false);

    gsap.to(this.waves, {
      y: app.renderer.height,
      duration: 0.5,
      ease: 'quad.out',
      delay: 0.5,
    });
  }
}
