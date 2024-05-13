import gsap from 'gsap';
import { Container, Text } from 'pixi.js';

import { app } from '../SnackGameBase';

export class LobbyScreen extends Container {
  public static assetBundles = ['game'];

  private message: Text;

  private base: Container;

  constructor() {
    super();

    this.base = new Container();
    this.addChild(this.base);

    this.message = new Text({
      text: '로비 화면',
      style: {
        fill: 0x00000,
        fontFamily: 'DovemayoGothic',
        align: 'center',
      },
    });
    this.message.anchor.set(0.5);
    this.addChild(this.message);
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {
    this.message.x = width * 0.5;
    this.message.y = height * 0.5;

    this.base.width = width;
    this.base.height = height;
  }

  /** Show screen with animations */
  public async show() {
    gsap.killTweensOf(this.message);
    this.message.alpha = 1;
  }
}
