import { MouseEventType } from '@utils/types/common.type';

export class Drag {
  private startX: number;
  private startY: number;
  private currentX: number;
  private currentY: number;
  private isDrawing: boolean;

  isTouchEvent(event: MouseEventType): event is TouchEvent {
    return (event as TouchEvent).touches !== undefined;
  }

  constructor() {
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDrawing = false;
  }

  getDragArea() {
    const x = Math.min(this.startX, this.currentX);
    const y = Math.min(this.startY, this.currentY);
    const width = Math.abs(this.startX - this.currentX);
    const height = Math.abs(this.startY - this.currentY);

    return { x, y, width, height };
  }

  getIsDrawing(): boolean {
    return this.isDrawing;
  }

  onMouseDown(
    event: MouseEventType,
    clientLeft: number,
    clientTop: number,
  ): void {
    this.isDrawing = true;

    let clientX, clientY;

    if (this.isTouchEvent(event)) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    this.startX = clientX - (clientLeft - window.scrollX);
    this.startY = clientY - (clientTop - window.scrollY);

    this.currentX = this.startX;
    this.currentY = this.startY;
  }

  onMouseMove(
    event: MouseEventType,
    clientLeft: number,
    clientTop: number,
  ): void {
    let clientX, clientY;

    if (this.isTouchEvent(event)) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    this.currentX = clientX - (clientLeft - window.scrollX);
    this.currentY = clientY - (clientTop - window.scrollY);
  }

  onMouseUp(): void {
    this.isDrawing = false;
  }

  drawDragArea(ctx: CanvasRenderingContext2D) {
    if (this.isDrawing) {
      const width = this.currentX - this.startX;
      const height = this.currentY - this.startY;

      ctx.beginPath();
      ctx.rect(this.startX, this.startY, width, height);

      ctx.fillStyle = 'rgba(248, 114, 114, 0.3)';
      ctx.fill();

      ctx.strokeStyle = 'rgba(248, 114, 114, 1)';
      ctx.stroke();

      ctx.stroke();
    }
  }
}
