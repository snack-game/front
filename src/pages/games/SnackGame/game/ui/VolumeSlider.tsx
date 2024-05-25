import { Slider } from '@pixi/ui';
import { Graphics } from 'pixi.js';

import { Label } from './Label';

/**
 * 설정 팝업에서 사용되는 볼륨 슬라이더 구성 요소.
 */
export class VolumeSlider extends Slider {
  /** 슬라이더에 표시되는 메시지 */
  public messageLabel: Label;

  constructor(label: string, min = -0.1, max = 100, value = 100) {
    const width = 280;
    const height = 20;
    const radius = 10;
    const border = 4;
    const handleRadius = 14;
    const handleBorder = 4;
    const meshColor = 0xff7979;
    const fillColor = 0xff7979;
    const borderColor = 0xf96464;
    const backgroundColor = 0xc85252;

    const bg = new Graphics()
      .roundRect(0, 0, width, height, radius)
      .fill({ color: borderColor })
      .roundRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius,
      )
      .fill({ color: backgroundColor });

    const fill = new Graphics()
      .roundRect(0, 0, width, height, radius)
      .fill({ color: borderColor })
      .roundRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius,
      )
      .fill({ color: fillColor });

    const slider = new Graphics()
      .circle(0, 0, handleRadius + handleBorder)
      .fill({ color: borderColor })
      .circle(0, 0, handleRadius)
      .fill({ color: meshColor });

    super({
      bg,
      fill,
      slider,
      min,
      max,
    });

    this.value = value;

    this.messageLabel = new Label(label, {
      align: 'left',
      fill: 0xfb923c,
      fontSize: 18,
    });
    this.messageLabel.anchor.x = 0;
    this.messageLabel.x = 10;
    this.messageLabel.y = -18;
    this.addChild(this.messageLabel);
  }
}
