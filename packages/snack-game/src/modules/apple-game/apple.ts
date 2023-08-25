import AppleImage from '@assets/images/apple.png';
import GoldenApple from '@assets/images/golden-apple.png';

export class Apple {
  public position: { x: number; y: number };
  public number: number;
  public inDragArea = false;
  public remove = false;
  public isGolden;
  public velocity: { x: number; y: number };
  public readonly image: HTMLImageElement;
  public readonly gravity: number;
  public readonly radius: number;

  constructor(
    x: number,
    y: number,
    number: number,
    radius: number,
    style: number,
    gravity: number,
    velocity: { x: number; y: number },
    isGolden: boolean,
  ) {
    this.number = 0;
    this.position = { x, y };
    this.number = number;
    this.image = new Image();
    this.image.src = style ? AppleImage : GoldenApple;
    this.radius = radius;
    this.gravity = gravity;
    this.velocity = velocity;
    this.isGolden = isGolden;
  }
}
