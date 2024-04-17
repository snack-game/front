import { SnackGame } from './snackGame';

export class SnackGameC extends SnackGame {
  removeSnacks() {
    const selectedSnacks = this.snacks.filter((snack) => snack.getIsSelected());
    const sum = this.selectedSnacks
      .map((snack) => snack.getNumber())
      .reduce((acc, num) => acc + num, 0);

    if (sum === 10) {
      this.score += this.selectedSnacks.length;
      this.snacks.forEach((snack) => {
        if (this.selectedSnacks.includes(snack)) {
          snack.setNumber(Math.floor(Math.random() * 9) + 1);
        }
      });

      this.clearSelectedAndCanSelect();
      return selectedSnacks;
    }

    if (sum > 10) this.clearSelectedAndCanSelect();
  }
}
