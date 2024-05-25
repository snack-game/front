import gsap from 'gsap';
import { Container, Graphics } from 'pixi.js';

import { Cloud } from './Cloud';
import { Label } from './Label';

/**
 * 게임 플레이 중에 표시되는 게임 타이머, 남은 시간이 10초 미만일 때 빨간색으로 깜빡이기 시작함.
 */
export class Timer extends Container {
  /** 애니메이션된 구름 배경 */
  private cloud: Cloud;
  /** 애니메이션을 위한 컴포넌트 컨테이너 */
  private readonly container: Container;
  /** 표시되는 남은 시간 */
  private readonly messageLabel: Label;
  /** 숨김시 false */
  private showing = true;

  constructor() {
    super();

    this.container = new Container();
    this.addChild(this.container);

    this.cloud = new Cloud({
      color: 0xfff7ec,
      width: 200,
      height: 20,
      circleSize: 50,
    });
    this.container.addChild(this.cloud);

    this.messageLabel = new Label('5:00', {
      fontSize: 32,
      fontFamily: 'DovemayoGothic',
      fill: 0xfb923c,
    });
    this.messageLabel.y = 8;
    this.container.addChild(this.messageLabel);
  }

  /**
   * 표시된 시간을 업데이트하고, 남은 시간이 10초 미만이면 깜빡이도록 설정
   * @param remaining 남은 시간, 밀리초 단위
   */
  public updateTime(remaining: number) {
    // 남은 시간에서 분 계산
    const minutes = Math.floor(remaining / (60 * 1000));

    // 남은 시간에서 초 계산
    const seconds = Math.floor(remaining / 1000) % 60;

    // 분과 초를 포함한 라벨 텍스트 업데이트
    this.messageLabel.text =
      String(minutes) + ':' + String(seconds).padStart(2, '0');

    // 타이머가 끝나기 가까울 때 깜빡이기
    if (remaining > 1 && remaining < 11000) {
      this.messageLabel.tint =
        Math.floor(remaining * 0.005) % 2 ? 0xff0000 : 0xffffff;
    } else {
      this.messageLabel.tint = 0xffffff;
    }
  }

  /** 컴포넌트 노출 */
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

  /** 컴포넌트 제거*/
  public async hide(animated = true) {
    if (!this.showing) return;
    this.showing = false;
    gsap.killTweensOf(this.container.scale);
    if (animated) {
      await gsap.to(this.container.scale, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'back.in',
      });
    }
    this.visible = false;
  }
}
