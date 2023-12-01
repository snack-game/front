import { AppleData } from '@game/game.type';
import Apple, { ApplePropType } from '@game/model/apple';
import { Drag } from '@game/model/drag';
import { Particle } from '@game/model/particle';
import PlainApple from '@game/model/plainApple';
import { MouseEventType } from '@utils/types/common.type';

export class ClassicModController {
  public drag: Drag = new Drag();
  protected apples: Apple[] = [];
  protected removedApples: Apple[] = [];
  protected particles: Particle[] = [];
  protected row: number;
  protected column: number;
  protected borderOffset = 20;
  protected score = 0;

  constructor({ row, column }: { row: number; column: number }) {
    this.row = row;
    this.column = column;
  }

  resetGameState() {
    this.score = 0;
    this.apples = [];
  }

  getScore() {
    return this.score;
  }

  handleMouseDown(
    event: MouseEventType,
    offsetLeft: number,
    offsetTop: number,
  ) {
    this.drag.onMouseDown(event, offsetLeft, offsetTop);
  }

  handleMouseMove(
    event: MouseEventType,
    offsetLeft: number,
    offsetTop: number,
  ) {
    this.drag.onMouseMove(event, offsetLeft, offsetTop);
  }

  async handleMouseUp() {
    this.drag.onMouseUp();
    return await this.checkApplesInDragArea();
  }

  animationFrame(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.drag.getDragArea();
    const isDrawing = this.drag.getIsDrawing();

    if (isDrawing) this.drag.drawDragArea(ctx);

    this.apples.forEach((apple) => {
      apple.drawApple(ctx);

      if (isDrawing) apple.highlightBorder(ctx, x, y, width, height);
    });

    this.removedApples.forEach((apple) => {
      apple.drawApple(ctx);
    });

    this.particles = this.particles.filter((particle) => {
      particle.update();
      particle.drawParticle(ctx);

      return particle.size > 1;
    });

    this.updateFallingPosition();
  }

  generateApples(apples: AppleData[][]) {
    const units: Apple[] = [];

    for (let row = 0; row < this.row; row++) {
      for (let column = 0; column < this.column; column++) {
        const appleProp: ApplePropType = {
          coordinates: { y: row, x: column },
          appleNumber: apples[row][column].number,
        };

        units.push(new PlainApple(appleProp));
      }
    }

    this.apples = units;
  }

  async checkApplesInDragArea() {
    let sum = 0;
    let getScore = false;

    const applesInDragArea = this.apples.filter((apple) => {
      if (apple.getInDragArea()) {
        sum += apple.getNumber();
        return true;
      }

      return false;
    });

    if (sum == 10) {
      getScore = true;
      this.score += applesInDragArea.length;
      this.removedApples = applesInDragArea;
      this.apples = this.apples.filter(
        (apple) => !applesInDragArea.includes(apple),
      );

      this.removedApples.forEach((apple) => {
        for (let i = 0; i < 5; i++) {
          this.particles.push(
            new Particle(
              apple.getPosition().x + apple.getRadius(),
              apple.getPosition().y + apple.getRadius(),
            ),
          );
        }
      });
    }

    return { applesInDragArea, getScore };
  }

  updateApplePosition(offsetWidth: number, offsetHeight: number) {
    const availableWidth = (offsetWidth - this.borderOffset * 2) / this.column;
    const availableHeight = (offsetHeight - this.borderOffset * 2) / this.row;

    const appleRadius = Math.floor(
      Math.min(availableWidth, availableHeight) * 0.4,
    );
    const appleXOffSet = Math.floor(
      availableWidth / 2 - appleRadius + this.borderOffset,
    );
    const appleYOffSet = Math.floor(
      availableHeight / 2 - appleRadius + this.borderOffset,
    );

    this.apples.forEach((apple) => {
      const coordinateX = apple.getCoordinates().x;
      const coordinateY = apple.getCoordinates().y;

      const positionX = coordinateX * availableWidth + appleXOffSet;
      const positionY = coordinateY * availableHeight + appleYOffSet;

      apple.setPosition({ x: positionX, y: positionY });
      apple.setRadius(appleRadius);
    });
  }

  updateFallingPosition() {
    this.removedApples.forEach((apple) => {
      const { x: velocityX, y: velocityY } = apple.getVelocity();
      const { x: positionX, y: positionY } = apple.getPosition();

      apple.setVelocity({ x: velocityX, y: velocityY - 0.5 });

      const newPositionX = positionX + velocityX;
      const newPositionY = positionY - velocityY;

      apple.setPosition({ x: newPositionX, y: newPositionY });

      if (positionY > apple.getRadius() * this.column * 3) {
        this.removedApples = [];
      }
    });
  }
}
