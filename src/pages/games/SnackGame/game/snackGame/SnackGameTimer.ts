import { SnackGame } from './SnackGame';

/**
 * 게임 세션의 시간을 관리합니다.
 */
export class SnackGameTimer {
  /** 스낵게임 인스턴스 */
  private snackGame: SnackGame;
  /** 게임 시간 milliseconds - `0` 부터 `duration` 까지 */
  private time = 0;
  /** 게임 세션 지속시간 milliseconds */
  private duration = 0;
  /** 타이머 정지 여부 스위치 */
  private paused = false;
  /** 타이머 실행 중 true, 정지시에도 true로 유지됩니다. */
  private running = false;

  constructor(snackGame: SnackGame) {
    this.snackGame = snackGame;
  }

  /** 정지 후 타이머를 리셋합니다. */
  public reset() {
    this.time = 0;
    this.duration = 0;
    this.running = false;
    this.paused = false;
  }

  /**
   * 새로운 지속시간과 함께 타이머를 초기화 합니다.
   * @param duration 세션 총 지속시간 (milliseconds)
   */
  public setup(duration: number) {
    this.reset();
    this.duration = Math.floor(duration);
  }

  /** 타이머 시작 */
  public start() {
    this.running = true;
    this.paused = false;
    this.time = 0;
  }

  /** 타이머를 정지하고 완료로 판단합니다. */
  public stop() {
    this.running = false;
    this.paused = false;
    this.time = this.duration;
  }

  /** 타이머 정지 */
  public pause() {
    this.paused = true;
  }

  /** 타이머 재시작 */
  public resume() {
    this.paused = false;
  }

  /**
   * 타이머를 업데이트 하고 게임 객체의 onTimesUp callback을 실행합니다.
   * @param delta 변화 시간
   */
  public update(delta: number) {
    if (!this.running || this.paused) return;
    this.time += delta;
    if (this.time >= this.duration) {
      this.stop();
      this.snackGame.onTimesUp?.();
    }
  }

  /** 정지 상태를 확인합니다. */
  public isPaused() {
    return this.paused;
  }

  /** 타이머가 실행중인지 확인합니다. */
  public isRunning() {
    return this.running;
  }

  /** 시간을 가져옵니다. */
  public getTime() {
    return this.time;
  }

  /** 남은 시간을 가져옵니다. */
  public getTimeRemaining() {
    return this.duration - this.time;
  }
}
