import { DrawCanvas } from '@modules/game/draw-canvas';

export class Drag {
  public startX: number;
  public startY: number;
  public currentX: number;
  public currentY: number;
  public isDrawing: boolean;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    private drawCanvasInstance: DrawCanvas
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDrawing = false;
  }

  onMouseDown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      'touches' in event ? event.touches[0].clientY : event.clientY;
    this.startX = clientX - rect.left;
    this.startY = clientY - rect.top;

    this.currentX = this.startX;
    this.currentY = this.startY;
  }

  onMouseMove(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    this.currentX = clientX - this.canvas.getBoundingClientRect().left;
    this.currentY = clientY - this.canvas.getBoundingClientRect().top;
  }

  onMouseUp(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isDrawing = false;

    this.drawCanvasInstance.checkApplesInDragArea();
  }

  drawRectangle(x: number, y: number, width: number, height: number): void {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);

    this.ctx.fillStyle = 'rgba(248, 114, 114, 0.3)';
    this.ctx.fill();

    this.ctx.strokeStyle = 'rgba(248, 114, 114, 1)';
    this.ctx.stroke();
  }
}
