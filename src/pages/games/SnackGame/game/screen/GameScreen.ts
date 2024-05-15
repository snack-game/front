import gsap from 'gsap';
import { Container, Ticker } from 'pixi.js';

import { SnackGame, SnackGameOnPopData } from '../snackGame/SnackGame';
import { SnackGameMode, snackGameGetConfig } from '../snackGame/SnackGameUtil';
import { GameEffects } from '../ui/GameEffect';
import { Timer } from '../ui/Timer';
import { getUrlParam } from '../util/getUrlParams';
import { navigation } from '../util/navigation';
export class GameScreen extends Container {
  /** 화면에 필요한 에셋 번들 리스트 */
  public static assetBundles = ['game'];

  /** The Math3 game */
  public readonly snackGame: SnackGame;
  /** The gameplay timer display */
  public readonly timer: Timer;

  public readonly gameContainer: Container;

  public readonly vfx?: GameEffects;
  /** Set to true when gameplay is finished */
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
  }

  public prepare() {
    const snackGameConfig = snackGameGetConfig({
      rows: 8,
      columns: 6,
      tileSize: 55,
      duration: 120,
      mode: getUrlParam('mode') as SnackGameMode,
    });

    this.finished = false;
    this.snackGame.setup(snackGameConfig);
    gsap.killTweensOf(this.gameContainer.pivot);
    this.gameContainer.pivot.y = -navigation.height * 0.7;
    gsap.killTweensOf(this.timer.scale);
  }

  /** Update the screen */
  public update(time: Ticker) {
    this.snackGame.update(time.deltaMS);
    this.timer.updateTime(this.snackGame.timer.getTimeRemaining());
  }

  /** Fired when a piece is poped out fro the board */
  private onPop(data: SnackGameOnPopData) {
    this.vfx?.onPop(data);
  }

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {
    this.gameContainer.interactiveChildren = false;
    this.snackGame.pause();
  }

  /** Resume gameplay */
  public async resume() {
    this.gameContainer.interactiveChildren = true;
    this.snackGame.resume();
  }

  /** Fully reset the game, clearing all pieces and shelf blocks */
  public reset() {
    this.snackGame.reset();
  }

  /** 화면 크기 변경 시 트리거 됩니다. */
  public resize(width: number, height: number) {
    const div = height * 0.3;
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.gameContainer.x = centerX;
    this.gameContainer.y = div + this.snackGame.board.getHeight() * 0.5 + 20;

    this.timer.x = centerX;
    this.timer.y = div - 100;
  }

  /** Show screen with animations */
  public async show() {
    await gsap.to(this.gameContainer.pivot, {
      y: 0,
      duration: 0.5,
      ease: 'back.out',
    });

    this.snackGame.startPlaying();
  }
}
