import { Drag } from '@modules/game/drag';
import { Apple } from '@modules/game/apple';

export class DrawCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime: number;
  private drag: Drag;
  public units: Apple[];
  private rect: any;
  private applesInDragArea: Apple[] = [];
  public droppedApples: Apple[] = [];
  private gameService?: any;
  private score: number;
  private src: string;

  constructor(
    canvas: HTMLCanvasElement,
    gameService: any,
    src: string
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.units = [];
    this.lastTime = new Date().getTime();
    this.drag = new Drag(canvas, this);
    this.rect = this.canvas.parentElement!.getBoundingClientRect();
    this.gameService = gameService;
    this.score = 0;
    this.src = src;
    this.generateApples();
  }

  resetScore(): void {
    this.score = 0;
  }

  destroy(): void {
    window.onresize = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
    this.canvas.onmousemove = null;
  }

  init(): void {
    window.onresize = () => {
      const width = this.rect.width;
      const height = this.rect.height;
      const devicePixelRatio = window.devicePixelRatio || 1;

      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;

      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      this.ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    window.onresize(new UIEvent('resize'));

    this.canvas.onmousedown = (event) => this.drag.onMouseDown(event);

    this.canvas.onmouseup = (event) => this.drag.onMouseUp(event);

    this.canvas.onmousemove = (event) => this.drag.onMouseMove(event);

    this.canvas.addEventListener('touchstart', (event) => {
      this.drag.onMouseDown(event);
    });

    this.canvas.addEventListener('touchend', (event) => {
      this.drag.onMouseUp(event);
    });

    this.canvas.addEventListener('touchmove', (event) => {
      this.drag.onMouseMove(event);
    });
  }

  generateApples(): void {
    this.units = [];

    const rows = 10;
    const columns = 18;

    const borderOffset = 30;

    const availableWidth = (this.rect.width - borderOffset * 2) / columns;
    const availableHeight = (this.rect.height - borderOffset * 2) / rows;

    const appleRadius = Math.min(availableWidth, availableHeight) * 0.4;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const x =
          j * availableWidth + availableWidth / 2 - appleRadius + borderOffset;
        const y =
          i * availableHeight +
          availableHeight / 2 -
          appleRadius +
          borderOffset;
        const apple = new Apple(x, y, appleRadius, this.src);
        this.units.push(apple);
      }
    }
  }

  highlightApplesInDragArea(): void {
    const x = Math.min(this.drag.startX, this.drag.currentX);
    const y = Math.min(this.drag.startY, this.drag.currentY);
    const width = Math.abs(this.drag.startX - this.drag.currentX);
    const height = Math.abs(this.drag.startY - this.drag.currentY);

    this.applesInDragArea = this.units.filter((apple) => {
      const centerX = apple.position.x + apple.radius;
      const centerY = apple.position.y + apple.radius;

      return (
        centerX >= x &&
        centerX <= x + width &&
        centerY >= y &&
        centerY <= y + height
      );
    });

    this.applesInDragArea.forEach((apple) => {
      this.ctx.strokeStyle = 'yellow';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(
        apple.position.x + apple.radius,
        apple.position.y + apple.radius,
        apple.radius,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
    });
  }

  checkApplesInDragArea(): void {
    let sum = 0;

    this.applesInDragArea.forEach((apple) => {
      sum += apple.number;
    });

    if (sum === 10) {
      this.droppedApples.push(...this.applesInDragArea);
      this.units = this.units.filter(
        (apple) => !this.applesInDragArea.includes(apple)
      );

      const newScore = (this.score += this.applesInDragArea.length);
      this.gameService.updateScore(newScore);
      this.applesInDragArea = [];
    }
  }

  update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.drag.isDrawing) {
      const width = this.drag.currentX - this.drag.startX;
      const height = this.drag.currentY - this.drag.startY;
      this.drag.drawRectangle(
        this.drag.startX,
        this.drag.startY,
        width,
        height
      );
      this.ctx.stroke();
      this.highlightApplesInDragArea();
    }

    this.units.forEach((apple) => {
      this.ctx.drawImage(
        apple.image,
        apple.position.x,
        apple.position.y,
        apple.radius * 2,
        apple.radius * 2
      );

      this.ctx.font = `${apple.radius + 1}px Poor Story`;
      this.ctx.fillStyle = '#f1f5f9';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(
        apple.number.toString(),
        apple.position.x + apple.radius,
        apple.position.y + apple.radius
      );
    });

    this.droppedApples.forEach((apple) => {
      apple.velocity.y -= apple.gravity;

      apple.position.x += apple.velocity.x;
      apple.position.y -= apple.velocity.y;

      if (apple.position.y + apple.radius * 2 >= this.canvas.height) {
        apple.toRemove = true;
      }

      if (apple.position.y + apple.radius * 2 >= this.canvas.height) {
        this.droppedApples = this.droppedApples.filter(
          (apple) => !apple.toRemove
        );
      }

      this.ctx.drawImage(
        apple.image,
        apple.position.x,
        apple.position.y,
        apple.radius * 2,
        apple.radius * 2
      );

      this.ctx.font = `${apple.radius + 1}px Poor Story`;
      this.ctx.fillStyle = '#f1f5f9';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(
        apple.number.toString(),
        apple.position.x + apple.radius,
        apple.position.y + apple.radius
      );
    });

    window.requestAnimationFrame(() => {
      this.update.call(this);
    });
  }
}
