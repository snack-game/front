import { MouseEventType } from '@utils/types/common.type';

export class Drag {
  public startX: number;
  public startY: number;
  public currentX: number;
  public currentY: number;
  public isDrawing: boolean;

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
}