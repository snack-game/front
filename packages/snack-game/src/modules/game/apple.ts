import AppleImage from '@assets/images/apple.webp';

export class Apple {
  public position: { x: number; y: number };
  public image: HTMLImageElement;
  public radius: number;
  public number: number = Math.floor(Math.random() * 9) + 1;
  public mass: number;
  public gravity: number;
  public velocity: { x: number; y: number };
  public toRemove = false;

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
    ctx.font = `${this.radius + 1}px Poor Story`;
    ctx.fillStyle = '#f1f5f9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.number.toString(),
      this.position.x + this.radius,
      this.position.y + this.radius,
    );
  }

  drawFallingApple(ctx: CanvasRenderingContext2D, height: number) {
    this.velocity.y -= this.gravity;

    this.position.x += this.velocity.x;
    this.position.y -= this.velocity.y;

    if (this.position.y + this.radius * 2 >= height) {
      this.toRemove = true;
    }

    // if (this.position.y + this.radius * 2 >= height) {
    //   this.droppedApples = this.droppedApples.filter((apple) => !this.toRemove);
    // }

    this.drawApple(ctx);
  }
}
