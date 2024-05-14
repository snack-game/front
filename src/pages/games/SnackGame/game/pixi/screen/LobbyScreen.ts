import gsap from 'gsap';
import { Container, Text } from 'pixi.js';

import { app } from '../SnackGameBase';
import { LargeButton } from '../ui/LargeButton';
import { SnackGameLetter } from '../ui/SnackGameLetter';
import { Waves } from '../ui/Waves';

export class LobbyScreen extends Container {
  public static assetBundles = ['common'];

  /** 기본 모드 시작 버튼 */
  private defaultModButton: LargeButton;
  /** 무한 모드 시작 버튼 */
  private infModButton: LargeButton;
  /** wave 효과 */
  private waves: Waves;
  /** snack game letter logo */
  private snackGameLetter: SnackGameLetter;

  constructor() {
    super();

    this.waves = new Waves();
    this.addChild(this.waves);

    this.defaultModButton = new LargeButton({ text: '기본 모드' });
    this.addChild(this.defaultModButton);

    this.infModButton = new LargeButton({ text: '무한 모드' });
    this.addChild(this.infModButton);

    this.snackGameLetter = new SnackGameLetter();
    this.addChild(this.snackGameLetter);
  }

  /** 화면 크기 변경 시 트리거 됩니다. */
  public resize(width: number, height: number) {
    this.defaultModButton.x = width * 0.5;
    this.defaultModButton.y = height * 0.6;
    this.defaultModButton.width = width * 0.5;
    this.defaultModButton.height = height * 0.1;

    this.infModButton.x = width * 0.5;
    this.infModButton.y = height * 0.75;
    this.infModButton.width = width * 0.5;
    this.infModButton.height = height * 0.1;

    this.waves.x = 0;
    this.waves.y = height;
    this.waves.width = width;

    this.snackGameLetter.x = width / 2;
    this.snackGameLetter.y = -200;
  }

  /** Screen 시작 시 보여지는 애니메이션 입니다. */
  public async show() {
    this.defaultModButton.hide(false);
    this.infModButton.hide(false);

    gsap.to(this.snackGameLetter, {
      y: app.renderer.height * 0.3,
      duration: 1.5,
      ease: 'bounce.out',
      delay: 0.5,
    });

    gsap.to(this.waves, {
      y: app.renderer.height * 0.85,
      height: app.renderer.height * 0.3,
      duration: 1,
      ease: 'quad.out',
      delay: 0.5,
    });

    await this.defaultModButton.show();
    await this.infModButton.show();
  }
}
