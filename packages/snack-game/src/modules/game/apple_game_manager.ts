import { Apple } from '@modules/game/apple';

const BORDER_OFFSET = 30;
const ROWS = 10;
const COLUMNS = 12;

export class AppleGameManager {
  public applesInDragArea: Apple[] = [];
  public droppedApples: Apple[] = [];

  generateApples(rect: DOMRect): Apple[] {
    const units = [];

    const availableWidth = (rect.width - BORDER_OFFSET * 2) / COLUMNS;
    const availableHeight = (rect.height - BORDER_OFFSET * 2) / ROWS;

    const appleRadius = Math.min(availableWidth, availableHeight) * 0.4;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        const x =
          j * availableWidth + availableWidth / 2 - appleRadius + BORDER_OFFSET;
        const y =
          i * availableHeight +
          availableHeight / 2 -
          appleRadius +
          BORDER_OFFSET;
        const apple = new Apple(x, y, appleRadius, 1, 0.4, 0.5, {
          x: Math.random() * 4 - 2,
          y: 0,
        });
        units.push(apple);
      }
    }
    return units;
  }

  checkApplesInDragArea(
    newApples: Apple[],
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
  ): { newApples: Apple[]; removedApples: Apple[] } {
    let sum = 0;
    let removedApples: Apple[] = [];

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const width = Math.abs(startX - currentX);
    const height = Math.abs(startY - currentY);

    this.applesInDragArea = newApples.filter((apple) => {
      const centerX: number = apple.position.x + apple.radius;
      const centerY: number = apple.position.y + apple.radius;

      return (
        centerX >= x &&
        centerX <= x + width &&
        centerY >= y &&
        centerY <= y + height
      );
    });

    this.applesInDragArea.forEach((apple) => {
      sum += apple.number;
    });

    if (sum == 10) {
      removedApples = this.applesInDragArea;
      newApples = newApples.filter(
        (apple) => !this.applesInDragArea.includes(apple),
      );
    }

    console.log(this.applesInDragArea);

    return { newApples, removedApples };
  }
}
