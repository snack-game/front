import { List } from '@pixi/ui';
import { t } from 'i18next';
import { Rectangle } from 'pixi.js';

import { GAMEVERSION } from '@constants/common.constant';

import { BasePopup } from './BasePopup';
import { SnackgameApplication } from '../screen/SnackgameApplication';
import { Label } from '../ui/Label';
import { LargeButton } from '../ui/LargeButton';
import { Switch } from '../ui/Switch';
import { VolumeSlider } from '../ui/VolumeSlider';
import { userSettings } from '../util/userSetting';

/** 볼륨 설정을 위한 팝업 */
export class SettingsPopup extends BasePopup {
  /** 팝업을 닫는 버튼 */
  private doneButton: LargeButton;
  /** 게임 빌드 버전 레이블 */
  private versionLabel: Label;
  /** UI 구성 요소를 정리하는 레이아웃 */
  private layout: List;
  /** 마스터 볼륨을 변경하는 슬라이더 */
  private masterSlider: VolumeSlider;
  /** 배경 음악 볼륨을 변경하는 슬라이더 */
  private bgmSlider: VolumeSlider;
  /** 효과음 볼륨을 변경하는 슬라이더 */
  private sfxSlider: VolumeSlider;
  /** 햅틱 활성화 여부를 변경하는 스위치 */
  private hapticCheckBox: Switch;

  constructor(
    app: SnackgameApplication,
    private handleGameResume: () => Promise<void>,
  ) {
    super(app, {
      panelHeight: 600,
      title: t('setting', { ns: 'game' }),
    });

    this.doneButton = new LargeButton({ text: t('confirm', { ns: 'game' }) });
    this.doneButton.y = this.panelBase.boxHeight * 0.5 - 78;
    this.doneButton.onPress.connect(this.handleDoneButton.bind(this));
    this.panel.addChild(this.doneButton);

    this.versionLabel = new Label(
      `${t('version', { ns: 'game' })} ${GAMEVERSION}`,
      {
        fill: 0xfb923c,
        fontSize: 12,
      },
    );
    this.versionLabel.alpha = 0.5;
    this.versionLabel.y = this.panelBase.boxHeight * 0.5 - 15;
    this.panel.addChild(this.versionLabel);

    this.layout = new List({ type: 'vertical', elementsMargin: 4 });
    this.layout.x = -140;
    this.layout.y = -160;
    this.panel.addChild(this.layout);

    this.masterSlider = new VolumeSlider(t('master_volume', { ns: 'game' }));
    this.masterSlider.onUpdate.connect((v) => {
      userSettings.setMasterVolume(v / 100);
    });
    this.layout.addChild(this.masterSlider);

    this.bgmSlider = new VolumeSlider(t('bgm_volume', { ns: 'game' }));
    this.bgmSlider.onUpdate.connect((v) => {
      userSettings.setBgmVolume(v / 100);
    });
    this.layout.addChild(this.bgmSlider);

    this.sfxSlider = new VolumeSlider(t('sfx_volume', { ns: 'game' }));
    this.sfxSlider.onUpdate.connect((v) => {
      userSettings.setSfxVolume(v / 100);
    });
    this.layout.addChild(this.sfxSlider);

    this.hapticCheckBox = new Switch(t('haptic', { ns: 'game' }));
    this.hapticCheckBox.x = 77;
    this.hapticCheckBox.y = 10;
    this.hapticCheckBox.onCheck.connect((v) => {
      userSettings.setHapticEnabled(v);
    });
    this.panel.addChild(this.hapticCheckBox);
  }

  public async handleDoneButton() {
    try {
      await this.handleGameResume();
      this.app.dismissPopup();
    } catch (error) {
      this.app.setError(error);
    }
  }

  /** 팝업을 표시하기 직전에 설정 */
  public override async onPrepare(screen: Rectangle) {
    this.masterSlider.value = userSettings.getMasterVolume() * 100;
    this.bgmSlider.value = userSettings.getBgmVolume() * 100;
    this.sfxSlider.value = userSettings.getSfxVolume() * 100;
    this.hapticCheckBox.checked = userSettings.getHapticEnabled();
  }
}
