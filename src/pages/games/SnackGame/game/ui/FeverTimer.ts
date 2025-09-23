import gsap from 'gsap';
import { Container } from 'pixi.js';

import { Label } from './Label';

/**
 * 피버타임 아이템의 30초 타이머를 표시합니다.
 * 피버타임 활성화 중에만 표시됩니다.
 */
export class FeverTimer extends Container {
  private readonly container: Container;
  private readonly messageLabel: Label;
  private showing = false;
  private running = false;
  private paused = false;
  private remainingTime = 0;
  private onComplete?: () => void;

  constructor() {
    super();

    this.container = new Container();
    this.addChild(this.container);

    this.messageLabel = new Label('', {
      fontSize: 20,
      fontFamily: 'DovemayoGothic',
      fill: 0xff4500,
    });
    this.messageLabel.y = 8;
    this.container.addChild(this.messageLabel);

    this.visible = false;
    this.showing = false;
  }

  public start(duration: number, onComplete?: () => void) {
    this.remainingTime = duration * 1000;
    this.onComplete = onComplete;
    this.running = true;
    this.show();
  }

  public stop() {
    this.running = false;
    this.paused = false;
    this.hide();
    this.onComplete = undefined;
  }

  public pause() {
    this.paused = true;
  }

  public resume() {
    this.paused = false;
  }

  public update(deltaTime: number) {
    if (!this.running || this.paused) return;

    this.remainingTime -= deltaTime;

    if (this.remainingTime <= 0) {
      this.remainingTime = 0;
      this.running = false;
      this.onComplete?.();
      this.hide();
      return;
    }

    const totalSeconds = Math.ceil(this.remainingTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    this.messageLabel.text =
      String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

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
    } else {
      this.visible = false;
    }
  }

  public isRunning(): boolean {
    return this.running;
  }

  public isPaused(): boolean {
    return this.paused;
  }
}
