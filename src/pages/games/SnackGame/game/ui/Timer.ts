import { Container } from 'pixi.js';

import { Cloud } from './Cloud';
import { Label } from './Label';

/**
 * The game timer presented during gameplay, that starts flashing red
 * once there is less than 10 seconds left.
 */
export class Timer extends Container {
  /** The remaining time displayed */
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
      fill: 0xfb923c,
    });
    this.addChild(this.messageLabel);
  }

  /**
   * Update the time displayed, flashing it if remaing time is less than 10 seconds
   * @param remaining Remaining time, in milliseconds
   */
  public updateTime(remaining: number) {
    // Calculate minutes from remaining time
    const minutes = Math.floor(remaining / (60 * 1000));

    // Calculate seconds from remaining time
    const seconds = Math.floor(remaining / 1000) % 60;

    // Update label text with minutes and seconds
    this.messageLabel.text =
      String(minutes) + ':' + String(seconds).padStart(2, '0');

    // Flash timer if it is close to finish
    if (remaining > 1 && remaining < 11000) {
      this.messageLabel.tint =
        Math.floor(remaining * 0.005) % 2 ? 0xff0000 : 0xffffff;
    } else {
      this.messageLabel.tint = 0xffffff;
    }
  }
}
