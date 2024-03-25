import { MouseEventType } from '@utils/types/common.type';

export class Click {
  private startX: number;
  private startY: number;

  isTouchEvent(event: MouseEventType): event is TouchEvent {
    return (event as TouchEvent).touches !== undefined;
  }

  constructor() {
    this.startX = 0;
    this.startY = 0;
  }

  getClickedPosition() {
    const x = Math.min(this.startX);
    const y = Math.min(this.startY);

    return { x, y };
  }

  onMouseDown(
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

    this.startX = clientX - (clientLeft - window.scrollX);
    this.startY = clientY - (clientTop - window.scrollY);
  }
}
