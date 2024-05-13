import { FancyButton } from '@pixi/ui';
import gsap from 'gsap';
import { NineSliceSprite, Texture } from 'pixi.js';

import { Label } from './Label';

const defaultLargeButtonOptions = {
  text: '',
  width: 300,
  height: 110,
};

type LargeButtonOptions = typeof defaultLargeButtonOptions;

/**
 * The big rectangle button, with a label, idle and pressed states
 */
export class LargeButton extends FancyButton {
  /** The buttoon message displayed */
  private messageLabel: Label;

  constructor(options: Partial<LargeButtonOptions> = {}) {
    const opts = { ...defaultLargeButtonOptions, ...options };

    const defaultView = new NineSliceSprite({
      texture: Texture.from('large-button'),
      leftWidth: 36,
      topHeight: 42,
      rightWidth: 36,
      bottomHeight: 52,
      width: opts.width,
      height: opts.height,
    });

    const pressedView = new NineSliceSprite({
      texture: Texture.from('large-button-press'),
      leftWidth: 36,
      topHeight: 42,
      rightWidth: 36,
      bottomHeight: 52,
      width: opts.width,
      height: opts.height,
    });

    super({
      defaultView,
      pressedView,
      anchor: 0.5,
    });

    this.messageLabel = new Label(opts.text, {
      fill: 0x4a4a4a,
      align: 'center',
    });
    this.messageLabel.y = -13;
    this.addChild(this.messageLabel);

    this.onDown.connect(this.handleDown.bind(this));
    this.onUp.connect(this.handleUp.bind(this));
    this.on('pointerupoutside', this.handleUp.bind(this));
    this.on('pointerout', this.handleUp.bind(this));
  }

  private handleDown() {
    this.messageLabel.y = -5;
  }

  private handleUp() {
    this.messageLabel.y = -13;
  }

  /** Show the component */
  public async show(animated = true) {
    gsap.killTweensOf(this.pivot);
    this.visible = true;
    if (animated) {
      this.pivot.y = -200;
      await gsap.to(this.pivot, { y: 0, duration: 0.5, ease: 'back.out' });
    } else {
      this.pivot.y = 0;
    }
    this.interactiveChildren = true;
  }

  /** Hide the component */
  public async hide(animated = true) {
    this.interactiveChildren = false;
    gsap.killTweensOf(this.pivot);
    if (animated) {
      await gsap.to(this.pivot, { y: -200, duration: 0.3, ease: 'back.in' });
    } else {
      this.pivot.y = -200;
    }
    this.visible = false;
  }
}
