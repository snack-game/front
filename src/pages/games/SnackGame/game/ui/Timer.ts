import { Container } from 'pixi.js';

import { Cloud } from './Cloud';
import { Label } from './Label';

/**
 * 게임 플레이 중에 표시되는 게임 타이머, 남은 시간이 10초 미만일 때 빨간색으로 깜빡이기 시작함.
 */
export class Timer extends Container {
  /** 표시되는 남은 시간 */
  private readonly messageLabel: Label;

  private cloud: Cloud;

  constructor() {
    super();

    this.cloud = new Cloud({
      color: 0xfff7ec,
      width: 100,
      height: 30,
      circleSize: 40,
    });
    this.addChild(this.cloud);

    this.messageLabel = new Label('5:00', {
      fontSize: 32,
      fontFamily: 'DovemayoGothic',
      fill: 0xfb923c,
    });
    this.addChild(this.messageLabel);
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
}
