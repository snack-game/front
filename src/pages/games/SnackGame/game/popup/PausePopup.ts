import gsap from 'gsap';
import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';

import { eventEmitter } from '../SnackGameBase';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { RoundedBox } from '../ui/RoundedBox';
import { gamePause, gameResume } from '../util/api';
import { navigation } from '../util/navigation';
import { storage } from '../util/storage';

/** 게임 플레이가 일시 중지되었을 때 표시되는 팝업 */
export class PausePopup extends Container {
  /** 현재 화면을 덮는 어두운 반투명 배경 */
  private bg: Sprite;
  /** 팝업 UI 구성 요소를 위한 컨테이너 */
  private panel: Container;
  /** 팝업 제목 레이블 */
  private title: Label;
  /** 팝업을 닫는 버튼 */
  private doneButton: LargeButton;
  /** 패널 배경 */
  private panelBase: RoundedBox;

  constructor() {
    super();

    this.bg = new Sprite(Texture.WHITE);
    this.bg.tint = 0xffedd5;
    this.bg.interactive = true;
    this.addChild(this.bg);

    this.panel = new Container();
    this.addChild(this.panel);

    this.panelBase = new RoundedBox({ height: 300 });
    this.panel.addChild(this.panelBase);

    this.title = new Label('일시정지', { fill: 0xf58529, fontSize: 50 });
    this.title.y = -80;
    this.panel.addChild(this.title);

    this.doneButton = new LargeButton({ text: '완료' });
    this.doneButton.y = 70;
    this.doneButton.onPress.connect(this.handleDoneButton);
    this.panel.addChild(this.doneButton);
  }

  public handleDoneButton = async () => {
    try {
      const gameStats = storage.getObject('game-stats');
      if (!gameStats) throw new Error('게임 세션을 찾을 수 없습니다.');

      const data = await gameResume(gameStats.sessionId);
      storage.setObject('game-stats', { ...data });
      navigation.dismissPopup();
    } catch (error) {
      eventEmitter.emit('error', error);
    }
  };

  /** 창 크기가 변경될 때마다 호출되는 팝업 크기 조정 */
  public resize(width: number, height: number) {
    this.bg.width = width;
    this.bg.height = height;
    this.panel.x = width * 0.5;
    this.panel.y = height * 0.5;
  }

  /** 팝업을 애니메이션과 함께 표시 */
  public async show() {
    if (navigation.currentScreen) {
      navigation.currentScreen.filters = [new BlurFilter({ strength: 5 })];
    }
    gsap.killTweensOf(this.bg);
    gsap.killTweensOf(this.panel.pivot);
    this.bg.alpha = 0;
    this.panel.pivot.y = -400;
    gsap.to(this.bg, { alpha: 0.8, duration: 0.2, ease: 'linear' });
    await gsap.to(this.panel.pivot, { y: 0, duration: 0.3, ease: 'back.out' });

    try {
      const gameStats = storage.getObject('game-stats');
      if (!gameStats) throw new Error('세션을 찾을 수 없습니다.');
      const data = await gamePause(gameStats.sessionId);
      storage.setObject('game-stats', { ...data });
    } catch (error) {
      eventEmitter.emit('error', error);
    }
  }

  /** 팝업을 애니메이션과 함께 해제 */
  public async hide() {
    if (navigation.currentScreen) {
      navigation.currentScreen.filters = [];
    }
    gsap.killTweensOf(this.bg);
    gsap.killTweensOf(this.panel.pivot);
    gsap.to(this.bg, { alpha: 0, duration: 0.2, ease: 'linear' });
    await gsap.to(this.panel.pivot, {
      y: -500,
      duration: 0.3,
      ease: 'back.in',
    });
  }
}