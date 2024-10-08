import Snack from './snack';

export class SnackGame {
  protected score = 0;
  protected snacks: Snack[] = [];
  protected row: number;
  protected column: number;
  protected borderOffset = 10;
  protected selectedSnacks: Snack[] = [];

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

  setSnackGame(row: number, column: number, snacks: Snack[]) {
    this.row = row;
    this.column = column;
    this.snacks = snacks;
  }

  isSnackNearby(selectedSnack: Snack, targetSnack: Snack): boolean {
    const selectedPos = selectedSnack.getCoordinates();
    const targetPos = targetSnack.getCoordinates();

    return (
      Math.abs(selectedPos.x - targetPos.x) <= 1 &&
      Math.abs(selectedPos.y - targetPos.y) <= 1 &&
      !(selectedPos.x === targetPos.x && selectedPos.y === targetPos.y)
    );
  }

  calculatePossibleSelect() {
    this.clearCanSelect();
    const latestSnack = this.selectedSnacks.at(-1);
    if (!latestSnack) return;

    this.snacks.forEach((snack) => {
      if (this.isSnackNearby(latestSnack, snack)) {
        snack.setCanSelect(true);
      }
    });
  }

  updateSelectedSnacks(snack: Snack): void {
    if (snack.getIsSelected()) {
      snack.setIsSelected(false);

      while (this.selectedSnacks.length > 0) {
        const topSnack = this.selectedSnacks.pop();
        this.calculatePossibleSelect();
        topSnack?.setIsSelected(false);
        if (topSnack === snack) break;
      }
    } else {
      if (snack.getCanSelect()) {
        snack.setIsSelected(true);
        this.selectedSnacks.push(snack);
      }
    }

    this.calculatePossibleSelect();
  }

  caculateSnackClicked(mousePosition: { x: number; y: number }) {
    const clickedSnack = this.snacks.find((snack) =>
      snack.isClicked(mousePosition.x, mousePosition.y),
    );
    if (clickedSnack) {
      this.updateSelectedSnacks(clickedSnack);

      if (this.selectedSnacks.length === 0) {
        this.setCanSelect();
      }
    }
  }

  removeSnacks() {
    const selectedSnacks = this.snacks.filter((snack) => snack.getIsSelected());
    const sum = this.selectedSnacks
      .map((snack) => snack.getNumber())
      .reduce((acc, num) => acc + num, 0);

    if (sum === 10) {
      this.score += this.selectedSnacks.length;
      this.snacks = this.snacks.filter(
        (snack) => !this.selectedSnacks.includes(snack),
      );

      this.selectedSnacks = [];
      this.clearIsSelect();
      this.setCanSelect();

      return selectedSnacks;
    }

    if (sum > 10) {
      this.selectedSnacks = [];
      this.clearIsSelect();
      this.setCanSelect();
    }
  }

  updateSnackPosition(offsetWidth: number, offsetHeight: number) {
    const availableWidth = offsetWidth / this.column;
    const availableHeight = offsetHeight / this.row;

    const snackRadius = Math.floor(
      Math.min(availableWidth, availableHeight) * 0.4,
    );
    const snackXOffSet = Math.floor(availableWidth / 2 - snackRadius);
    const snackYOffSet = Math.floor(availableHeight / 2 - snackRadius);

    this.snacks.forEach((snack) => {
      const coordinateX = snack.getCoordinates().x;
      const coordinateY = snack.getCoordinates().y;

      const positionX = coordinateX * availableWidth + snackXOffSet;
      const positionY = coordinateY * availableHeight + snackYOffSet;

      snack.setPosition({ x: positionX, y: positionY });
      snack.setRadius(snackRadius);
    });
  }

  clearIsSelect() {
    this.snacks.forEach((snack) => {
      snack.setIsSelected(false);
    });
  }

  setCanSelect() {
    this.snacks.forEach((snack) => {
      snack.setCanSelect(true);
    });
  }

  clearCanSelect() {
    this.snacks.forEach((snack) => {
      snack.setCanSelect(false);
    });
  }

  updateSnacks(snacks: Snack[]) {
    this.snacks = snacks;
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
