export const HapticFeedback = {
    async invokeNotificationSuccess() {
        window.ReactNativeWebView?.postMessage(JSON.stringify(
            {
                "type": "snackgame-haptic-feedback",
                "method": "notificationSuccess"
            }
        ));
    },
    async invokeImpactLight() {
        window.ReactNativeWebView?.postMessage(JSON.stringify(
            {
                "type": "snackgame-haptic-feedback",
                "method": "impactLight"
            }
        ));
    },
    async invokeImpactMedium() {
        window.ReactNativeWebView?.postMessage(JSON.stringify(
            {
                "type": "snackgame-haptic-feedback",
                "method": "impactMedium"
            }
        ));
    },
    async invokeImpactHeavy() {
        window.ReactNativeWebView?.postMessage(JSON.stringify(
            {
                "type": "snackgame-haptic-feedback",
                "method": "impactHeavy"
            }
        ));
    },
    async invokeNotificationError() {
        window.ReactNativeWebView?.postMessage(JSON.stringify(
            {
                "type": "snackgame-haptic-feedback",
                "method": "notificationError"
            }
        ));
    }
};