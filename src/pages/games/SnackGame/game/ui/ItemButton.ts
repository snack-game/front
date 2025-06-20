import { Container, Sprite } from 'pixi.js';

import { Label } from './Label';

export type ItemType = 'bomb' | 'fever';

export interface ItemButtonOptions {
  type: ItemType;
  count: number;
  onUse: () => Promise<void>;
}

export class ItemButton extends Container {
  public readonly type: ItemType;
  private icon: Sprite;
  private countLabel: Label;
  private count: number;
  private onUse: () => Promise<void>;

  constructor({ type, count, onUse }: ItemButtonOptions) {
    super();

    this.type = type;

    this.icon = Sprite.from(this.type);
    this.icon.width = 36;
    this.icon.height = 36;
    this.addChild(this.icon);

    this.count = count;
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

    this.onUse = onUse;

    this.interactive = true;
    this.cursor = 'pointer';

    this.on('pointerdown', this.handleClick.bind(this));
  }

  private async handleClick() {
    if (this.count <= 0) return;
    await this.onUse();
    this.setCount(this.count - 1);
  }

  setCount(count: number) {
    this.count = count;
    this.countLabel.text = String(count);
    this.interactive = count > 0;
    this.alpha = count > 0 ? 1 : 0.5;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}
