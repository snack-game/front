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

  caculateSnackClicked(mousePosition: { x: number; y: number }) {
    const { x, y } = mousePosition;

    this.snacks.forEach((snack) => {
      if (snack.isClicked(x, y)) {
        const selected = snack.getIsSelected();

        if (!selected || this.selectedSnacks.length === 0) {
          this.selectedSnacks.push(snack);
          snack.setIsSelected(true);
          this.calculatePossibleSelect();
        } else {
          snack.setIsSelected(false);
          while (this.selectedSnacks.length > 0) {
            const topSnack = this.selectedSnacks.pop();
            this.calculatePossibleSelect();
            topSnack?.setIsSelected(false);
            if (topSnack === snack) break;
          }
        }
        return;
      }
    });
  }

  calculatePossibleSelect() {
    // 선택한 Snack의 주변 3x3 영역에 있는 Snack들의 canSelect 상태를 true로 변경.
    const latestPosition = this.selectedSnacks.at(-1)?.getCoordinates();
    if (!latestPosition || this.selectedSnacks.length === 0) return;

    this.snacks.forEach((nearSnack) => {
      nearSnack.setCanSelect(false);
      const nearPosition = nearSnack.getCoordinates();
      // 주변 객체 판별 로직 (선택된 객체의 x, y 좌표를 기준으로 +/- 1 범위 내에 있는지 확인)
      if (
        nearPosition.x >= latestPosition.x - 1 &&
        nearPosition.x <= latestPosition.x + 1 &&
        nearPosition.y >= latestPosition.y - 1 &&
        nearPosition.y <= latestPosition.y + 1 &&
        !(
          nearPosition.x === latestPosition.x &&
          nearPosition.y === latestPosition.y
        ) // 선택된 객체 자신은 제외
      ) {
        nearSnack.setCanSelect(true);
      }
    });
  }

  removeSnacks() {
    const selectedSnacks = this.snacks.filter((snack) => snack.getIsSelected());
    const sum = selectedSnacks
      .map((it) => it.getNumber())
      .reduce((previous, current) => previous + current, 0);

    if (sum > 10) {
      this.clearCanSelect();
      this.clearIsSelect();
      this.selectedSnacks = [];
    }

    if (sum == 10) {
      this.selectedSnacks = [];
      this.score += selectedSnacks.length;
      this.snacks = this.snacks.filter(
        (snack) => !selectedSnacks.includes(snack),
      );
      this.clearCanSelect();

      return selectedSnacks;
    }
    return [];
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
