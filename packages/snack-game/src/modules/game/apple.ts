import AppleImage from '@assets/images/apple.webp';

export class Apple {
  public position: { x: number; y: number };
  public readonly radius: number;
  public number: number = Math.floor(Math.random() * 9) + 1;
  public inDragArea = false;
  public remove = false;

  private readonly image: HTMLImageElement;
  private mass: number;
  private readonly gravity: number;
  private velocity: { x: number; y: number };

  constructor(
    x: number,
    y: number,
    radius: number,
    style: number,
    mass: number,
    gravity: number,
    velocity: { x: number; y: number },
  ) {
    this.position = { x, y };
    this.image = new Image();
    this.image.src = style ? AppleImage : 'assets/apple.webp';
    this.radius = radius;
    this.mass = mass;
    this.gravity = gravity;
    this.velocity = velocity;
  }

  handleAppleRendering(
    ctx: CanvasRenderingContext2D,
    height: number,
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
    isDrawing: boolean,
  ) {
    this.inDragArea = false;
    this.drawApple(ctx);
    this.highlightBorder(ctx, isDrawing, startX, startY, currentX, currentY);
  }

  drawApple(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.radius * 2,
      this.radius * 2,
    );

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = `${this.radius}px KCC-Ganpan`;
    ctx.fillStyle = '#f1f5f9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.number.toString(),
      this.position.x + this.radius,
      this.position.y + this.radius,
    );
  }

  highlightBorder(
    ctx: CanvasRenderingContext2D,
    isDrawing: boolean,
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
  ) {
    if (isDrawing) {
      const centerX: number = this.position.x + this.radius;
      const centerY: number = this.position.y + this.radius;
      const x = Math.min(startX, currentX);
      const y = Math.min(startY, currentY);
      const width = Math.abs(startX - currentX);
      const height = Math.abs(startY - currentY);

      if (
        centerX >= x &&
        centerX <= x + width &&
        centerY >= y &&
        centerY <= y + height
      ) {
        this.inDragArea = true;

        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }

  updateFallingPosition(ctx: CanvasRenderingContext2D, height: number) {
    this.velocity.y -= this.gravity;

    this.position.x += this.velocity.x;
    this.position.y -= this.velocity.y;

    if (this.position.y + this.radius * 2 >= height) {
      this.remove = true;
    }

    this.drawApple(ctx);
  }
}
