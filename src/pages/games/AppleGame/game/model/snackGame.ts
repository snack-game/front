import Snack from './snack';

export class SnackGame {
  private score = 0;
  private snacks: Snack[] = [];
  private row: number;
  private column: number;
  private borderOffset = 10;
  private selectStarted = false;
  private selectedSnacks: Snack[] = [];

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
      if (this.selectedSnacks.length === 0 || snack.getCanSelect()) {
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

      this.clearSelectedAndCanSelect();
      return selectedSnacks;
    }

    if (sum > 10) this.clearSelectedAndCanSelect();
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

  clearSelectedAndCanSelect() {
    this.selectedSnacks.forEach((snack) => snack.setIsSelected(false));
    this.clearCanSelect();
    this.selectedSnacks = [];
  }

  clearIsSelect() {
    this.snacks.map((snack) => {
      snack.setIsSelected(false);
    });
  }

  clearCanSelect() {
    this.snacks.map((snack) => {
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
