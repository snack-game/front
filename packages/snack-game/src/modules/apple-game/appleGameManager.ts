import { Apple } from '@modules/apple-game/apple';
import {
  appleGameRectType,
  appleType,
  coordinatesType,
} from '@utils/types/game.type';

const BORDER_OFFSET = 30;
const ROWS = 10;
const COLUMNS = 12;

export class AppleGameManager {
  public applesInDragArea: Apple[] = [];

  generateApples(
    clientWidth: number,
    clientHeight: number,
    apples: appleType[][],
  ): Apple[] {
    const units = [];

    const availableWidth = (clientWidth - BORDER_OFFSET * 2) / COLUMNS;
    const availableHeight = (clientHeight - BORDER_OFFSET * 2) / ROWS;

    const appleRadius = Math.min(availableWidth, availableHeight) * 0.4;

    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        const x =
          column * availableWidth +
          availableWidth / 2 -
          appleRadius +
          BORDER_OFFSET;
        const y =
          row * availableHeight +
          availableHeight / 2 -
          appleRadius +
          BORDER_OFFSET;
        const apple = new Apple(
          { y: row, x: column },
          x,
          y,
          apples[row][column].number,
          appleRadius,
          !apples[row][column].golden,
          0.5,
          {
            x: Math.random() * 4 - 2,
            y: 0,
          },
          apples[row][column].golden,
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
  ): {
    newApples: Apple[];
    removedApples: Apple[];
    isGolden: boolean;
    getScore: boolean;
    score: number;
  } {
    let sum = 0;
    let isGolden = false;
    let getScore = false;
    let score = 0;
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
      getScore = true;

      this.applesInDragArea.forEach((apple) => {
        if (apple.isGolden) isGolden = true;
        score++;
      });

      removedApples = this.applesInDragArea;

      newApples = newApples.filter(
        (apple) => !this.applesInDragArea.includes(apple),
      );
    }

    return { newApples, removedApples, isGolden, getScore, score };
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

  updateApplePosition(
    clientWidth: number,
    clientHeight: number,
    apples: Apple[],
  ) {
    const availableWidth = (clientWidth - BORDER_OFFSET * 2) / COLUMNS;
    const availableHeight = (clientHeight - BORDER_OFFSET * 2) / ROWS;

    const appleRadius = Math.min(availableWidth, availableHeight) * 0.4;

    return apples.map((apple) => {
      apple.position.x =
        apple.coordinates.x * availableWidth +
        availableWidth / 2 -
        appleRadius +
        BORDER_OFFSET;
      apple.position.y =
        apple.coordinates.y * availableHeight +
        availableHeight / 2 -
        appleRadius +
        BORDER_OFFSET;
      apple.radius = appleRadius;

      return apple;
    });
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

  getRectApplePosition(points: coordinatesType[]): appleGameRectType {
    if (points.length === 0) {
      throw new Error('No points provided');
    }

    const topLeft = {
      x: points[0].x,
      y: points[0].y,
    };

    const bottomRight = {
      x: points[0].x,
      y: points[0].y,
    };

    for (const point of points) {
      if (point.x < topLeft.x) {
        topLeft.x = point.x;
      }
      if (point.y < topLeft.y) {
        topLeft.y = point.y;
      }
      if (point.x > bottomRight.x) {
        bottomRight.x = point.x;
      }
      if (point.y > bottomRight.y) {
        bottomRight.y = point.y;
      }
    }

    return { topLeft, bottomRight };
  }
}
