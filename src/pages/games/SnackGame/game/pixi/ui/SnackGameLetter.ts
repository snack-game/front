import { Container, Sprite } from 'pixi.js';

import { Cloud } from './Cloud';

export class SnackGameLetter extends Container {
  /** Inner container for components, for animation purposes */
  private container: Container;
  /** sprite image */
  private image: Sprite;
  /** 구름 효과 */
  private cloud: Cloud;

  constructor() {
    super();

    this.container = new Container();
    this.addChild(this.container);

    this.cloud = new Cloud({
      color: 0xfff7ec,
      width: 200,
      height: 60,
      circleSize: 80,
    });
    this.container.addChild(this.cloud);

    this.image = Sprite.from('logo-snack-game-letter');
    this.image.anchor.set(0.5);
    this.image.width = 200;
    this.image.height = 200;
    this.addChild(this.image);
  }
}
