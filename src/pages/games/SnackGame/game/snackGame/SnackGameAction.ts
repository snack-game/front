import { ItemType } from '@pages/games/SnackGame/game/ui/ItemButton';

import { SnackGame } from './SnackGame';
import { SnackGamePosition } from './SnackGameUtil';
import { sfx } from '../util/audio';
import { HapticFeedback } from '../util/hapticFeedback';

export class SnackGameActions {
  /** 스낵게임 인스턴스 */
  public snackGame: SnackGame;

  /** 모든 이동을 자유롭게 함, 매치 결과와 상관없이 항상 유효 */
  public freeMoves = false;

  constructor(SnackGame: SnackGame) {
    this.snackGame = SnackGame;
  }

  /** Snack 객체에게 onPointerDown이벤트 시 실행할 콜백을 넘깁니다.
   * @param position 타겟 스낵 그리드 위치
   */
  public async actionTap(position: SnackGamePosition) {
    if (!this.snackGame.isPlaying()) return;
    sfx.play('common/sfx-select.mp3');

    const isSelectedBomb = this.snackGame.getSelectedItem() === 'bomb';
    if (isSelectedBomb) {
      this.tapSnackWithBomb(position);
      return;
    }

    this.updateSelectedSnacks(position);
    HapticFeedback.invoke('impactMedium');

    const sum = this.snackGame.board.getSelectedSnacksSum();

    if (sum > 10) {
      this.snackGame.board.clearAllSelectedSnacks();
      HapticFeedback.invoke('notificationError');
    }

    if (sum === 10) {
      sfx.play('common/sfx-match.mp3', { speed: 1.2, volume: 0.5 });
      const session = await this.snackGame.board.popAllSelectedSnacks();

      if (
        this.snackGame.board
          .getSelectedSnacks()
          .some((snack) => snack.type === 2)
      ) {
        this.snackGame.board.reset();
        this.snackGame.board.setup(this.snackGame.config, session!.board);
        this.snackGame.onSnackGameBoardReset?.();
        HapticFeedback.invoke('notificationError');
      } else {
        HapticFeedback.invoke('notificationSuccess');
      }

      this.snackGame.board.clearAllSelectedSnacks();
    }

    if (this.snackGame.board.selectedSnacks.length === 0) {
      this.snackGame.board.setAllSnackCanSelect();
    }
  }

  async tapSnackWithBomb(position: SnackGamePosition) {
    this.updateSelectedSnacks(position, 'bomb');
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        this.updateSelectedSnacks(
          { row: position.row + dr, column: position.column + dc },
          'bomb',
        );
      }
    }
    const session = await this.snackGame.board.popAllSelectedSnacks(position);

    if (
      this.snackGame.board.getSelectedSnacks().some((snack) => snack.type === 2)
    ) {
      this.snackGame.board.reset();
      this.snackGame.board.setup(this.snackGame.config, session!.board);
      this.snackGame.onSnackGameBoardReset?.();
      HapticFeedback.invoke('notificationError');
    } else {
      HapticFeedback.invoke('notificationSuccess');
    }

    this.snackGame.board.clearAllSelectedSnacks();
  }

  /** position을 기준으로 선택된 스낵의 선택, 취소를 업데이트 합니다.
   * @param position 타겟 스낵 그리드 위치
   * @param itemType (선택) 아이템 사용 시, 사용한 아이템의 종류
   */
  updateSelectedSnacks(position: SnackGamePosition, itemType?: ItemType) {
    const snack = this.snackGame.board.getSnackByPosition(position);
    const selectedSnack = this.snackGame.board.getSelectedSnacks();

    if (!snack || snack.isLocked()) return;

    if (itemType === 'bomb') {
      snack.setIsSelected(true);
      selectedSnack.push(snack);
      return;
    }

    /** 선택 불가능한 스낵을 선택하면 모든 선택 취소**/
    if (!snack.canSelect) {
      while (selectedSnack.length > 0) {
        const topSnack = selectedSnack.pop();
        topSnack?.setIsSelected(false);
      }
      return;
    }

    if (snack.isSelected) {
      snack.setIsSelected(false);

      /** 여러 스낵을 선택하고 중간 스낵을 선택 취소하면
       * 가장 최근 선택한 스낵부터 타겟 스낵까지 선택을 취소합니다. */
      while (selectedSnack.length > 0) {
        const topSnack = selectedSnack.pop();
        topSnack?.setIsSelected(false);
        if (topSnack === snack) break;
      }
    } else {
      snack.setIsSelected(true);
      selectedSnack.push(snack);
    }

    this.calculatePossibleSelect();
  }

  /**
   * position을 기준으로 선택된 스낵 주변의 가장 가까운 스낵이 선택 가능해집니다.
   */
  calculatePossibleSelect() {
    this.snackGame.board.setAllSnackCanSelectFalse(); // 선택된 스낵 제외, 모든 스낵을 선택 불가능하게
    const position = this.snackGame.board.selectedSnacks.at(-1); // 가장 최근의 선택한 스낵
    if (!position) return;

    const dx = [1, -1, 0, 0, 1, 1, -1, -1];
    const dy = [0, 0, -1, 1, 1, -1, 1, -1];

    for (let i = 0; i < 8; i++) {
      let posX = position.row + dx[i];
      let posY = position.column + dy[i];

      // 움직임이 가능할 때
      while (this.isValidPosition(posX, posY)) {
        const snack = this.snackGame.board.getSnackByPosition({
          row: posX,
          column: posY,
        });
        if (snack) {
          snack.setCanSelect(true); // 가장 가까운 스낵을 선택 가능하게
          break; // 가장 가까운 스낵을 찾으면 루프 종료
        }
        posX += dx[i];
        posY += dy[i];
      }
    }
  }

  /**
   * 그리드 내의 유효한 위치인지 확인하는 함수
   * @param row 행 인덱스
   * @param column 열 인덱스
   * @returns 위치가 유효하면 true, 그렇지 않으면 false
   */
  private isValidPosition(row: number, column: number): boolean {
    return (
      row >= 0 &&
      row < this.snackGame.board.rows &&
      column >= 0 &&
      column < this.snackGame.board.columns
    );
  }
}
