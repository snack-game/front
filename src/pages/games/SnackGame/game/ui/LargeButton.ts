import { FancyButton } from '@pixi/ui';
import gsap from 'gsap';
import { NineSliceSprite, Texture } from 'pixi.js';

import { Label } from './Label';
import { sfx } from '../util/audio';

const defaultLargeButtonOptions = {
  text: '',
  width: 300,
  height: 110,
};

type LargeButtonOptions = typeof defaultLargeButtonOptions;

/**
 * 큰 사각형 버튼입니다.
 */
export class LargeButton extends FancyButton {
  /** 버튼 내부 메시지 라벨 */
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

    const disabledView = new NineSliceSprite({
      texture: Texture.from('large-button-disabled'),
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
      disabledView,
      anchor: 0.5,
    });

    this.messageLabel = new Label(opts.text, {
      fill: 0xffffff,
      fontWeight: 'bold',
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
    sfx.play('common/sfx-tap.mp3');
  }

  private handleUp() {
    this.messageLabel.y = -13;
  }

  /** 버튼 표시 애니메이션 */
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

  /** 버튼 숨김 애니메이션 */
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
