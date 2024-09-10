import gsap from 'gsap';
import { t } from 'i18next';
import { Container, Rectangle, Sprite, Text, Texture } from 'pixi.js';

import { AppScreen } from '../screen/appScreen';
import { SnackgameApplication } from '../screen/SnackgameApplication';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { RoundedBox } from '../ui/RoundedBox';

/** LobbyScreen에서 도움말을 클릭했을 때 표시되는 팝업 */
export class RulePopup extends Container implements AppScreen {
  private bg: Sprite;
  private panel: Container;
  private title: Label;
  private panelBase: RoundedBox;
  private matchImage: Sprite;
  private ruleText: Text;
  private doneButton: LargeButton;

  constructor(private app: SnackgameApplication) {
    super();

    this.bg = new Sprite(Texture.WHITE);
    this.bg.tint = 0xffedd5;
    this.bg.interactive = true;
    this.addChild(this.bg);

    this.panel = new Container();
    this.addChild(this.panel);

    this.panelBase = new RoundedBox({ height: 480 });
    this.panel.addChild(this.panelBase);

    this.title = new Label(t('rule', { ns: 'game' }), {
      fill: 0xf58529,
      fontSize: 50,
    });
    this.title.y = -this.panelBase.boxHeight * 0.5 + 60;
    this.panel.addChild(this.title);

    this.matchImage = Sprite.from('match');
    this.matchImage.anchor.set(0.5);
    this.matchImage.y = -this.panelBase.boxHeight * 0.5 + 155;
    this.panel.addChild(this.matchImage);

    this.ruleText = new Label(t('rule_text', { ns: 'game' }), {
      fill: 0x482e19,
      fontSize: 18,
      lineHeight: 36,
    });
    this.ruleText.y = -this.panelBase.boxHeight * 0.5 + 275;
    this.panel.addChild(this.ruleText);

    this.doneButton = new LargeButton({ text: t('confirm', { ns: 'game' }) });
    this.doneButton.y = this.panelBase.boxHeight * 0.5 - 80;
    this.doneButton.onPress.connect(this.handleDoneButton.bind(this));
    this.panel.addChild(this.doneButton);
  }

  async onPrepare(screen: Rectangle) {
    // no-op
  }

  public async handleDoneButton() {
    this.app.dismissPopup();
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
