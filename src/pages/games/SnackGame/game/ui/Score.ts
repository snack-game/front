import gsap from 'gsap';
import { Container, Graphics } from 'pixi.js';

import { Label } from './Label';
import { Waves } from './Waves';

/**
 * 게임 플레이 동안 표시되는 게임 점수입니다.
 */
export class Score extends Container {
  /** 애니메이션을 위한 내부 컨테이너 */
  private container: Container;
  /** 표시되는 점수 숫자 */
  private messageLabel: Label;
  /** 현재 설정된 점수 */
  private points = -1;
  /** 숨겨졌을 때 false가 됩니다 */
  private showing = true;
  /** 실제 점수에 도달할 때까지 점진적으로 증가하는 점수 */
  private animatedPoints = 0;
  /** 파도 효과 */
  private readonly waves: Waves;
  /** 애니메이션 컨테이너 원형 마스크 */
  private readonly background: Graphics;
  /** 배경 색상을 위한 그래픽 컴포넌트 */
  private readonly circle: Graphics;
  /** 점수가 업데이트될 때마다 증가하는 빈도수에 따라 sfx 재생 피치 변경 */
  private intensity = 0;

  constructor() {
    super();

    this.background = new Graphics();
    this.background.circle(0, 0, 50);
    this.background.fill(0xfff7ec);
    this.addChild(this.background);

    this.circle = new Graphics();
    this.circle.circle(0, 0, 50);
    this.circle.fill(0xfff7ec);
    this.addChild(this.circle);

    this.container = new Container();
    this.container.mask = this.circle;
    this.addChild(this.container);

    this.waves = new Waves([0xea4141, 0xff7979]);
    this.waves.x = -100;
    this.container.addChild(this.waves);

    this.messageLabel = new Label('0', {
      fill: 0xfb923c,
      fontSize: 30,
      fontFamily: 'DovemayoGothic',
    });
    this.container.addChild(this.messageLabel);

    this.points = 0;
  }

  // waves width 설정
  public set width(value: number) {
    this.waves.width = value;
    this.waves.x = -value / 2;
    this.waves.y = 40;
  }

  // waves height 설정
  public set height(value: number) {
    this.waves.height = value * 2;
  }

  /** waves 컴포넌트의 포지션 y값을 조금씩 뺍니다. */
  public async upWavesPosition() {
    gsap.to(this.waves, {
      y: this.waves.y - 1,
      duration: 1,
      ease: 'back.in',
    });
  }

  /** 점수를 0으로 리셋합니다 */
  public reset() {
    this.points = 0;
    this.messageLabel.text = '0';
  }

  /** 점수를 설정하고 점수 애니메이션을 재생합니다 */
  public setScore(value: number) {
    if (this.points === value) return;
    this.points = value;
    this.playPoints();
  }

  /** 컴포넌트를 표시합니다 */
  public async show(animated = true) {
    if (this.showing) return;
    this.showing = true;
    gsap.killTweensOf(this.container.scale);
    this.visible = true;
    if (animated) {
      this.container.scale.set(0);
      await gsap.to(this.container.scale, {
        x: 1,
        y: 1,
        duration: 0.3,
        ease: 'back.out',
      });
    } else {
      this.container.scale.set(1);
    }
  }

  /** 컴포넌트를 숨깁니다 */
  public async hide(animated = true) {
    if (!this.showing) return;
    this.showing = false;
    gsap.killTweensOf(this.container.scale);
    if (animated) {
      await gsap.to(this.container.scale, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'back.in',
      });
      this.visible = false;
    } else {
      this.visible = false;
    }
  }

  /** 실제 점수에 도달할 때까지 점점 증가하는 점수 애니메이션을 재생합니다 */
  private async playPoints() {
    gsap.killTweensOf(this);
    const diff = this.points - this.animatedPoints;
    await gsap.to(this, {
      intensity: this.intensity + diff,
      animatedPoints: this.points,
      duration: Math.min(diff * 0.025, 2),
      ease: 'linear',
      onUpdate: () => {
        this.printPoints();
      },
    });
    gsap.to(this, {
      intensity: 1,
      duration: 1.5,
      ease: 'expo.in',
    });
  }

  /** 현재 애니메이션된 점수를 화면에 표시합니다. */
  private printPoints() {
    const points = Math.round(this.animatedPoints);
    const text = String(points);
    if (this.messageLabel.text !== text) {
      this.messageLabel.text = text;
    }
  }
}
