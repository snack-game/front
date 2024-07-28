export const isApp = () => window.navigator.userAgent.includes('SnackgameApp');
export const isIOSApp = () => isApp() && window.navigator.userAgent.includes('(ios');
