import gsap from 'gsap';
import { Container, Text } from 'pixi.js';

import { LargeButton } from '../ui/LargeButton';

export class LobbyScreen extends Container {
  public static assetBundles = ['common'];

  /** 기본 모드 시작 버튼 */
  private defaultModButton: LargeButton;
  /** 무한 모드 시작 버튼 */
  private infModButton: LargeButton;

  constructor() {
    super();

    this.defaultModButton = new LargeButton({ text: '기본 모드' });
    this.addChild(this.defaultModButton);

    this.infModButton = new LargeButton({ text: '무한 모드' });
    this.addChild(this.infModButton);
  }

  /** 화면 크기 변경 시 트리거 됩니다. */
  public resize(width: number, height: number) {
    this.defaultModButton.x = width * 0.5;
    this.defaultModButton.y = height * 0.6;
    this.defaultModButton.width = width * 0.5;
    this.defaultModButton.height = height * 0.1;

    this.infModButton.x = width * 0.5;
    this.infModButton.y = height * 0.75;
    this.infModButton.width = width * 0.5;
    this.infModButton.height = height * 0.1;
  }

  /** Screen 시작 시 보여지는 애니메이션 입니다. */
  public async show() {
    this.defaultModButton.hide(false);
    this.infModButton.hide(false);

    await this.defaultModButton.show();
    await this.infModButton.show();
  }
}
