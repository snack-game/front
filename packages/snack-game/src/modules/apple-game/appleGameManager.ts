import AppleImage from '@assets/images/apple.png';
import GoldenAppleImage from '@assets/images/golden_apple.png';
import { Apple } from '@modules/apple-game/apple';
import {
  appleGameRectType,
  appleType,
  coordinatesType,
} from '@utils/types/game.type';

const BORDER_OFFSET = 20;
const ROWS = 10;
const COLUMNS = 12;

export class AppleGameManager {
  public applesInDragArea: Apple[] = [];

  public appleGameImage: HTMLImageElement = new Image();
  public goldenAppleGameImage: HTMLImageElement = new Image();

  constructor() {
    this.appleGameImage.src = AppleImage;
    this.goldenAppleGameImage.src = GoldenAppleImage;
  }

  generateApples(
    offsetWidth: number,
    offsetHeight: number,
    apples: appleType[][],
  ): Apple[] {
    const units = [];

    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        const apple = new Apple(
          { y: row, x: column },
          0,
          0,
          apples[row][column].number,
          0,
          {
            x: Math.random() * 4 - 2,
            y: 0,
          },
          apples[row][column].golden,
          apples[row][column].golden
            ? this.goldenAppleGameImage
            : this.appleGameImage,
        );
        units.push(apple);
      }
    }

    return this.updateApplePosition(offsetWidth, offsetHeight, units);
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
    ctx.fillStyle = '#ffffff';
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
    offsetWidth: number,
    offsetHeight: number,
    apples: Apple[],
  ) {
    const availableWidth = (offsetWidth - BORDER_OFFSET * 2) / COLUMNS;
    const availableHeight = (offsetHeight - BORDER_OFFSET * 2) / ROWS;

    const appleRadius = Math.floor(
      Math.min(availableWidth, availableHeight) * 0.4,
    );
    const appleXOffSet = Math.floor(
      availableWidth / 2 - appleRadius + BORDER_OFFSET,
    );
    const appleYOffSet = Math.floor(
      availableHeight / 2 - appleRadius + BORDER_OFFSET,
    );

    return apples.map((apple) => {
      apple.position.x = apple.coordinates.x * availableWidth + appleXOffSet;
      apple.position.y = apple.coordinates.y * availableHeight + appleYOffSet;
      apple.radius = appleRadius;

      return apple;
    });
  }

  updateFallingPosition(
    ctx: CanvasRenderingContext2D,
    offsetHeight: number,
    Apple: Apple,
  ) {
    Apple.velocity.y -= 0.5;

    Apple.position.x += Apple.velocity.x;
    Apple.position.y -= Apple.velocity.y;

    if (Apple.position.y + Apple.radius * 2 >= offsetHeight + 50) {
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
