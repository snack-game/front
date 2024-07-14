import gsap from 'gsap';
import { t } from 'i18next';
import { Container, Rectangle, Text } from 'pixi.js';

import { AppScreen } from './appScreen';
import { SnackGameLogo } from '../ui/SnackGameLogo';
import { Waves } from '../ui/Waves';

/** assets 이 비동기로 로드되는 동안 보여지는 화면입니다. */
export class LoadScreen extends Container implements AppScreen {
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

    this.waves = new Waves([0xdb7b2d, 0xfb923c, 0xffedd5]);
    this.message = new Text({
      text: t('loading_start', { ns: 'game' }),
      style: {
        fill: 0xffffff,
        fontFamily: 'DovemayoGothic',
        align: 'center',
      },
    });
    this.message.anchor.set(0.5);
    this.snackGameLogo = new SnackGameLogo();
    this.addChild(this.waves, this.message, this.snackGameLogo);
  }

  async onPrepare({ width, height }: Rectangle) {
    this.waves.x = 0;
    this.waves.y = height;
  }

  public onResize({ width, height }: Rectangle) {
    this.message.x = width * 0.5;
    this.message.y = height * 0.7;

    this.snackGameLogo.x = width * 0.5;
    this.snackGameLogo.y = height * 0.5;

    this.waves.width = width;
    // TODO: 높이 변화도 대응해야합니당
  }

  public async onShow({ width, height }: Rectangle) {
    gsap.killTweensOf(this.message);
    this.message.alpha = 1;

    await gsap.to(this.waves, {
      y: height * 0.1,
      height: height * 0.9,
      duration: 1,
      ease: 'quad.out',
      delay: 0.2,
    });
  }

  public async onHide({ width, height }: Rectangle) {
    this.message.text = t('loading_end', { ns: 'game' });
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
      y: height,
      duration: 0.5,
      ease: 'quad.in',
      delay: 0.5,
    });
  }
}
