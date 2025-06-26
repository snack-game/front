import { ButtonContainer } from '@pixi/ui';
import { Sprite } from 'pixi.js';

import { Label } from './Label';

export type ItemType = 'bomb' | 'fever';

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
    this.count = count;
    this.onUse = onUse;
    this.cursor = 'pointer';

    this.icon = Sprite.from(this.type);
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
    this.setCount(this.count - 1);
    await this.onUse(this.type);
  }

  setCount(count: number) {
    this.count = count;
    this.countLabel.text = String(count);
    this.enabled = count > 0;
    this.alpha = count > 0 ? 1 : 0.5;
  }
}
