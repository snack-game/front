import gsap from 'gsap';
import { t } from 'i18next';
import { Container } from 'pixi.js';

import { GameScreen } from './GameScreen';
import { app } from '../SnackGameBase';
import { IconButton } from '../ui/IconButton';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { SettingsPopup } from '../ui/SettingPopup';
import { Waves } from '../ui/Waves';
import { bgm } from '../util/audio';
import { navigation } from '../util/navigation';
import { userSettings } from '../util/userSetting';
import { userStats } from '../util/userStats';

export class ResultScreen extends Container {
  /** 기본 모드 시작 버튼 */
  private retryButton: LargeButton;
  /** wave 효과 */
  private waves: Waves;
  /** 설정 버튼 */
  private settingsButton: IconButton;
  /** 점수 라벨 */
  private scoreLabel: Label;
  /** 재시작 버튼 */
  private continueButton: LargeButton;

  constructor() {
    super();

    const mode = userSettings.getGameMode();
    const score = userStats.load(mode).score;

    this.settingsButton = new IconButton({
      image: 'settings',
      ripple: 'ripple',
    });
    this.settingsButton.onPress.connect(() =>
      navigation.presentPopup(SettingsPopup),
    );
    this.addChild(this.settingsButton);

    this.retryButton = new LargeButton({
      text: t('restart', { ns: 'game' }),
    });

    this.waves = new Waves([0xdb7b2d, 0xfb923c, 0xffedd5]);
    this.addChild(this.waves);

    this.scoreLabel = new Label(`${score}${t('score', { ns: 'game' })}!`);
    this.scoreLabel.y = -10;
    this.addChild(this.scoreLabel);

    this.continueButton = new LargeButton({
      text: t('restart', { ns: 'game' }),
    });
    this.addChild(this.continueButton);
    this.continueButton.onPress.connect(() =>
      navigation.showScreen(GameScreen),
    );
  }

  /** 화면 크기 변경 시 트리거 됩니다. */
  public resize(width: number, height: number) {
    this.retryButton.x = width * 0.5;
    this.retryButton.y = height * 0.6;
    this.retryButton.width = width * 0.5;
    this.retryButton.height = height * 0.1;

    this.waves.x = 0;
    this.waves.y = height;
    this.waves.width = width;

    this.scoreLabel.x = width * 0.5;
    this.scoreLabel.y = height * 0.4;

    this.settingsButton.x = width - 25;
    this.settingsButton.y = 25;

    this.continueButton.x = width * 0.5;
    this.continueButton.y = height * 0.75;
    this.continueButton.width = width * 0.5;
    this.continueButton.height = height * 0.1;
  }

  /** Screen 시작 시 보여지는 애니메이션 입니다. */
  public async show() {
    bgm.play('common/bgm-lobby.mp3', { volume: 0.5 });

    this.retryButton.hide(false);
    this.settingsButton.hide(false);
    this.continueButton.hide(false);

    gsap.to(this.waves, {
      y: app.renderer.height * 0.85,
      height: app.renderer.height * 0.3,
      duration: 1,
      ease: 'quad.out',
      delay: 0.5,
    });

    this.retryButton.show();
    this.settingsButton.show();
    this.continueButton.show();
  }

  /** Screen 시작 시 보여지는 애니메이션 입니다. */
  public async hide() {
    this.retryButton.hide();
    this.settingsButton.hide(false);
    this.continueButton.hide();

    gsap.to(this.waves, {
      y: app.renderer.height,
      duration: 0.5,
      ease: 'quad.out',
      delay: 0.5,
    });
  }
}
