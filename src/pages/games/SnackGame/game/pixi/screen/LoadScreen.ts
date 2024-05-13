import gsap from 'gsap';
import { Container, Text } from 'pixi.js';

import { app } from '../SnackGameBase';
import { SnackGameLogo } from '../ui/SnackGameLogo';
import { Waves } from '../ui/Waves';

/** Screen shown while loading assets */
export class LoadScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ['preload'];

  /** 로딩 메시지 */
  private message: Text;
  /** 스낵게임 로고 */
  private snackGameLogo: SnackGameLogo;
  /** wave 효과 */
  private waves: Waves;

  constructor() {
    super();

    this.waves = new Waves();
    this.addChild(this.waves);

    this.message = new Text({
      text: '로딩중..',
      style: {
        fill: 0xffffff,
        fontFamily: 'DovemayoGothic',
        align: 'center',
      },
    });
    this.message.anchor.set(0.5);
    this.addChild(this.message);

    this.snackGameLogo = new SnackGameLogo();
    this.addChild(this.snackGameLogo);
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {
    this.message.x = width * 0.5;
    this.message.y = height * 0.7;
    this.snackGameLogo.x = width * 0.5;
    this.snackGameLogo.y = height * 0.5;
    this.waves.x = 0;
    this.waves.y = height;
    this.waves.width = width;
  }

  /** Show screen with animations */
  public async show() {
    gsap.killTweensOf(this.message);
    this.message.alpha = 1;

    await gsap.to(this.waves, {
      y: app.renderer.height * 0.1,
      height: app.renderer.height * 0.9,
      duration: 1,
      ease: 'quad.in',
      delay: 0.2,
    });
  }

  /** Hide screen with animations */
  public async hide() {
    // Change then hide the loading message
    this.message.text = '로딩 완료!';
    gsap.killTweensOf(this.message);
    gsap.to(this.message, {
      alpha: 0,
      duration: 0.3,
      ease: 'linear',
      delay: 0.5,
    });

    gsap.to(this.snackGameLogo, {
      alpha: 0,
      duration: 0.3,
      ease: 'linear',
      delay: 0.5,
    });

    await gsap.to(this.waves, {
      y: app.renderer.height,
      duration: 0.5,
      ease: 'quad.in',
      delay: 0.5,
    });
  }
}
