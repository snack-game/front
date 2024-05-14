import gsap from 'gsap';
import { Container, Text } from 'pixi.js';

import { app } from '../SnackGameBase';
import { SnackGameLogo } from '../ui/SnackGameLogo';
import { Waves } from '../ui/Waves';

/** assets 이 비동기로 로드되는 동안 보여지는 화면입니다. */
export class LoadScreen extends Container {
  /** 화면에 필요한 assets 번들 리스트 */
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

  /** 화면 크기 변경 시 트리거 됩니다. */
  public resize(width: number, height: number) {
    this.message.x = width * 0.5;
    this.message.y = height * 0.7;

    this.snackGameLogo.x = width * 0.5;
    this.snackGameLogo.y = height * 0.5;

    this.waves.x = 0;
    this.waves.y = height;
    this.waves.width = width;
  }

  /** Screen 시작 시 보여지는 애니메이션 입니다. */
  public async show() {
    gsap.killTweensOf(this.message);
    this.message.alpha = 1;

    await gsap.to(this.waves, {
      y: app.renderer.height * 0.1,
      height: app.renderer.height * 0.9,
      duration: 1,
      ease: 'quad.out',
      delay: 0.2,
    });
  }

  /** Screen이 사라실 때 보여지는 애니메이션 입니다. */
  public async hide() {
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
