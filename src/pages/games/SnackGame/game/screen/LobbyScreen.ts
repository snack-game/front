import gsap from 'gsap';
import { t } from 'i18next';
import { Container, Rectangle } from 'pixi.js';

import { AppScreen } from './appScreen';
import { GameScreen } from './GameScreen';
import { SnackgameApplication } from './SnackgameApplication';
import { SettingsPopup } from '../popup/SettingPopup';
import { IconButton } from '../ui/IconButton';
import { LargeButton } from '../ui/LargeButton';
import { SnackGameLetter } from '../ui/SnackGameLetter';
import { Waves } from '../ui/Waves';
import { bgm } from '../util/audio';

export class LobbyScreen extends Container implements AppScreen {
  public static assetBundles = ['common'];

  /** 기본 모드 시작 버튼 */
  private defaultModButton: LargeButton;
  /** wave 효과 */
  private waves: Waves;
  /** snack game letter logo */
  private snackGameLetter: SnackGameLetter;
  /** 설정 버튼 */
  private settingsButton: IconButton;

  constructor(
    private app: SnackgameApplication,
    private handleSetMode: (mode: string) => void,
  ) {
    super();

    this.waves = new Waves([0xdb7b2d, 0xfb923c, 0xffedd5]);
    this.settingsButton = new IconButton({
      image: 'settings',
      ripple: 'ripple',
    });
    this.settingsButton.onPress.connect(() => app.presentPopup(SettingsPopup));
    this.defaultModButton = new LargeButton({
      text: t('default_mode', { ns: 'game' }),
    });
    this.defaultModButton.onPress.connect(this.handleGameStartButton);
    this.snackGameLetter = new SnackGameLetter();
    this.addChild(this.settingsButton, this.waves, this.snackGameLetter, this.defaultModButton);
  }

  public handleGameStartButton = async () => {
    try {
      this.handleSetMode("default");
      this.app.show(GameScreen);
    } catch (error) {
      this.app.setError(error);
    }
  };

  public async onPrepare({ width, height }: Rectangle) {
    this.waves.x = 0;
    this.waves.y = height;
  }

  public onResize({ width, height }: Rectangle) {
    this.defaultModButton.x = width * 0.5;
    this.defaultModButton.y = height * 0.8;
    this.defaultModButton.scale = 0.7;

    this.waves.width = width;

    this.snackGameLetter.x = width * 0.5;
    this.snackGameLetter.y = height * 0.3;

    this.settingsButton.x = width - 25;
    this.settingsButton.y = 25;
  }

  public async onShow({ width, height }: Rectangle) {
    bgm.play('common/bgm-lobby.mp3', { volume: 0.5 });

    this.defaultModButton.hide(false);
    this.settingsButton.hide(false);
    this.snackGameLetter.hide(false);

    gsap.to(this.waves, {
      y: height * 0.85,
      height: height * 0.3,
      duration: 1,
      ease: 'quad.out',
      delay: 0.5,
    });

    this.snackGameLetter.show();
    this.defaultModButton.show();
    this.settingsButton.show();
  }

  public async onHide({ width, height }: Rectangle) {
    this.defaultModButton.hide();
    this.snackGameLetter.hide();
    this.settingsButton.hide(false);

    gsap.to(this.waves, {
      y: height,
      duration: 0.5,
      ease: 'quad.out',
      delay: 0.5,
    });
  }
}
