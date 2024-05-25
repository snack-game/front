import gsap from 'gsap';
import { Container, Ticker } from 'pixi.js';

import { SnackGame, SnackGameOnPopData } from '../snackGame/SnackGame';
import { SnackGameMode, snackGameGetConfig } from '../snackGame/SnackGameUtil';
import { BeforGameStart } from '../ui/BeforeGameStart';
import { GameEffects } from '../ui/GameEffect';
import { Score } from '../ui/Score';
import { Timer } from '../ui/Timer';
import { waitFor } from '../util/asyncUtils';
import { bgm } from '../util/audio';
import { getUrlParam } from '../util/getUrlParams';
import { navigation } from '../util/navigation';

export class GameScreen extends Container {
  /** 화면에 필요한 에셋 번들 리스트 */
  public static assetBundles = ['game'];

  /** 스낵게임 인스턴스 */
  public readonly snackGame: SnackGame;
  /** 게임 타이머 */
  public readonly timer: Timer;
  /** 스낵게임 인스턴스를 위한 렌더링 컨테이너 */
  public readonly gameContainer: Container;
  /** 게임 점수 */
  public readonly score: Score;
  /** 게임 효과 */
  public readonly vfx?: GameEffects;
  /** 게임 시작 전 준비 화면 */
  public readonly beforGameStart: BeforGameStart;
  /** 게임 종료시 true가 됩니다. */
  private finished = false;

  constructor() {
    super();

    this.timer = new Timer();
    this.addChild(this.timer);

    this.gameContainer = new Container();
    this.addChild(this.gameContainer);

    this.snackGame = new SnackGame();
    this.snackGame.onPop = this.onPop.bind(this);
    this.gameContainer.addChild(this.snackGame);

    this.vfx = new GameEffects(this);
    this.addChild(this.vfx);

    this.score = new Score();
    this.addChild(this.score);

    this.beforGameStart = new BeforGameStart();
    this.addChild(this.beforGameStart);
  }

  public prepare() {
    const snackGameConfig = snackGameGetConfig({
      rows: 8,
      columns: 6,
      duration: 120,
      mode: getUrlParam('mode') as SnackGameMode,
    });

    this.finished = false;
    this.snackGame.setup(snackGameConfig);
    this.score.hide(false);
    this.timer.hide(false);
    gsap.killTweensOf(this.gameContainer.pivot);
    this.gameContainer.pivot.y = -navigation.height * 0.7;
    gsap.killTweensOf(this.timer.scale);
  }

  /** 화면 업테이트, 하위 컴포넌트의 update함수를 모두 실행합니다. */
  public update(time: Ticker) {
    this.snackGame.update(time.deltaMS);
    this.timer.updateTime(this.snackGame.timer.getTimeRemaining());
    this.score.setScore(this.snackGame.stats.getScore());
  }

  /** 스낵이 제거될 때 트리거 됩니다. */
  private onPop(data: SnackGameOnPopData) {
    this.vfx?.onPop(data);
    this.score.upWavesPosition();
  }

  /** 게임을 일시 정지 합니다. */
  public async pause() {
    this.gameContainer.interactiveChildren = false;
    this.snackGame.pause();
  }

  /** 게임 재게 */
  public async resume() {
    this.gameContainer.interactiveChildren = true;
    this.snackGame.resume();
  }

  /** 게임을 모두 리셋 하위 컴포넌트의 reset 함수들도 모두 실행합니다. */
  public reset() {
    this.snackGame.reset();
  }

  /** 화면 크기 변경 시 트리거 됩니다. */
  public resize(width: number, height: number) {
    const div = height * 0.3;
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.gameContainer.x = centerX;
    this.gameContainer.y = div + this.snackGame.board.getHeight() * 0.5;
    this.gameContainer.pivot = 0;

    this.timer.x = centerX;
    this.timer.y = 10;

    this.score.width = width * 0.3;
    this.score.height = height * 0.1;
    this.score.x = centerX;
    this.score.y = div - 80;

    this.beforGameStart.x = centerX;
    this.beforGameStart.y = centerY;
  }

  /** 화면 노출 시 애니메이션을 재생합니다. */
  public async show() {
    bgm.play('common/bgm-game1.mp3', { volume: 0.5 });
    this.score.show();
    this.timer.show();
    await this.beforGameStart.show();
    await waitFor(0.3);
    this.vfx?.playPopExplosion({ x: this.timer.x, y: this.timer.y });
    for (const snack of this.snackGame.board.snacks) {
      this.vfx?.animationBeforStart(snack);
    }
    await waitFor(0.6);
    await this.beforGameStart.hide();
    this.snackGame.startPlaying();
  }
}
