import gsap from 'gsap';
import { Container, Graphics, Sprite, Texture } from 'pixi.js';

import { ItemType } from '@utils/types/item.type';

import { Snack } from './Snack';
import { SnackGame } from './SnackGame';
import {
  SnackGamePosition,
  SnackGameConfig,
  snackGameGetSnack,
  SnackGameGrid,
  SnackType,
  snackGameGetSnackType,
  snackGameSetPieceType,
  snackGameCreateGrid,
} from './SnackGameUtil';
import { SnackResponse } from '../game.type';
import { pool } from '../util/pool';

export class SnackGameBoard {
  /** 스낵게임 인스턴스 */
  public snackGame: SnackGame;
  /** 숫자로 이루어진 격자 */
  public grid: SnackGameGrid = [];
  /** 현재 그리드에서 사용 중인 모든 스낵 스프라이트 */
  public snacks: Snack[] = [];
  /** 보드 차원 내부의 모든 스낵에 대한 마스크 */
  public snacksMask: Graphics;
  /** 스낵 스프라이트를 위한 컨테이너 */
  public snacksContainer: Container;
  public borderGraphics: Graphics;
  /** 보드의 행 수 */
  public rows = 0;
  /** 보드의 열 수 */
  public columns = 0;
  /** 각 보드 슬롯의 크기 (너비 및 높이) */
  public tileSize = 0;
  /** 게임에 사용 가능한 일반 유형 목록 */
  public commonTypes: SnackType[] = [];
  /** 스낵 유형을 스낵 이름에 매핑 */
  public typesMap!: Record<number, string>;
  /** 선택된 Snack 스택 */
  public selectedSnacks: Snack[] = [];

  constructor(snackGame: SnackGame) {
    this.snackGame = snackGame;

    this.snacksContainer = new Container();
    this.snackGame.addChild(this.snacksContainer);

    this.snacksMask = new Graphics()
      .rect(-2, -2, 4, 4)
      .fill({ color: 0xff0000, alpha: 0.5 });
    this.snackGame.addChild(this.snacksMask);
    this.snacksContainer.mask = this.snacksMask;

    this.borderGraphics = new Graphics();
    this.snacksContainer.addChild(this.borderGraphics);
  }

  /**
   * 초기 격자 상태를 설정하고 뷰를 스낵으로 채움
   * @param config 스낵게임 설정 매개 변수
   */
  public setup(config: SnackGameConfig, board: SnackResponse[][]) {
    this.rows = config.rows;
    this.columns = config.columns;
    this.tileSize = 50;
    this.snacksMask.width = this.getWidth();
    this.snacksMask.height = this.getHeight();
    this.snacksContainer.visible = true;

    // 게임에서 사용될 스낵 타입 배열
    const snacks = snackGameGetSnack(config.mode);

    if (!this.commonTypes.length) {
      this.typesMap = {};

      for (let i = 0; i < snacks.length; i++) {
        const name = snacks[i];
        const type = i + 1;

        this.commonTypes.push(type);
        this.typesMap[type] = name;
      }
    }

    // 초기 격자 상태 생성
    this.grid = snackGameCreateGrid(this.rows, this.columns, board);

    // 서버에서 준 board 정보로 보드에 스낵 스프라이트 채우기
    board.forEach((rowSnack, row) => {
      rowSnack.forEach((snack, column) => {
        this.createSnack({ row, column }, snack);
      });
    });
  }

  /**
   * 모든 스낵을 삭제하고 보드를 정리
   */
  public reset() {
    let i = this.snacks.length;
    while (i--) {
      const snack = this.snacks[i];
      this.disposeSnack(snack);
    }
    this.snacks.length = 0;
  }

  /**
   * 특정 그리드 위치에 새 스낵 생성
   * @param position 새 스낵이 붙을 그리드 위치
   * @param snackType 새 스낵의 유형
   */
  public createSnack(position: SnackGamePosition, snackInfo: SnackResponse) {
    const type = snackInfo.golden ? 2 : 1;
    const name = this.typesMap[type];
    const snack = pool.get(Snack);
    const viewPosition = this.getViewPositionByGridPosition(position);
    snack.onTap = (position) => this.snackGame.actions.actionTap(position);
    snack.setup({
      name,
      type,
      interactive: true,
      snackNum: snackInfo.number,
    });
    snack.row = position.row;
    snack.column = position.column;
    snack.x = viewPosition.x;
    snack.y = viewPosition.y;
    this.snacks.push(snack);
    this.snacksContainer.addChild(snack);
    return snack;
  }

  /**
   * 스낵을 보드에서 제거
   * @param snack 제거할 스낵
   */
  public disposeSnack(snack: Snack) {
    if (this.snacks.includes(snack)) {
      this.snacks.splice(this.snacks.indexOf(snack), 1);
    }
    if (snack.parent) {
      snack.parent.removeChild(snack);
    }
    pool.giveBack(snack);
  }

