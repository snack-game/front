export class Particle {
  public x: number;
  public y: number;
  public size: number;
  private readonly speedX: number;
  private readonly speedY: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size -= 0.1;
  }
}
