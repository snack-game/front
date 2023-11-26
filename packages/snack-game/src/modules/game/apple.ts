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

  constructor(
    coordinates: { x: number; y: number },
    x: number,
    y: number,
    number: number,
    radius: number,
    velocity: { x: number; y: number },
    isGolden: boolean,
    image: HTMLImageElement,
  ) {
    this.coordinates = coordinates;
    this.number = 0;
    this.position = { x, y };
    this.number = number;
    this.radius = radius;
    this.image = image;
    this.velocity = velocity;
    this.isGolden = isGolden;
  }
}
