import React from 'react';

export class Drag {
  public startX: number;
  public startY: number;
  public currentX: number;
  public currentY: number;
  public isDrawing: boolean;

  constructor() {
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDrawing = false;
  }

  onMouseDown(event: React.MouseEvent<HTMLCanvasElement>, rect: DOMRect): void {
    this.isDrawing = true;
    const clientX = event.clientX;
    const clientY = event.clientY;
    this.startX = clientX - rect.left;
    this.startY = clientY - rect.top;

    this.currentX = this.startX;
    this.currentY = this.startY;
  }

  onMouseMove(event: React.MouseEvent<HTMLCanvasElement>, rect: DOMRect): void {
    const clientX = event.clientX;
    const clientY = event.clientY;

    this.currentX = clientX - rect.left;
    this.currentY = clientY - rect.top;
  }

  onMouseUp(eventFunc: () => void): void {
    this.isDrawing = false;

    eventFunc();
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
