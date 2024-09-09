import gsap from 'gsap';
import { t } from 'i18next';
import { Container, Rectangle, Sprite, Texture } from 'pixi.js';

import { AppScreen } from '../screen/appScreen';
import { SnackgameApplication } from '../screen/SnackgameApplication';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { RoundedBox } from '../ui/RoundedBox';

/** 게임 플레이가 일시 중지되었을 때 표시되는 팝업 */
export class PausePopup extends Container implements AppScreen {
  /** 현재 화면을 덮는 어두운 반투명 배경 */
  private bg: Sprite;
  private panel: Container;
  private title: Label;
  private panelBase: RoundedBox;
  private resumeButton: LargeButton;
  private endButton: LargeButton;

  constructor(
    private app: SnackgameApplication,
    private handleGameResume: () => Promise<void>,
    private handleGameEnd: () => Promise<void>,
  ) {
    super();

    this.bg = new Sprite(Texture.WHITE);
    this.bg.tint = 0xffedd5;
    this.bg.interactive = true;
    this.addChild(this.bg);

    this.panel = new Container();
    this.addChild(this.panel);

    this.panelBase = new RoundedBox({ height: 300 });
    this.panel.addChild(this.panelBase);

    this.title = new Label(t('pause', { ns: 'game' }), {
      fill: 0xf58529,
      fontSize: 50,
    });
    this.title.y = -80;
    this.panel.addChild(this.title);

    this.endButton = new LargeButton({ text: '■', width: 90, height: 90 });
    this.endButton.x = -100;
    this.endButton.y = 70;
    this.endButton.onPress.connect(this.handleEndButton);
    this.panel.addChild(this.endButton);

    this.resumeButton = new LargeButton({ text: '▶', width: 200, height: 90 });
    this.resumeButton.x = 50;
    this.resumeButton.y = 70;
    this.resumeButton.onPress.connect(this.handleResumeButton);
    this.panel.addChild(this.resumeButton);
  }

  async onPrepare(screen: Rectangle) {
    // no-op
  }

  public async handleEndButton() {
    try {
      await this.handleGameEnd();
    } catch (error) {
      this.app.setError(error);
    }
  }

  public async handleResumeButton() {
    try {
      await this.handleGameResume();
      this.app.dismissPopup();
    } catch (error) {
      this.app.setError(error);
    }
  }

  /** 창 크기가 변경될 때마다 호출되는 팝업 크기 조정 */
  public onResize({ width, height }: Rectangle) {
    this.bg.width = width;
    this.bg.height = height;
    this.panel.x = width * 0.5;
    this.panel.y = height * 0.5;
  }

  /** 팝업을 애니메이션과 함께 표시 */
  public async onShow({ width, height }: Rectangle) {
    gsap.killTweensOf(this.bg);
    gsap.killTweensOf(this.panel.pivot);
    this.bg.alpha = 0;
    this.panel.pivot.y = -400;
    gsap.to(this.bg, { alpha: 0.8, duration: 0.2, ease: 'linear' });
    await gsap.to(this.panel.pivot, { y: 0, duration: 0.3, ease: 'back.out' });
  }

  /** 팝업을 애니메이션과 함께 해제 */
  public async onHide({ width, height }: Rectangle) {
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
