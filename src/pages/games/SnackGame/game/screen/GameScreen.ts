import gsap from 'gsap';
import { Container, Ticker } from 'pixi.js';

import PATH from '@constants/path.constant';

import { ResultScreen } from './ResultScreen';
import { PausePopup } from '../popup/PausePopup';
import { SnackGame, SnackGameOnPopData } from '../snackGame/SnackGame';
import { SnackGameMode, snackGameGetConfig } from '../snackGame/SnackGameUtil';
import { BeforGameStart } from '../ui/BeforeGameStart';
import { GameEffects } from '../ui/GameEffect';
import { IconButton } from '../ui/IconButton';
import { Score } from '../ui/Score';
import { SettingsPopup } from '../ui/SettingPopup';
import { Timer } from '../ui/Timer';
import { waitFor } from '../util/asyncUtils';
import { bgm } from '../util/audio';
import { getUrlParam } from '../util/getUrlParams';
import { navigation } from '../util/navigation';
import { userStats } from '../util/userStats';

export class GameScreen extends Container {
  /** 화면에 필요한 에셋 번들 리스트 */
  public static assetBundles = ['game'];

  /** 스낵게임 인스턴스 */
  public readonly snackGame: SnackGame;
  /** 게임 타이머 */
  public readonly timer: Timer;
  /** 스낵게임 인스턴스를 위한 렌더링 컨테이너 */
  public readonly gameContainer: Container;
  /** 스낵게임 일시정지 Popup **/
  public readonly pauseButton: IconButton;
  /** 게임 점수 */
  public readonly score: Score;
  /** 게임 효과 */
  public readonly vfx?: GameEffects;
  /** 게임 시작 전 준비 화면 */
  public readonly beforGameStart: BeforGameStart;
  /** 설정 버튼 */
  private settingsButton: IconButton;
  /** 게임 종료시 true가 됩니다. */
  private finished = false;

  constructor() {
    super();

    this.settingsButton = new IconButton({
      image: 'settings',
      ripple: 'ripple',
    });

    this.settingsButton.onPress.connect(() =>
      navigation.presentPopup(SettingsPopup),
    );
    this.addChild(this.settingsButton);

    this.pauseButton = new IconButton({
      image: 'pause',
      ripple: 'ripple',
    });
    this.pauseButton.onPress.connect(() => navigation.presentPopup(PausePopup));

    this.addChild(this.pauseButton);

    this.timer = new Timer();
    this.addChild(this.timer);

    this.gameContainer = new Container();
    this.addChild(this.gameContainer);

    this.snackGame = new SnackGame();
    this.snackGame.onPop = this.onPop.bind(this);
    this.snackGame.onSnackGameBoardReset =
      this.onSnackGameBoardReset.bind(this);
    this.snackGame.onTimesUp = this.onTimesUp.bind(this);
    this.gameContainer.addChild(this.snackGame);

    this.vfx = new GameEffects(this);
    this.addChild(this.vfx);

    this.score = new Score();
    this.addChild(this.score);

    this.beforGameStart = new BeforGameStart();
    this.addChild(this.beforGameStart);
  }

  public prepare() {
    const mode = getUrlParam('mode') as SnackGameMode;

    const snackGameConfig = snackGameGetConfig({
      rows: 8,
      columns: 6,
      // TODO: 게임 시간 임시로 5초로 바꿔둠!
      duration: 5,
      mode,
    });

    this.finished = false;
    this.snackGame.setup(snackGameConfig);
    this.score.hide(false);
    this.pauseButton.hide(false);
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

    if (
      !navigation.currentPopup &&
      this.snackGame.isPlaying() &&
      window.location.pathname !== PATH.SNACK_GAME
    ) {
      this.blur();
    }
  }

  private onSnackGameBoardReset() {
    for (const snack of this.snackGame.board.snacks) {
      this.vfx?.animationBeforStart(snack);
    }
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

    this.pauseButton.x = 25;
    this.pauseButton.y = 25;

    this.settingsButton.x = width - 25;
    this.settingsButton.y = 25;
  }

  /** 화면 노출 시 애니메이션을 재생합니다. */
  public async show() {
    bgm.play('common/bgm-game1.mp3', { volume: 0.5 });
    this.score.show();
    this.timer.show();
    this.pauseButton.show();
    await this.beforGameStart.show();
    await waitFor(0.3);
    this.vfx?.playPopExplosion({ x: this.score.x, y: this.score.y });
    this.onSnackGameBoardReset();
    await waitFor(0.6);
    await this.beforGameStart.hide();
    this.snackGame.startPlaying();
  }

  /** URL이 변경되면 자동 정지 */
  public blur() {
    if (!navigation.currentPopup && this.snackGame.isPlaying()) {
      navigation.presentPopup(PausePopup);
    }
  }

  /** GameScreen 제거시 트리거 */
  public async hide() {
    this.score.hide();
    this.timer.hide();
    this.vfx?.playGridExplosion();
    await waitFor(1);
  }

  /** 게임 종료 시 트리거 */
  private onTimesUp() {
    this.pauseButton.hide();
    this.snackGame.stopPlaying();
    this.finish();
  }

  /** 게임 플레이를 마무리하고 결과를 userStats에 저장함 */
  private async finish() {
    if (this.finished) return;
    this.finished = true;
    this.snackGame.stopPlaying();
    const performance = this.snackGame.stats.getGameplayPerformance();
    userStats.save(this.snackGame.config.mode, performance);
    navigation.showScreen(ResultScreen);
  }
}
