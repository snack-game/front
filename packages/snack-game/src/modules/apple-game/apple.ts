export class Apple {
  public coordinates: { y: number; x: number };
  public position: { x: number; y: number };
  public number: number;
  public inDragArea = false;
  public remove = false;
  public isGolden;
  public velocity: { x: number; y: number };
  public readonly image: HTMLImageElement;
  public radius: number;
  public readonly gravity: number;

  constructor(
    coordinates: { x: number; y: number },
    x: number,
    y: number,
    number: number,
    radius: number,
    gravity: number,
    velocity: { x: number; y: number },
    isGolden: boolean,
    imageSrc: string,
  ) {
    this.coordinates = coordinates;
    this.number = 0;
    this.position = { x, y };
    this.number = number;
    this.radius = radius;
    this.gravity = gravity;
    this.image = new Image();
    this.image.src = imageSrc;
    this.velocity = velocity;
    this.isGolden = isGolden;
  }
}
