import { FancyButton } from '@pixi/ui';
import gsap from 'gsap';
import { Sprite, Texture } from 'pixi.js';

import { sfx } from '../util/audio';

const defaultRippleButtonOptions = {
  image: '',
  ripple: '',
};

type IconButtonOptions = typeof defaultRippleButtonOptions;

/**
 * Button with special ripple animation, used for settings, pause and info buttons
 */
export class IconButton extends FancyButton {
  /** The button image */
  private image: Sprite;
  /** The name of ripple texture */
  private ripple: string;

  constructor(options: Partial<IconButtonOptions> = {}) {
    const opts = { ...defaultRippleButtonOptions, ...options };

    const defaultView = Sprite.from(opts.image);

    super({ defaultView, anchor: 0.5 });

    this.image = defaultView;
    this.image.interactiveChildren = false;
    this.ripple = opts.ripple;
    this.onDown.connect(this.handleDown.bind(this));
  }

  private handleDown() {
    sfx.play('common/sfx-tap.mp3');
    this.playRipple();
  }

  /** Show the component */
  public async show(animated = true) {
    gsap.killTweensOf(this.scale);
    gsap.killTweensOf(this.image);
    this.visible = true;
    this.eventMode = 'dynamic';

    if (animated) {
      this.image.alpha = 0;
      this.scale.set(1.5);
      gsap.to(this.image, { alpha: 1, duration: 0.3, ease: 'linear' });
      await gsap.to(this.scale, {
        x: 1,
        y: 1,
        duration: 0.3,
        ease: 'sine.out',
      });
    } else {
      this.image.alpha = 1;
      this.scale.set(1);
    }
  }

  /** Hide the component */
  public async hide(animated = true) {
    this.eventMode = 'none';
    gsap.killTweensOf(this.scale);
    gsap.killTweensOf(this.image);
    if (animated) {
      gsap.to(this.image, { alpha: 0, duration: 0.3, ease: 'linear' });
      await gsap.to(this.scale, {
        x: 1.5,
        y: 1.5,
        duration: 0.3,
        ease: 'sine.out',
      });
    } else {
      this.image.alpha = 0;
      this.scale.set(0);
    }
    this.visible = false;
  }

  /** Play a single ripple animation */
  private async playRipple() {
    const ripple = new Sprite();
    gsap.killTweensOf(ripple.scale);
    gsap.killTweensOf(ripple);
    ripple.texture = Texture.from(this.ripple);
    ripple.anchor.set(0.5);
    ripple.scale.set(1);
    ripple.alpha = 0.5;
    this.addChild(ripple);
    gsap.to(ripple.scale, { x: 3, y: 3, duration: 0.6, ease: 'linear' });
    await gsap.to(ripple, { alpha: 0, duration: 0.6, ease: 'linear' });
    this.removeChild(ripple);
  }
}
