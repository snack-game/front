import { newUserSettings } from './newUserSetting';
import { userSettings } from './userSetting';

type HapticMethod =
  | 'notificationSuccess'
  | 'notificationError'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy';

export const HapticFeedback = {
  async invoke(method: HapticMethod) {
    const isHapticEnabled = newUserSettings.getHapticEnabled();
    if (!isHapticEnabled) return;

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'snackgame-haptic-feedback',
        method,
      }),
    );
  },
};
