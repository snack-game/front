import Snack from './snack';
import { SnackGame } from './snackGame';

export class SnackGameDefualt extends SnackGame {
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

    closestSnacks.forEach((snack) => snack.setCanSelect(true));
  }
}
