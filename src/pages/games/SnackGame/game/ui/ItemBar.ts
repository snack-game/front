import gsap from 'gsap';
import { Container } from 'pixi.js';

import { RoundedBox } from '@pages/games/SnackGame/game/ui/RoundedBox';

import { ItemButton, ItemButtonOptions } from './ItemButton';

const ITEM_SIZE = 36;
const PADDING_LEFT = 12;
const PADDING_TOP = 8;
const GAP = 8;

export class ItemBar extends Container {
  private box: RoundedBox;
  private buttons: ItemButton[] = [];
  private showing = true;

  constructor() {
    super();

    this.box = new RoundedBox({
      height: ITEM_SIZE * 1.6,
      shadow: false,
      color: 0xfff7ec,
    });
    this.addChild(this.box);
  }

  public setup(items: ItemButtonOptions[]) {
    items.forEach(({ type, count, onUse }, idx) => {
      const button = new ItemButton({
        type,
        count,
        onUse,
      });
      button.x =
        -this.box.width / 2 + PADDING_LEFT + idx * (button.width + GAP);
      button.y = -this.box.height / 2 + PADDING_TOP;
      this.box.addChild(button);
      this.buttons.push(button);
    });
  }

  public async show(animated = true) {
    if (this.showing) return;
    this.showing = true;
    gsap.killTweensOf(this.scale);
    this.visible = true;
    if (animated) {
      this.scale.set(0);
      await gsap.to(this.scale, {
        x: 1,
        y: 1,
        duration: 0.3,
        ease: 'back.out',
      });
    } else {
      this.scale.set(1);
    }
  }

  public async hide(animated = true) {
    if (!this.showing) return;
    this.showing = false;
    gsap.killTweensOf(this.scale);
    if (animated) {
      await gsap.to(this.scale, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'back.in',
      });
    } else {
      this.visible = false;
    }
  }

  public setItemsLocked(locked: boolean): void {
    this.buttons.forEach((button) => button.setLocked(locked));
  }
}
