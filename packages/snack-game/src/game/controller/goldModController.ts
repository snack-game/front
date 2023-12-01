import appleGameApi from '@api/apple-game.api';
import { ClassicModController } from '@game/controller/classicModController';
import {
  coordinatesType,
  goldModAppleType,
  scoredAppleRectType,
} from '@game/game.type';
import Apple from '@game/model/apple';
import { GoldenApple } from '@game/model/goldenApple';
import PlainApple from '@game/model/plainApple';

export class GoldModController extends ClassicModController {
  private sessionId: number;
  private scoredAppleRect: scoredAppleRectType[] = [];

  constructor({
    row,
    column,
    sessionId,
  }: {
    row: number;
    column: number;
    sessionId: number;
  }) {
    super({ row, column });
    this.sessionId = sessionId;
  }

  resetGameState() {
    super.resetGameState();
    this.scoredAppleRect = [];
  }

  setSessionId(sessionId: number) {
    this.sessionId = sessionId;
  }

  getScoredAppleRect() {
    return this.scoredAppleRect;
  }

  generateApples(apples: goldModAppleType[][]) {
    const units: Apple[] = [];

    for (let row = 0; row < this.row; row++) {
      for (let column = 0; column < this.column; column++) {
        const appleProp = {
          coordinates: { y: row, x: column },
          appleNumber: apples[row][column].number,
        };

        units.push(
          apples[row][column].golden
            ? new GoldenApple(appleProp)
            : new PlainApple(appleProp),
        );
      }
    }

    this.apples = units;
  }

  async checkApplesInDragArea() {
    try {
      const { getScore, applesInDragArea } =
        await super.checkApplesInDragArea();
      let isGold = false;

      if (getScore) {
        const appleCoordinates: coordinatesType[] = applesInDragArea.map(
          (apple: Apple) => {
            if (apple instanceof GoldenApple) isGold = true;
            return apple.getCoordinates();
          },
        );

        this.scoredAppleRect.push(this.getRectApplePosition(appleCoordinates));

        if (isGold) {
          const response = await appleGameApi.checkGameMove({
            sessionId: this.sessionId,
            rects: this.scoredAppleRect,
          });

          if (response) {
            const { apples, score } = response;

            this.generateApples(apples);
            this.scoredAppleRect = [];
            this.score = score;
          }
        }
      }
      return { getScore, applesInDragArea, isGold };
    } catch (error) {
      throw new Error('Error in checkGameMove');
    }
  }

  getRectApplePosition(points: coordinatesType[]): scoredAppleRectType {
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
