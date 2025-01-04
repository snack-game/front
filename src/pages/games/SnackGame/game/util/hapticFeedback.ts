import { userSettings } from './userSetting';

type HapticMethod =
  | 'notificationSuccess'
  | 'notificationError'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy';

export const HapticFeedback = {
  async invoke(method: HapticMethod) {
    const isHapticEnabled = userSettings.getHapticEnabled() ?? true;
    if (!isHapticEnabled) return;

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'snackgame-haptic-feedback',
        method,
      }),
    );
  },
};
