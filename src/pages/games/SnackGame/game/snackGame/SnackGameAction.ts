import { Snack } from './Snack';
import { SnackGame } from './SnackGame';
import { SnackGamePosition, snackGameGetSnackType } from './SnackGameUtil';

export class SnackGameActions {
  /** 스낵게임 인스턴스 */
  public snackGame: SnackGame;

  /** 모든 이동을 자유롭게 함, 매치 결과와 상관없이 항상 유효 */
  public freeMoves = false;

  constructor(SnackGame: SnackGame) {
    this.snackGame = SnackGame;
  }

  public actionTap(position: SnackGamePosition) {
    if (!this.snackGame.isPlaying()) return;

    const snack = this.snackGame.board.getSnackByPosition(position);
    const selectedSnack = this.snackGame.board.getSelectedSnacks();
    if (!snack || snack.isLocked()) return;

    if (snack.isSelected) {
      snack.setIsSelected(false);

      while (selectedSnack.length > 0) {
        const topSnack = selectedSnack.pop();
        topSnack?.setIsSelected(false);
        if (topSnack === snack) break;
      }
    } else {
      snack.setIsSelected(true);
      selectedSnack.push(snack);
    }
  }
}
