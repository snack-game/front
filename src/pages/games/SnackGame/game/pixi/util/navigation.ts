import { Container, Ticker } from 'pixi.js';

import { areBundlesLoaded, loadBundles } from './assets';
import { pool } from './pool';
import { app } from '../SnackGameBase';

/** 앱 화면 인터페이스 */
interface AppScreen extends Container {
  /** 화면을 표시 */
  show?(): Promise<void>;
  /** 화면을 숨김 */
  hide?(): Promise<void>;
  /** 화면을 일시 정지 */
  pause?(): Promise<void>;
  /** 화면을 재개 */
  resume?(): Promise<void>;
  /** 표시하기 전 화면 준비 */
  prepare?(): void;
  /** 숨겨진 후 화면 재설정 */
  reset?(): void;
  /** 화면 업데이트, 델타 시간/단계 전달 */
  update?(time: Ticker): void;
  /** 화면 크기 조정 */
  resize?(width: number, height: number): void;
  /** 화면 흐리게 하기 */
  blur?(): void;
  /** 화면에 포커스 */
  focus?(): void;
}

/** 앱 화면 생성자 인터페이스 */
interface AppScreenConstructor {
  new (): AppScreen;
  /** 화면에 필요한 에셋 번들 목록 */
  assetBundles?: string[];
}

class Navigation {
  /** 화면 컨테이너 */
  public container = new Container();

  /** 애플리케이션 너비 */
  public width = 0;

  /** 애플리케이션 높이 */
  public height = 0;

  /** 모든 화면에 대한 상수 배경 뷰 */
  public background?: AppScreen;

  /** 현재 표시되고 있는 화면 */
  public currentScreen?: AppScreen;

  /** 현재 표시되고 있는 팝업 */
  public currentPopup?: AppScreen;

  /** 기본 로드 화면 설정 */
  public setBackground(ctor: AppScreenConstructor) {
    this.background = new ctor();
    this.addAndShowScreen(this.background);
  }

  /** 화면을 무대에 추가하고, 업데이트 & 크기 조정 함수 연결 */
  private async addAndShowScreen(screen: AppScreen) {
    // 부모가 없으면 네비게이션 컨테이너를 무대에 추가
    if (!this.container.parent) {
      app.stage.addChild(this.container);
    }

    // 화면을 무대에 추가
    this.container.addChild(screen);

    // 표시하기 전에 화면을 설정하고 준비
    if (screen.prepare) {
      screen.prepare();
    }

    // 사용 가능하다면 화면의 크기 조정 핸들러 추가
    if (screen.resize) {
      // 처음 크기 조정 실행
      screen.resize(this.width, this.height);
    }

    // 사용 가능하다면 업데이트 함수 추가
    if (screen.update) {
      app.ticker.add(screen.update, screen);
    }

    // 새 화면 표시
    if (screen.show) {
      screen.interactiveChildren = false;
      await screen.show();
      screen.interactiveChildren = true;
    }
  }

  /** 화면을 무대에서 제거하고, 업데이트 & 크기 조정 함수 연결 해제 */
  private async hideAndRemoveScreen(screen: AppScreen) {
    // 화면에서 상호작용 방지
    screen.interactiveChildren = false;

    // 숨김 메서드가 있으면 실행
    if (screen.hide) {
      await screen.hide();
    }

    // 업데이트 함수 연결 해제, 메서드가 있으면 실행
    if (screen.update) {
      app.ticker.remove(screen.update, screen);
    }

    // 부모가 있으면 부모에서 화면 제거
    if (screen.parent) {
      screen.parent.removeChild(screen);
    }

    // 화면 정리하여 나중에 다시 사용 가능하도록 함
    if (screen.reset) {
      screen.reset();
    }
  }

  /**
   * 현재 화면을 숨기고 새 화면을 표시.
   * AppScreen 인터페이스에 맞는 모든 클래스를 여기서 사용할 수 있음.
   */
  public async showScreen(ctor: AppScreenConstructor) {
    // 현재 화면의 상호작용 차단
    if (this.currentScreen) {
      this.currentScreen.interactiveChildren = false;
    }

    // 새 화면에 필요한 에셋 로드, 필요하다면
    if (ctor.assetBundles && !areBundlesLoaded(ctor.assetBundles)) {
      // 새 화면에 필요한 모든 에셋 로드
      await loadBundles(ctor.assetBundles);
    }

    // 이미 생성된 화면이 있다면 숨기고 제거
    if (this.currentScreen) {
      await this.hideAndRemoveScreen(this.currentScreen);
    }

    // 새 화면 생성하고 무대에 추가
    this.currentScreen = pool.get(ctor);
    await this.addAndShowScreen(this.currentScreen);
  }

  /**
   * 화면 크기 조정
   * @param width 뷰포트 너비
   * @param height 뷰포트 높이
   */
  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.currentScreen?.resize?.(width, height);
    this.currentPopup?.resize?.(width, height);
    this.background?.resize?.(width, height);
  }

  /**
   * 현재 화면 위에 팝업 표시
   */
  public async presentPopup(ctor: AppScreenConstructor) {
    if (this.currentScreen) {
      this.currentScreen.interactiveChildren = false;
      await this.currentScreen.pause?.();
    }

    if (this.currentPopup) {
      await this.hideAndRemoveScreen(this.currentPopup);
    }

    this.currentPopup = new ctor();
    await this.addAndShowScreen(this.currentPopup);
  }

  /**
   * 현재 팝업 닫기, 팝업이 있을 경우
   */
  public async dismissPopup() {
    if (!this.currentPopup) return;
    const popup = this.currentPopup;
    this.currentPopup = undefined;
    await this.hideAndRemoveScreen(popup);
    if (this.currentScreen) {
      this.currentScreen.interactiveChildren = true;
      this.currentScreen.resume?.();
    }
  }

  /**
   * 포커스를 잃었을 때 화면 흐리게 하기
   */
  public blur() {
    this.currentScreen?.blur?.();
    this.currentPopup?.blur?.();
    this.background?.blur?.();
  }

  /**
   * 화면에 포커스 주기
   */
  public focus() {
    this.currentScreen?.focus?.();
    this.currentPopup?.focus?.();
    this.background?.focus?.();
  }
}

/** 공유 네비게이션 인스턴스 */
export const navigation = new Navigation();
