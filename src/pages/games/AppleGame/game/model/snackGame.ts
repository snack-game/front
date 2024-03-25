import Snack from './snack';

export class SnackGame {
  public score = 0;
  protected snacks: Snack[] = [];
  protected row: number;
  protected column: number;
  protected borderOffset = 10;

  constructor({
    row,
    column,
    snacks,
  }: {
    row: number;
    column: number;
    snacks: Snack[];
  }) {
    this.row = row;
    this.column = column;
    this.snacks = snacks;
  }

  removeSnacks() {
    const snacksInDragArea = this.snacks.filter((snack) =>
      snack.getIsSelected(),
    );
    const sum = snacksInDragArea
      .map((it) => it.getNumber())
      .reduce((previous, current) => previous + current, 0);

    if (sum > 10) {
      this.snacks.map((snack) => {
        snack.setIsSelected(false);
      });
    }

    if (sum == 10) {
      this.score += snacksInDragArea.length;
      this.snacks = this.snacks.filter(
        (snack) => !snacksInDragArea.includes(snack),
      );
      return snacksInDragArea;
    }
    return [];
  }

  updateSnacks(snacks: Snack[]) {
    this.snacks = snacks;
  }

  updateSnackPosition(offsetWidth: number, offsetHeight: number) {
    const availableWidth = (offsetWidth - this.borderOffset * 2) / this.column;
    const availableHeight = (offsetHeight - this.borderOffset * 2) / this.row;

    const snackRadius = Math.floor(
      Math.min(availableWidth, availableHeight) * 0.4,
    );
    const snackXOffSet = Math.floor(
      availableWidth / 2 - snackRadius + this.borderOffset,
    );
    const snackYOffSet = Math.floor(
      availableHeight / 2 - snackRadius + this.borderOffset,
    );

    this.snacks.forEach((snack) => {
      const coordinateX = snack.getCoordinates().x;
      const coordinateY = snack.getCoordinates().y;

      const positionX = coordinateX * availableWidth + snackXOffSet;
      const positionY = coordinateY * availableHeight + snackYOffSet;

      snack.setPosition({ x: positionX, y: positionY });
      snack.setRadius(snackRadius);
    });
  }

  getColumn() {
    return this.column;
  }

  getScore() {
    return this.score;
  }

  getSnacks() {
    return this.snacks;
  }
}
