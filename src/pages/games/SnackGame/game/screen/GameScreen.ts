import gsap from 'gsap';
import { Container, Rectangle, Ticker } from 'pixi.js';

import { ItemBar } from '@pages/games/SnackGame/game/ui/ItemBar';
import { ItemResponse } from '@utils/types/item.type';

import { AppScreen, AppScreenConstructor } from './appScreen';
import { SnackgameApplication } from './SnackgameApplication';
import { GameHandlers, ItemHandlers } from '../handlers.type';
import { PausePopup } from '../popup/PausePopup';
import { SettingsPopup } from '../popup/SettingPopup';
import { Snack } from '../snackGame/Snack';
import { SnackGame, SnackGameOnPopData } from '../snackGame/SnackGame';
import {
  SnackGameMode,
  SnackGamePosition,
  Streak,
  snackGameGetConfig,
} from '../snackGame/SnackGameUtil';
import { BeforeGameStart } from '../ui/BeforeGameStart';
import { FeverTimer } from '../ui/FeverTimer';
import { GameEffects } from '../ui/GameEffect';
import { IconButton } from '../ui/IconButton';
import { Score } from '../ui/Score';
import { Timer } from '../ui/Timer';
import { waitFor } from '../util/asyncUtils';
import { bgm } from '../util/audio';
import { HapticFeedback } from '../util/hapticFeedback';

export class GameScreen extends Container implements AppScreen {
  /** 화면에 필요한 에셋 번들 리스트 */
  public static assetBundles = ['game'];

  /** 스낵게임 인스턴스 */
  public readonly snackGame: SnackGame;
  /** 게임 타이머 */
  public readonly timer: Timer;
  /** 피버타임 아이템용 타이머 */
  public readonly feverTimer: FeverTimer;
  /** 스낵게임 인스턴스를 위한 렌더링 컨테이너 */
  public readonly gameContainer: Container;
  /** 스낵게임 일시정지 Popup **/
  public readonly pauseButton: IconButton;
  /** 게임 점수 */
  public readonly score: Score;
  /** 게임 효과 */
  public readonly vfx?: GameEffects;
  /** 게임 시작 전 준비 화면 */
  public readonly beforeGameStart: BeforeGameStart;
  /** 설정 버튼 */
  private settingsButton: IconButton;
  /** 게임 종료시 true가 됩니다. */
  private finished = false;
  /** 아이템 보유 현황 조회/사용을 위한 컨테이너 */
  private itemBar: ItemBar;

  constructor(
    private app: SnackgameApplication,
    private getCurrentMode: () => string,
    private gameHandlers: GameHandlers,
    private itemHandlers: ItemHandlers,
    private fetchUserItem: () => Promise<{ items: ItemResponse[] }>,
  ) {
    super();

    this.settingsButton = new IconButton({
      image: 'settings',
      ripple: 'ripple',
    });

    this.settingsButton.onPress.connect(async () => {
      await this.onPause(SettingsPopup);
    });
    this.addChild(this.settingsButton);

    this.pauseButton = new IconButton({
      image: 'pause',
      ripple: 'ripple',
    });
    this.pauseButton.onPress.connect(async () => {
      await this.onPause();
    });

    this.addChild(this.pauseButton);

    this.timer = new Timer();
    this.addChild(this.timer);

    this.feverTimer = new FeverTimer();
    this.addChild(this.feverTimer);

    this.gameContainer = new Container();
    this.addChild(this.gameContainer);

    this.snackGame = new SnackGame();
    this.snackGame.onPop = this.onPop.bind(this);
    this.snackGame.onStreak = (data: Snack[]) => {
      let isGolden = false;
      const isFever = this.snackGame.selectedItem === 'FEVER_TIME';
      const occurredAt = new Date().toISOString();

      const streak = data.reduce((acc: Streak, snack) => {
        if (snack.type === 2) isGolden = true;

        const { row: y, column: x } = snack.getGridPosition();
        acc.push({ x, y });
        return acc;
      }, []);

      return this.gameHandlers.streak(
        { coordinates: streak, isFever, occurredAt },
        isGolden,
      );
    };
    this.snackGame.onBomb = (position: SnackGamePosition, data: Snack[]) => {
      this.snackGame.setSelectedItem(null);
      this.itemBar.setItemsLocked(false);
      let isGolden = false;

      data.forEach((snack) => {
        if (snack.type === 2) isGolden = true;
      });

      return this.itemHandlers.bomb(position, isGolden);
    };
    this.snackGame.onSnackGameBoardReset =
      this.onSnackGameBoardReset.bind(this);
    this.snackGame.onTimesUp = this.onTimesUp.bind(this);
    this.gameContainer.addChild(this.snackGame);

    this.vfx = new GameEffects(this);
    this.addChild(this.vfx);

    this.score = new Score();
    this.addChild(this.score);

    this.beforeGameStart = new BeforeGameStart();
    this.addChild(this.beforeGameStart);

    this.itemBar = new ItemBar();
    this.addChild(this.itemBar);
  }

