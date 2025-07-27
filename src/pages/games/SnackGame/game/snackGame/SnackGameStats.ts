import { SnackGame, SnackGameOnPopData } from './SnackGame';

/** Default gameplay stats data */
const defaultStatsData = {
  score: 0,
  matches: 0,
  pops: 0,
  grade: 0,
};

/** gameplay stats data */
export type SnackGameStateData = typeof defaultStatsData;

/**
 * 게임 세션동안 스코어 및 전반적인 게임 상태를 계산합니다.
 */
export class SnackGameStats {
  /** 스낵게임 인스턴스 */
  private snackGame: SnackGame;
  /** 스낵게임 최신 상태 */
  private data: SnackGameStateData;

  constructor(snackGame: SnackGame) {
    this.snackGame = snackGame;
    this.data = { ...defaultStatsData };
  }

  /**
   * 상태 초기화
   */
  public reset() {
    this.data = { ...defaultStatsData };
  }

  /**
   * Update stats params based on given params
   * @param data The piece pop data
   */
  public registerPop(data: SnackGameOnPopData) {
    const points = this.snackGame.selectedItem === 'FEVER_TIME' ? 2 : 1;
    this.data.score += points;
    this.data.pops += 1;
    // if (data.isSpecial) {
    //   this.data.specials += 1;
    // }
  }

  /**
   * Calculate a grade from 0 (worst) to 3 (best) based on given score and playtime
   * @param score The score to calculated
   * @param playTime The play time (in milliseconds) of the score
   * @returns An number (0 to 3) representing the grade
   */
  public calculateGrade(score: number, playTime: number) {
    const avgPointsPerSecond = 8;
    const gameplayTimeInSecs = playTime / 1000;
    const pointsPerSecond = score / gameplayTimeInSecs;

    let grade = 0;
    if (pointsPerSecond > avgPointsPerSecond * 2) {
      grade = 3;
    } else if (pointsPerSecond > avgPointsPerSecond) {
      grade = 2;
    } else if (pointsPerSecond > avgPointsPerSecond * 0.1) {
      grade = 1;
    }

    return grade;
  }

  public getScore() {
    return this.data.score;
  }

  /**
   * Retrieve full gameplay session performance in an object
   */
  public getGameplayPerformance() {
    const grade = this.calculateGrade(
      this.data.score,
      this.snackGame.timer.getTime(),
    );
    return { ...this.data, grade };
  }
}
