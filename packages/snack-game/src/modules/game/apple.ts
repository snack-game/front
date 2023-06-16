export class Apple {
  public position: { x: number; y: number };
  public image: HTMLImageElement;
  public radius: number;
  public number: number = Math.floor(Math.random() * 9) + 1;
  public mass = 1;
  public bounceCount = 0;
  public gravity = 0.4;
  public corFactor = 0.5;
  public toRemove = false;
  public velocity: { x: number; y: number } = {
    x: Math.random() * 4 - 2,
    y: 0,
  };

  constructor(x: number, y: number, radius: number, src: string) {
    this.position = { x, y };
    this.image = new Image();
    this.image.src = src;
    this.radius = radius;
  }
}
