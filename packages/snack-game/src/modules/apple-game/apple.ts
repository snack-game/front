import AppleImage from '@assets/images/apple.png';
import GoldenApple from '@assets/images/golden-apple.png';

export class Apple {
  public position: { x: number; y: number };
  public number: number = Math.floor(Math.random() * 9) + 1;
  public inDragArea = false;
  public remove = false;
  public isGolden;
  public velocity: { x: number; y: number };
  public readonly image: HTMLImageElement;
  public readonly gravity: number;
  public readonly radius: number;

  private mass: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    style: number,
    mass: number,
    gravity: number,
    velocity: { x: number; y: number },
    isGolden: boolean,
  ) {
    this.position = { x, y };
    this.image = new Image();
    this.image.src = style ? AppleImage : GoldenApple;
    this.radius = radius;
    this.mass = mass;
    this.gravity = gravity;
    this.velocity = velocity;
    this.isGolden = isGolden;
  }
}
