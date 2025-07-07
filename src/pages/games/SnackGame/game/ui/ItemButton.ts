import { ButtonContainer } from '@pixi/ui';
import gsap from 'gsap';
import { Sprite, Texture } from 'pixi.js';

import { sfx } from '@pages/games/SnackGame/game/util/audio';
import { ItemType } from '@utils/types/item.type';

import { Label } from './Label';

const TEXTURE_MAP: Record<ItemType, string> = {
  BOMB: 'bomb',
  FEVER_TIME: 'fever',
};

export interface ItemButtonOptions {
  type: ItemType;
  count: number;
  onUse: (type: ItemType) => Promise<void>;
}

export class ItemButton extends ButtonContainer {
  public readonly type: ItemType;
  private icon: Sprite;
  private countLabel: Label;
  private count: number;
  private onUse: (type: ItemType) => Promise<void>;

  constructor({ type, count, onUse }: ItemButtonOptions) {
    super();

    this.type = type;
    this.onUse = onUse;
    this.cursor = 'pointer';

    this.count = count;
    this.enabled = count > 0;
    this.alpha = count > 0 ? 1 : 0.5;

    this.icon = Sprite.from(TEXTURE_MAP[this.type]);
    this.icon.width = 36;
    this.icon.height = 36;
    this.addChild(this.icon);

    this.countLabel = new Label(String(this.count), {
      fill: 0xffffff,
      fontSize: 20,
      fontWeight: 'bold',
      stroke: {
        color: 0x000000,
        width: 2,
      },
    });
    this.countLabel.x = this.icon.width / 2;
    this.countLabel.y = this.icon.height - 4;
    this.addChild(this.countLabel);

    this.onDown.connect(this.handleDown.bind(this));
  }

  private async handleDown() {
    if (this.count <= 0) return;
    sfx.play('common/sfx-tap.mp3');
    this.playRipple();
    this.setCount(this.count - 1);
    await this.onUse(this.type);
  }

  private async playRipple() {
    const ripple = new Sprite();

    gsap.killTweensOf(ripple.scale);
    gsap.killTweensOf(ripple);

    ripple.texture = Texture.from('ripple');
    ripple.position.set(this.icon.width / 2, this.icon.height / 2);
    ripple.anchor.set(0.5);
    ripple.scale.set(0.5);
    ripple.alpha = 0.5;

    this.addChild(ripple);

    gsap.to(ripple.scale, { x: 1.5, y: 1.5, duration: 0.6, ease: 'linear' });
    await gsap.to(ripple, { alpha: 0, duration: 0.6, ease: 'linear' });

    this.removeChild(ripple);
  }

  setCount(count: number) {
    this.count = count;
    this.countLabel.text = String(count);
    this.enabled = count > 0;
    this.alpha = count > 0 ? 1 : 0.5;
  }
}
