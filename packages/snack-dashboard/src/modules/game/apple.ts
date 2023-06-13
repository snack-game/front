export class Apple {
  public position: { x: number; y: number };
  public image: HTMLImageElement;
  public radius: number;
  public number: number = Math.floor(Math.random() * 9) + 1;
  public mass: number = 1;
  public bounceCount: number = 0;
  public gravity: number = 0.4;
  public corFactor: number = 0.5;
  public toRemove: boolean = false;
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
