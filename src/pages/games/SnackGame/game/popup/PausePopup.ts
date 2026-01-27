import { t } from 'i18next';

import { BasePopup } from './BasePopup';
import { SnackgameApplication } from '../screen/SnackgameApplication';
import { LargeButton } from '../ui/LargeButton';

/** 게임 플레이가 일시 중지되었을 때 표시되는 팝업 */
export class PausePopup extends BasePopup {
  private resumeButton: LargeButton;
  private endButton: LargeButton;

  constructor(
    app: SnackgameApplication,
    private handleGameResume: () => Promise<void>,
    private handleGameEnd: () => Promise<void>,
  ) {
    super(app, {
      panelHeight: 300,
      title: t('pause', { ns: 'game' }),
    });

    this.endButton = new LargeButton({ text: '■', width: 90, height: 90 });
    this.endButton.x = -100;
    this.endButton.y = 70;
    this.endButton.onPress.connect(this.handleEndButton.bind(this));
    this.panel.addChild(this.endButton);

    this.resumeButton = new LargeButton({ text: '▶', width: 200, height: 90 });
    this.resumeButton.x = 50;
    this.resumeButton.y = 70;
    this.resumeButton.onPress.connect(this.handleResumeButton.bind(this));
    this.panel.addChild(this.resumeButton);
  }

  private setButtonsEnabled(isEnabled: boolean) {
    this.endButton.enabled = isEnabled;
    this.resumeButton.enabled = isEnabled;
  }

  public async handleEndButton() {
    try {
      this.setButtonsEnabled(false);
      await this.handleGameEnd();
      this.setButtonsEnabled(true);
    } catch (error) {
      this.app.setError(error);
    }
  }

  public async handleResumeButton() {
    try {
      this.setButtonsEnabled(false);
      await this.handleGameResume();
      this.setButtonsEnabled(true);
      this.app.dismissPopup();
    } catch (error) {
      this.app.setError(error);
    }
  }
}
