import Apple from '@game/model/apple';

export class AppleGame {
  protected apples: Apple[] = [];
  protected row: number;
  protected column: number;
  protected borderOffset = 20;
  protected score = 0;

  constructor({row, column, apples}: { row: number; column: number, apples: Apple[] }) {
    this.row = row;
    this.column = column;
    this.apples = apples;
  }

  removeApples() {
    const applesInDragArea = this.apples.filter(apple => apple.getInDragArea());
    const sum = applesInDragArea
      .map(it => it.getNumber())
      .reduce((previous, current) => previous + current, 0);

    if (sum == 10) {
      this.score += applesInDragArea.length;
      this.apples = this.apples.filter(apple => !applesInDragArea.includes(apple));
      return applesInDragArea;
    }
    return [];
  }

  updateApples(apples: Apple[]) {
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

      apple.setPosition({x: positionX, y: positionY});
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
