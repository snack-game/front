export class Particle {
  private x: number;
  private y: number;
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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#F96464';
    ctx.strokeStyle = '#F96464';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
