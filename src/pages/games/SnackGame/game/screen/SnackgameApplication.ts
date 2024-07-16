import { Application, ApplicationOptions, BlurFilter } from 'pixi.js';

import { AppScreen, AppScreenConstructor } from './appScreen';
import { AppScreenPool } from './appScreenPool';

export class SnackgameApplication extends Application {
  private _currentAppScreen?: AppScreen;
  private _currentPopup?: AppScreen;

  get currentAppScreen(): AppScreen | undefined {
    return this._currentAppScreen;
  }
  private set currentAppScreen(appScreen: AppScreen) {
    this.stage.removeChildren();
    this._currentAppScreen = appScreen;
    this.stage.addChild(appScreen);
  }
  get currentPopup() {
    return this._currentPopup;
  }
  private set currentPopup(popup: AppScreen | undefined) {
    if (this.currentPopup) {
      this.stage.removeChild(this.currentPopup);
    }
    if (popup) {
      this.stage.addChild(popup);
    }
    this._currentPopup = popup;
  }

  constructor(
    public readonly appScreenPool: AppScreenPool,
    public setError: (error: any) => void = (error: any) => {
      console.warn('No setError yet for SnackgameApplication');
      console.log(error);
    },
  ) {
    super();
  }

  override async init(options?: Partial<ApplicationOptions>) {
    await super.init(options);
    this.renderer.on('resize', () => this.resizeChildren()); // TODO: delayed resize
  }

  onPause(): void {
    console.log('Application paused');
    this.currentAppScreen?.onPause?.();
  }

  public async show(ctor: AppScreenConstructor) {
    await this.showAppScreen(this.appScreenPool.get(ctor));
  }

  public async showAppScreen(appScreen: AppScreen) {
    if (this.currentAppScreen) {
      await this.hideAndReset(this.currentAppScreen);
    }
    this.currentAppScreen = appScreen;
    await this.prepareAndShow(appScreen);
  }

  /**
   * 현재 화면 위에 팝업 표시
   */
  public async presentPopup(ctor: AppScreenConstructor) {
    if (this.currentAppScreen) {
      this.currentAppScreen.interactiveChildren = false;
      this.currentAppScreen.filters = [new BlurFilter({ strength: 4 })];
    }
    if (this.currentPopup) {
      await this.hideAndReset(this.currentPopup);
    }

    const popup = this.appScreenPool.get(ctor);
    this.currentPopup = popup;
    await this.prepareAndShow(popup);
  }

  /**
   * 현재 팝업 닫기, 팝업이 있을 경우
   */
  public async dismissPopup() {
    if (!this.currentPopup) return;
    await this.hideAndReset(this.currentPopup);
    if (this.currentAppScreen) {
      this.currentAppScreen.interactiveChildren = true;
      this.currentAppScreen.onResume?.();
      this.currentAppScreen.filters = [];
    }
    this.currentPopup = undefined;
  }

  private async prepareAndShow(appScreen: AppScreen) {
    await appScreen.onPrepare(this.screen);
    appScreen.onResize(this.screen);

    if (appScreen.update) {
      this.ticker.add(appScreen.update, appScreen);
    }

    appScreen.interactiveChildren = false;
    await appScreen.onShow(this.screen);
    appScreen.interactiveChildren = true;
  }

  private async hideAndReset(appScreen: AppScreen) {
    appScreen.interactiveChildren = false;
    await appScreen.onHide(this.screen);

    // 업데이트 함수 연결 해제, 메서드가 있으면 실행
    if (appScreen.update) {
      this.ticker.remove(appScreen.update, appScreen);
    }

    // 화면 정리하여 나중에 다시 사용 가능하도록 함
    if (appScreen.reset) {
      appScreen.reset();
    }
  }

  private resizeChildren() {
    this.currentAppScreen?.onResize?.(this.screen);
    this.currentPopup?.onResize?.(this.screen);
  }
}
