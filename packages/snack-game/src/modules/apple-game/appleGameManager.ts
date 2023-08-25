import { Apple } from '@modules/apple-game/apple';

const BORDER_OFFSET = 30;
const ROWS = 10;
const COLUMNS = 10;

export class AppleGameManager {
  public applesInDragArea: Apple[] = [];

  generateApples(
    clientWidth: number,
    clientHeight: number,
    apples: number[][],
  ): Apple[] {
    const units = [];

    // const availableWidth = (rect.width - BORDER_OFFSET * 2) / COLUMNS;
    // const availableHeight = (rect.height - BORDER_OFFSET * 2) / ROWS;

    const availableWidth = (clientWidth - BORDER_OFFSET * 2) / COLUMNS;
    const availableHeight = (clientHeight - BORDER_OFFSET * 2) / ROWS;

    const appleRadius = Math.min(availableWidth, availableHeight) * 0.4;

    const randomNum = Math.floor(Math.random() * 100);

    let cnt = 0;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        cnt++;

        const x =
          j * availableWidth + availableWidth / 2 - appleRadius + BORDER_OFFSET;
        const y =
          i * availableHeight +
          availableHeight / 2 -
          appleRadius +
          BORDER_OFFSET;
        const apple = new Apple(
          x,
          y,
          apples[i][j],
          appleRadius,
          cnt == randomNum ? 0 : 1,
          0.5,
          {
            x: Math.random() * 4 - 2,
            y: 0,
          },
          cnt == randomNum,
        );
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
  ): { newApples: Apple[]; removedApples: Apple[]; isGolden: boolean } {
    let sum = 0;
    let isGolden = false;
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
      this.applesInDragArea.forEach((apple) => {
        if (apple.isGolden) isGolden = true;
      });

      removedApples = this.applesInDragArea;

      newApples = newApples.filter(
        (apple) => !this.applesInDragArea.includes(apple),
      );
    }

    return { newApples, removedApples, isGolden };
  }

  handleAppleRendering(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
    isDrawing: boolean,
    Apple: Apple,
  ) {
    Apple.inDragArea = false;
    this.drawApple(ctx, Apple);
    this.highlightBorder(
      ctx,
      isDrawing,
      startX,
      startY,
      currentX,
      currentY,
      Apple,
    );
  }

  drawApple(ctx: CanvasRenderingContext2D, Apple: Apple) {
    ctx.drawImage(
      Apple.image,
      Apple.position.x,
      Apple.position.y,
      Apple.radius * 2,
      Apple.radius * 2,
    );

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = `${Apple.radius}px Dovemayo_gothic`;
    ctx.fillStyle = '#f1f5f9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      Apple.number.toString(),
      Apple.position.x + Apple.radius,
      Apple.position.y + Apple.radius + Apple.radius / 3,
    );
  }

  highlightBorder(
    ctx: CanvasRenderingContext2D,
    isDrawing: boolean,
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
    Apple: Apple,
  ) {
    if (isDrawing) {
      const centerX: number = Apple.position.x + Apple.radius;
      const centerY: number = Apple.position.y + Apple.radius;
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
        Apple.inDragArea = true;

        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Apple.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }

  updateFallingPosition(
    ctx: CanvasRenderingContext2D,
    clientHeight: number,
    Apple: Apple,
  ) {
    Apple.velocity.y -= Apple.gravity;

    Apple.position.x += Apple.velocity.x;
    Apple.position.y -= Apple.velocity.y;

    if (Apple.position.y + Apple.radius * 2 >= clientHeight + 50) {
      Apple.remove = true;
    }

    this.drawApple(ctx, Apple);
  }
}
