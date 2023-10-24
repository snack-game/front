export class Apple {
  public coordinates: { y: number; x: number };
  public position: { x: number; y: number };
  public number: number;
  public inDragArea = false;
  public remove = false;
  public isGolden;
  public velocity: { x: number; y: number };
  public radius: number;
  public style: boolean;
  public readonly gravity: number;

  constructor(
    coordinates: { x: number; y: number },
    x: number,
    y: number,
    number: number,
    radius: number,
    style: boolean,
    gravity: number,
    velocity: { x: number; y: number },
    isGolden: boolean,
  ) {
    this.coordinates = coordinates;
    this.number = 0;
    this.position = { x, y };
    this.number = number;
    this.radius = radius;
    this.gravity = gravity;
    this.style = style;
    this.velocity = velocity;
    this.isGolden = isGolden;
  }
}
