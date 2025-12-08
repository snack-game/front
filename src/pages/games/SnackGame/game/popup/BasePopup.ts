import gsap from 'gsap';
import { Container, Rectangle, Sprite, Texture } from 'pixi.js';

import { AppScreen } from '../screen/appScreen';
import { SnackgameApplication } from '../screen/SnackgameApplication';
import { Label } from '../ui/Label';
import { RoundedBox } from '../ui/RoundedBox';

export interface BasePopupOptions {
  /** 패널의 높이 */
  panelHeight: number;
  /** 팝업 제목 */
  title: string;
}

/** 모든 팝업의 공통 기능을 제공하는 기본 클래스 */
export abstract class BasePopup extends Container implements AppScreen {
  /** 현재 화면을 덮는 어두운 반투명 배경 */
  protected bg: Sprite;
  /** 팝업 UI 구성 요소를 위한 컨테이너 */
  protected panel: Container;
  protected panelBase: RoundedBox;
  /** 팝업 제목 */
  protected title: Label;
  /** 스낵게임 애플리케이션 인스턴스 */
  protected app: SnackgameApplication;

  constructor(app: SnackgameApplication, options: BasePopupOptions) {
    super();
    this.app = app;

    this.bg = new Sprite(Texture.WHITE);
    this.bg.tint = 0xffedd5;
    this.bg.interactive = true;
    this.addChild(this.bg);

    this.panel = new Container();
    this.addChild(this.panel);

    this.panelBase = new RoundedBox({ height: options.panelHeight });
    this.panel.addChild(this.panelBase);

    this.title = new Label(options.title, {
      fill: 0xf58529,
      fontSize: 50,
    });
    this.title.y = -this.panelBase.boxHeight * 0.5 + 60;

    this.panel.addChild(this.title);
  }

  /** 팝업을 표시하기 직전에 설정 */
  async onPrepare(screen: Rectangle) {
    // no-op: 자식 클래스에서 필요시 오버라이드
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
