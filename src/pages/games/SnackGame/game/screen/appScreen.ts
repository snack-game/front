import { Container, Rectangle, Ticker } from "pixi.js";

import { SnackgameApplication } from "./SnackgameApplication";

export interface AppScreen extends Container {
    onPrepare(screen: Rectangle): Promise<void>;
    onShow(screen: Rectangle): Promise<void>;
    onHide(screen: Rectangle): Promise<void>;
    onResize(screen: Rectangle): void;
    onPause?(): Promise<void>;
    /** 화면을 일시 정지 */
    pause?(): Promise<void>;
    /** 화면을 재개 */
    resume?(): Promise<void>;
    /** 숨겨진 후 화면 재설정 */
    reset?(): void;
    /** 화면 업데이트, 델타 시간/단계 전달 */
    update?(time: Ticker): void;
    /** 화면에 포커스 */
    focus?(): void;
  }
  
  export interface AppScreenConstructor {
    new (app: SnackgameApplication, ...args: any[]): AppScreen; // TODO: app을 navigation으로 대체
    assetBundles?: string[];
  }