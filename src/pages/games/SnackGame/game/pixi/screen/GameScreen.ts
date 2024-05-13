import gsap from 'gsap';
import { Container, Text } from 'pixi.js';
export class GameScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ['game'];

  private message: Text;

  constructor() {
    super();

    this.message = new Text({
      text: '게임 화면',
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
  }

  /** Show screen with animations */
  public async show() {
    gsap.killTweensOf(this.message);
    this.message.alpha = 1;
  }
}
