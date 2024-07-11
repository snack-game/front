import { Container } from 'pixi.js';

import { Snack } from './Snack';
import { SnackGameActions } from './SnackGameAction';
import { SnackGameBoard } from './SnackGameBoard';
import { SnackGameStats } from './SnackGameStats';
import { SnackGameTimer } from './SnackGameTimer';
import {
  SnackGamePosition,
  SnackGameConfig,
  snackGameGetConfig,
  SnackType,
} from './SnackGameUtil';

/** onMatch 이벤트 데이터에 대한 인터페이스 */
export interface SnackGameOnMatchData {
  /** 그리드에서 감지된 모든 매치의 리스트 */
  matches: SnackGamePosition[][];
  /** 콤보 레벨 - 1부터 시작 */
  combo: number;
}

/** onPop 이벤트 데이터에 대한 인터페이스 */
export interface SnackGameOnPopData {
  /** 팝된 조각의 유형 */
  type: SnackType;
  /** 조각 스프라이트 */
  snack: Snack;
  /** 현재 콤보 레벨 */
  // combo: number;
  // TODO: Combo 시스템
  /** 주어진 유형이 특수 유형인지 여부 */
  // isSpecial: boolean;
  // TODO: 황금사과 시스템
}

/**
 * 게임의 하위 시스템을 설정하고 몇 가지 유용한 콜백을 제공하는 주요 SnackGame 클래스.
 * 모든 게임 이벤트는 단순성을 위해 일반 콜백으로 설정됨
 */
export class SnackGame extends Container {
  /** SnackGame 게임 기본 설정 */
  public config: SnackGameConfig;
  /** 게임 플레이 시간을 카운트 */
  public timer: SnackGameTimer;
  /** 점수, 등급, 매치 수 계산 */
  public stats: SnackGameStats;
  /** 그리드 상태 및 표시를 유지 */
  public board: SnackGameBoard;
  /** 플레이어가 취할 수 있는 행동 정렬 */
  public actions: SnackGameActions;

  /** 매치가 감지되면 발생 */
  public onMatch?: (data: SnackGameOnMatchData) => void;
  /** 보드에서 조각이 팝될 때 발생 */
  public onPop?: (data: SnackGameOnPopData) => void;
  public onStreak?: (data: Snack[]) => void;
  /** 게임 시간이 만료되면 발생 */
  public onTimesUp?: () => void;
  /** SnackGameBoard 리셋 시 발생*/
  public onSnackGameBoardReset?: () => void;

  constructor() {
    super();

    // 게임 하위 시스템
    this.config = snackGameGetConfig();
    this.timer = new SnackGameTimer(this);
    this.stats = new SnackGameStats(this);
    this.board = new SnackGameBoard(this);
    this.actions = new SnackGameActions(this);
  }

  /**
   * 조각, 행, 열, 지속 시간 등을 포함하여 새로운 SnackGame 게임을 설정
   * @param config 게임이 기반으로 할 설정 객체
   */
  public setup(config: SnackGameConfig) {
    this.config = config;
    this.reset();
    this.board.setup(config);
    this.timer.setup(config.duration * 1000);
  }

  /** 게임을 완전히 리셋 */
  public reset() {
    this.interactiveChildren = false;
    this.timer.reset();
    this.stats.reset();
    this.board.reset();
  }

  /** 타이머를 시작하고 상호작용을 활성화 */
  public startPlaying() {
    this.interactiveChildren = true;
    this.timer.start();
  }

  /** 타이머를 멈추고 상호작용을 비활성화 */
  public stopPlaying() {
    this.interactiveChildren = false;
    this.timer.stop();
  }

  /** 게임이 여전히 진행 중인지 확인 */
  public isPlaying() {
    return this.interactiveChildren;
  }

  /** 게임 일시 정지 */
  public pause() {
    this.timer.pause();
    this.board.pause();
  }

  /** 게임 재개 */
  public resume() {
    this.timer.resume();
    this.board.resume();
  }

  /** 타이머 업데이트 */
  public update(delta: number) {
    this.timer.update(delta);
  }
}
