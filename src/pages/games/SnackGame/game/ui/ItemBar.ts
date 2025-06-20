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

  constructor(private items: ItemButtonOptions[]) {
    super();

    this.box = new RoundedBox({
      height: ITEM_SIZE * 1.6,
      shadow: false,
      color: 0xfff7ec,
    });
    this.addChild(this.box);

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
}
