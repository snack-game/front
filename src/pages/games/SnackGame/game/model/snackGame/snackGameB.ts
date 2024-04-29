import Snack from './snack';
import { SnackGame } from './snackGame';

export class SnackGameB extends SnackGame {
  private selectedPos: string | null = null;

  getSelectedDirection(latestSnack: Snack, targetSnack: Snack) {
    const snackCoord = targetSnack.getCoordinates();
    const latestSnackCoord = latestSnack.getCoordinates();

    const dx = Math.sign(snackCoord.x - latestSnackCoord.x);
    const dy = Math.sign(snackCoord.y - latestSnackCoord.y);
    return `${dx},${dy}`;
  }

  calculatePossibleSelect(): void {
    this.clearCanSelect();
    const latestSnack = this.selectedSnacks.at(-1);
    if (!latestSnack) return;

    const closestSnacks = new Map<string, Snack>();

    this.snacks.forEach((snack) => {
      if (snack !== latestSnack) {
        const directionKey = this.getSelectedDirection(latestSnack, snack);
        const distance = latestSnack.distanceTo(snack);
        const currentClosest = closestSnacks.get(directionKey);

        if (
          !currentClosest ||
          latestSnack.distanceTo(currentClosest) > distance
        ) {
          closestSnacks.set(directionKey, snack);
        }
      }
    });

    if (this.selectedPos) {
      closestSnacks.get(this.selectedPos)?.setCanSelect(true);
    } else {
      closestSnacks.forEach((snack) => {
        snack.setCanSelect(true);
      });
    }
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

      if (this.selectedSnacks.length === 1) {
        this.selectedPos = null;
      }
    } else {
      if (this.selectedSnacks.length === 0 || snack.getCanSelect()) {
        const latestSnack = this.selectedSnacks.at(-1);

        snack.setIsSelected(true);
        this.selectedSnacks.push(snack);

        if (latestSnack && this.selectedSnacks.length >= 2) {
          this.selectedPos = this.getSelectedDirection(latestSnack, snack);
        }
      }
    }
    this.calculatePossibleSelect();
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
      this.selectedPos = null;
      this.clearSelectedAndCanSelect();
      return selectedSnacks;
    }

    if (sum > 10) {
      this.clearSelectedAndCanSelect();
      this.selectedPos = null;
    }
  }
}