  /**
   * 스낵을 보드에서 팝하여 제거하고 특수 스낵인 경우 해당 효과를 트리거
   * @param position 팝될 스낵의 그리드 위치
   * @param causedBySpecial 팝이 특수 효과로 인해 발생했는지 여부
   */
  public async popSnack(position: SnackGamePosition) {
    const snack = this.getSnackByPosition(position);
    const type = snackGameGetSnackType(this.grid, position);
    if (!type || !snack) return;

    // const combo = this.snackGame.process.getProcessRound();

    // 그리드의 해당 위치에 있는 스낵을 0으로 설정하고 보드에서 팝
    snackGameSetPieceType(this.grid, position, 0);
    const popData = { snack, type };
    this.snackGame.stats.registerPop(popData);
    this.snackGame.onPop?.(popData);
    if (this.snacks.includes(snack)) {
      this.snacks.splice(this.snacks.indexOf(snack), 1);
    }
    await snack.animatePop();
    this.disposeSnack(snack);

    // 이 스낵과 관련된 특수 효과를 트리거
    // await this.snackGame.special.trigger(type, position);
  }

  /**
   * 그리드 위치로 스낵 스프라이트 찾기
   * @param position 찾을 그리드 위치
   * @returns
   */
  public getSnackByPosition(position: SnackGamePosition) {
    for (const snack of this.snacks) {
      if (snack.row === position.row && snack.column === position.column) {
        return snack;
      }
    }
    return null;
  }

  /**
   * 그리드 위치 (행 및 열)를 뷰 위치 (x 및 y)로 변환
   * @param position 변환할 그리드 위치
   * @returns 보드의 해당 x 및 y 위치
   */
  public getViewPositionByGridPosition(position: SnackGamePosition) {
    const offsetX = ((this.columns - 1) * this.tileSize) / 2;
    const offsetY = ((this.rows - 1) * this.tileSize) / 2;
    const x = position.column * this.tileSize - offsetX;
    const y = position.row * this.tileSize - offsetY;
    return { x, y };
  }

  /**
   * 그리드 위치의 스낵 유형 찾기
   * @param position
   * @returns 스낵의 유형
   */
  public getTypeByPosition(position: SnackGamePosition) {
    return snackGameGetSnackType(this.grid, position);
  }

  /** 선택된 스낵 배열 반환 */
  public getSelectedSnacks() {
    return this.selectedSnacks;
  }

  /** 선택되 스낵의 숫자 총합 */
  public getSelectedSnacksSum() {
    let total = 0;
    for (const snack of this.selectedSnacks) {
      total += snack.snackNum;
    }

    return total;
  }

  /** 선택된 스낵들 clear */
  public clearAllSelectedSnacks() {
    for (const snack of this.selectedSnacks) {
      snack.isSelected = false;
    }
    this.selectedSnacks = [];
  }

  /** 선택된 스낵들을 모두 pop */
  public popAllSelectedSnacks(position?: SnackGamePosition) {
    let session;

    if (this.snackGame.selectedItem === 'BOMB' && position) {
      session = this.snackGame.onBomb?.(position);
    } else {
      session = this.snackGame.onStreak?.(this.selectedSnacks);
    }

    for (const snack of this.selectedSnacks) {
      this.popSnack(snack.getGridPosition());
    }
    return session;
  }

  /** 모든 스낵이 선택 가능하게  */
  public setAllSnackCanSelect() {
    for (const snack of this.snacks) {
      snack.setCanSelect(true);
    }
  }

  /** 모든 스낵기 선택 불가능하게 */
  public setAllSnackCanSelectFalse() {
    for (const snack of this.snacks) {
      if (snack.isSelected) continue; // 이미 선택된 스낵은 건너뜁니다.
      snack.setCanSelect(false);
    }
  }

  /** 보드의 시각적 너비 가져오기 */
  public getWidth() {
    return this.tileSize * this.columns;
  }

  /** 보드의 시각적 높이 가져오기 */
  public getHeight() {
    return this.tileSize * this.rows;
  }

  /** 모든 스낵 애니메이션 일시 정지 */
  public pause() {
    for (const snack of this.snacks) snack.pause();
  }

  /** 모든 스낵 애니메이션 재개 */
  public resume() {
    for (const snack of this.snacks) snack.resume();
  }

  /** 스낵을 다른 모든 스낵 앞에 배치 */
  public bringToFront(snack: Snack) {
    this.snacksContainer.addChild(snack);
  }

  public async applyItemOverlay(item: ItemType | null) {
    if (item === 'BOMB') {
      const overlay = new Sprite(Texture.from('bomb_overlay'));

      gsap.killTweensOf(overlay);

      overlay.anchor.set(0.5);
      overlay.alpha = 0;

      this.snacksContainer.addChild(overlay);

      await gsap.to(overlay, { alpha: 1, duration: 0.3, ease: 'linear' });
      await gsap.to(overlay, {
        alpha: 0,
        duration: 0.6,
        ease: 'linear',
        delay: 0.3,
      });

      this.snacksContainer.removeChild(overlay);
    }
  }
}
