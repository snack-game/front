import Snack from './snack';

export class SnackGame {
  public score = 0;
  protected apples: Snack[] = [];
  protected row: number;
  protected column: number;
  protected borderOffset = 10;

  constructor({
    row,
    column,
    apples,
  }: {
    row: number;
    column: number;
    apples: Snack[];
  }) {
    this.row = row;
    this.column = column;
    this.apples = apples;
  }

  removeApples() {
    const applesInDragArea = this.apples.filter((apple) =>
      apple.getIsSelected(),
    );
    const sum = applesInDragArea
      .map((it) => it.getNumber())
      .reduce((previous, current) => previous + current, 0);

    if (sum === 10) {
      this.apples.map((apple) => {
        apple.setIsSelected(false);
      });
    }

    if (sum == 10) {
      this.score += applesInDragArea.length;
      this.apples = this.apples.filter(
        (apple) => !applesInDragArea.includes(apple),
      );
      return applesInDragArea;
    }
    return [];
  }

  updateApples(apples: Snack[]) {
    this.apples = apples;
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

  getColumn() {
    return this.column;
  }

  getScore() {
    return this.score;
  }

  getApples() {
    return this.apples;
  }
}
