import gsap from 'gsap';
import { t } from 'i18next';
import { Container } from 'pixi.js';

import { Cloud } from './Cloud';
import { Label } from './Label';
import { registerCustomEase } from '../util/animation';
import { sfx } from '../util/audio';

/** 애니메이션 중간에 느려지는 효과를 주기 위한 커스텀 이즈 곡선 */
const easeMidSlowMotion = registerCustomEase(
  'M0,0 C0,0 0.023,0.173 0.045,0.276 0.05,0.301 0.058,0.319 0.07,0.34 0.077,0.355 0.085,0.37 0.1,0.375 0.352,0.46 0.586,0.52 0.875,0.612 0.891,0.617 0.904,0.623 0.915,0.634 0.928,0.648 0.936,0.664 0.945,0.683 0.955,0.707 0.96,0.725 0.965,0.751 0.981,0.846 1,1 1,1 ',
);

/**
 * 게임 시작 전 "준비 시작" 메시지를 표시하는 클래스.
 */
export class BeforGameStart extends Container {
  /** 내부 애니메이션을 위한 서브 컨테이너 */
  private readonly container: Container;
  /** 애니메이션된 구름 배경 */
  private readonly cloud: Cloud;
  /** 메시지를 표시하는 레이블 */
  private readonly messageLabel: Label;

  constructor() {
    super();

    this.container = new Container();
    this.addChild(this.container);

    this.cloud = new Cloud({
      color: 0xfff7ec,
      width: 400,
      height: 70,
      circleSize: 100,
    });
    this.container.addChild(this.cloud);

    this.messageLabel = new Label('', {
      fill: 0xfb923c,
      fontSize: 70,
    });
    this.container.addChild(this.messageLabel);
    this.visible = false;
  }

  /** "준비..." 애니메이션을 재생합니다. */
  private async playReadyAnimation() {
    gsap.killTweensOf(this.messageLabel);
    gsap.killTweensOf(this.messageLabel.scale);
    this.messageLabel.text = t('ready', { ns: 'game' });
    this.messageLabel.scale.set(0);
    this.messageLabel.y = -5;
    await gsap.to(this.messageLabel.scale, {
      x: 1,
      y: 1,
      duration: 0.7,
      ease: 'back.out',
    });
  }

  /** "시작" 애니메이션을 재생작니다. */
  private async playGoAnimation() {
    gsap.killTweensOf(this.messageLabel);
    gsap.killTweensOf(this.messageLabel.scale);
    await gsap.to(this.messageLabel, {
      alpha: 0,
      duration: 0.2,
      ease: 'sine.in',
    });
    await gsap.to(this.messageLabel.scale, {
      x: 1.5,
      y: 1.5,
      duration: 0.2,
      ease: 'sine.in',
    });
    this.messageLabel.y = 0;
    this.messageLabel.text = t('start', { ns: 'game' });
    this.messageLabel.scale.set(0.8);
    gsap.to(this.messageLabel, { alpha: 1, duration: 0.2, ease: 'linear' });
    gsap.to(this.messageLabel, {
      alpha: 0,
      duration: 0.2,
      ease: 'linear',
      delay: 0.6,
    });
    await gsap.to(this.messageLabel.scale, {
      x: 3,
      y: 3,
      duration: 0.8,
      ease: easeMidSlowMotion,
    });
  }

  /** "준비..." 애니메이션을 재생합니다. */
  public async show() {
    sfx.play('common/sfx-start.mp3', { speed: 0.8, volume: 0.5 });
    gsap.killTweensOf(this.container.scale);
    gsap.killTweensOf(this.container);
    this.visible = true;
    this.playReadyAnimation();
    await this.cloud.playFormAnimation(0.7);
  }

  /** "시작!" 애니메이션을 재생한 후 카운트다운을 숨깁니다. */
  public async hide() {
    sfx.play('common/sfx-start.mp3', { speed: 1, volume: 0.5 });
    this.playGoAnimation();
    await this.cloud.playDismissAnimation(1);
    this.visible = false;
  }
}
