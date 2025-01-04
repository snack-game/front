import { CheckBox } from '@pixi/ui';
import { Sprite } from 'pixi.js';

import { Label } from './Label';

/**
 * 설정 팝업에서 사용되는 햅틱 온/오프용 구성요소
 */
export class Switch extends CheckBox {
  /** 스위치에 표시되는 메시지 */
  public messageLabel: Label;

  constructor(label: string, checked = false) {
    super({
      checked,
      style: {
        unchecked: Sprite.from('switch_off'),
        checked: Sprite.from('switch_on'),
      },
    });

    this.messageLabel = new Label(label, {
      align: 'left',
      fill: 0xfb923c,
      fontSize: 18,
    });
    this.messageLabel.anchor.x = 0;
    this.messageLabel.x = -208;
    this.messageLabel.y = 20;
    this.addChild(this.messageLabel);
  }
}