  public async onPrepare({ width, height }: Rectangle) {
    const { items } = await this.fetchUserItem();
    this.itemBar.setup(
      items.map((item) => {
        return {
          ...item,
          onUse: async (type) => {
            this.snackGame.setSelectedItem(type);
            if (type === 'FEVER_TIME') {
              await this.itemHandlers.fever();
              this.feverTimer.start(30, () => {
                this.snackGame.setSelectedItem(null);
              });
            }
          },
        };
      }),
    );

    const { board } = await this.gameHandlers.start();
    const mode = this.getCurrentMode() as SnackGameMode;
    const snackGameConfig = snackGameGetConfig({
      rows: board.length,
      columns: board[0].length,
      duration: 121,
      mode,
    });
    this.snackGame.setup(snackGameConfig, board);
    HapticFeedback.invoke('notificationSuccess');

    this.snackGame.startPlaying(); // TODO: onPrepare로 이동시키면서 시간을 1초 늘렸는데, 다른 방법이 없을지?

    this.finished = false;
    this.score.hide(false);
    this.pauseButton.hide(false);
    this.timer.hide(false);
    this.feverTimer.hide(false);
    this.itemBar.hide(false);
    gsap.killTweensOf(this.gameContainer.pivot);
    this.gameContainer.pivot.y = -height * 0.7;
    gsap.killTweensOf(this.timer.scale);
  }

  /** 화면 업테이트, 하위 컴포넌트의 update함수를 모두 실행합니다. */
  public update(time: Ticker) {
    this.snackGame.update(time.deltaMS);
    this.timer.updateTime(this.snackGame.timer.getTimeRemaining());
    this.feverTimer.update(time.deltaMS);
    this.score.setScore(this.snackGame.stats.getScore());
  }

  private onSnackGameBoardReset() {
    for (const snack of this.snackGame.board.snacks) {
      this.vfx?.animationBeforeStart(snack);
    }
  }

  /** 스낵이 제거될 때 트리거 됩니다. */
  private onPop(data: SnackGameOnPopData) {
    this.vfx?.onPop(data);
    this.score.upWavesPosition();
  }

  public async onPause(popup?: AppScreenConstructor) {
    if (this.snackGame.isPlaying()) {
      await this.gameHandlers.pause();
      this.gameContainer.interactiveChildren = false;
      this.snackGame.pause();
      if (this.feverTimer.isRunning()) {
        this.feverTimer.pause();
      }
      this.app.presentPopup(popup ? popup : PausePopup);
    }
  }

  public async onResume() {
    this.gameContainer.interactiveChildren = true;
    this.snackGame.resume();
    if (this.feverTimer.isRunning()) {
      this.feverTimer.resume();
    }
  }

  public reset() {
    this.snackGame.reset();
  }

  public onResize({ width, height }: Rectangle) {
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
    this.score.y = 90;

    this.feverTimer.x = centerX;
    this.feverTimer.y = 130;

    this.beforeGameStart.x = centerX;
    this.beforeGameStart.y = centerY;

    this.pauseButton.x = 25;
    this.pauseButton.y = 25;

    this.settingsButton.x = width - 25;
    this.settingsButton.y = 25;

    this.itemBar.x = width * 0.5;
    this.itemBar.y = height * 0.24;
  }

  public async onShow({ width, height }: Rectangle) {
    bgm.play('common/bgm-game1.mp3', { volume: 0.5 });
    this.score.show();
    this.timer.show();
    this.pauseButton.show();
    this.itemBar.show();
    await this.beforeGameStart.show();
    await waitFor(0.3);
    this.vfx?.playPopExplosion({ x: this.score.x, y: this.score.y });
    this.onSnackGameBoardReset();
    await waitFor(0.6);
    await this.beforeGameStart.hide();
  }

  public async onHide({ width, height }: Rectangle) {
    this.score.hide();
    this.timer.hide();
    this.feverTimer.hide();
    this.itemBar.hide();
    await this.vfx?.playGridExplosion();
  }

  /** 게임 종료 시 트리거 */
  private onTimesUp() {
    this.pauseButton.hide();
    this.snackGame.stopPlaying();
    this.finish();
  }

  /** 게임 플레이를 마무리하고 결과를 userStats에 저장함 */
  private async finish() {
    try {
      if (this.finished) return;
      this.finished = true;
      this.snackGame.stopPlaying();

      await this.gameHandlers.end();
    } catch (error) {
      this.app.setError(error);
    }
  }
}
