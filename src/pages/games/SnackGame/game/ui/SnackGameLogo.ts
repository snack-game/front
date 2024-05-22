import { Container, Sprite } from 'pixi.js';

export class SnackGameLogo extends Container {
  private image: Sprite;

  constructor() {
    super();
    this.image = Sprite.from('logo-snack-game');
    this.image.anchor.set(0.5);
    this.image.width = 250;
    this.image.height = 250;
    this.addChild(this.image);
  }
}
