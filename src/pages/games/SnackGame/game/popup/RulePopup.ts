import { t } from 'i18next';
import { Sprite, Text } from 'pixi.js';

import { BasePopup } from './BasePopup';
import { SnackgameApplication } from '../screen/SnackgameApplication';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';

/** LobbyScreen에서 도움말을 클릭했을 때 표시되는 팝업 */
export class RulePopup extends BasePopup {
  private matchImage: Sprite;
  private ruleText: Text;
  private doneButton: LargeButton;

  constructor(app: SnackgameApplication) {
    super(app, {
      panelHeight: 480,
      title: t('rule', { ns: 'game' }),
    });

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

  public async handleDoneButton() {
    this.app.dismissPopup();
  }
}
