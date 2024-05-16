import gsap from 'gsap';
import { Container, Sprite, Texture } from 'pixi.js';

import { SnackGamePosition } from './SnackGameUtil';
import { Label } from '../ui/Label';
import {
  resolveAndKillTweens,
  pauseTweens,
  resumeTweens,
} from '../util/animation';

/** 스낵 기본 옵션 */
const defaultSnackOptions = {
  /** 텍스처 선택을 위한 스낵 이름 */
  name: '',
  /** 그리드 내부의 스낵 타입 */
  type: 0,
  /** 넓이와 높이 사이즈 */
  size: 50,
  /** 스낵 숫자 */
  snackNum: 0,
  /** Enable or disable its interactivity */
  interactive: false,
};

/** 조각 설정 매개변수 */
export type SnackOptions = typeof defaultSnackOptions;

export class Snack extends Container {
  /** 상호작용이 이루어지는 영역 */
  private readonly area: Sprite;
  /** 실제 표시되는 이미지 */
  private readonly image: Sprite;
  /** 비활성화, 사용 가능을 하이라이팅하기 위한 스프라이트 */
  private readonly highlight: Sprite;
  /** 스낵의 숫자를 표시하기 위한 Label */
  private numberLabel: Label;
  /** 애니메이션 중지 시 true */
  private paused = false;
  /** 스낵의 행 인덱스 */
  public row = 0;
  /** 스낵의 열 인덱스 */
  public column = 0;
  /** 그리드 내부의 스낵 타입 */
  public type = 0;
  /** 텍스처 선택을 위한 스낵 이름 */
  public name = '';
  /** 스낵이 가진 숫자 */
  public snackNum = 0;
  /** 스낵 선택 시 true */
  public isSelected = false;
  /** 선택 가능한 스낵인지 */
  public canSelect = true;

  /** Tap 시 SnackGameBoard에서 넘겨받은 callback을 트리거 합니다. */
  public onTap?: (position: SnackGamePosition) => void;

  constructor() {
    super();

    this.image = new Sprite();
    this.image.anchor.set(0.5);
    this.addChild(this.image);

    this.numberLabel = new Label(this.snackNum, {
      fill: 0xffffff,
      fontWeight: 'bold',
      align: 'center',
    });
    this.addChild(this.numberLabel);

    this.highlight = Sprite.from('highlight');
    this.highlight.anchor.set(0.5);
    this.addChild(this.highlight);

    this.area = new Sprite(Texture.WHITE);
    this.area.anchor.set(0.5);
    this.area.alpha = 0;
    this.addChild(this.area);

    this.area.on('pointerdown', this.onPointerDown);

    this.onRender = () => this.renderUpdate();
  }

  /**
   * 시각적 설정. 조각은 재사용될 수 있으며 다른 매개변수로 자유롭게 설정할 수 있습니다.
   * @param options 설정 옵션
   */
  public setup(options: Partial<SnackOptions> = {}) {
    const opts = { ...defaultSnackOptions, ...options };
    this.killTweens();
    this.snackNum = opts.snackNum;
    this.numberLabel.text = opts.snackNum;
    this.paused = false;
    this.isSelected = false;
    this.visible = false;
    this.alpha = 0;
    this.type = opts.type;
    this.name = opts.name;
    this.image.alpha = 1;
    this.scale.set(1);
    this.image.texture = Texture.from(opts.name);
    this.image.width = opts.size - 8;
    this.image.height = this.image.width;
    this.highlight.width = opts.size;
    this.highlight.height = opts.size;
    this.highlight.visible = false;
    this.area.width = opts.size;
    this.area.height = opts.size;
    this.area.cursor = 'pointer';
    this.area.interactive = opts.interactive;
    this.unlock();
  }

  /** 상호작용 마우스/터치 다운 핸들러 */
  private onPointerDown = () => {
    if (this.isLocked()) return;
    this.onTap?.({ row: this.row, column: this.column });
    this.highlight.visible = this.isSelected;
  };

  /** 팝 아웃 애니메이션 */
  public async animatePop() {
    this.lock();
    resolveAndKillTweens(this.image);
    const duration = 0.1;
    await gsap.to(this.image, { alpha: 0, duration, ease: 'sine.out' });
    this.visible = false;
  }

  /** 렌더링시 수행되는 함수 */
  public renderUpdate() {
    if (this.paused) return;
    this.highlight.visible = this.isSelected;

    if (!this.canSelect && !this.isSelected) {
      this.alpha = 0.5;
    } else {
      this.alpha = 1;
    }

    if (this.isSelected) {
      gsap.to(this, {
        rotation: 0.2,
        ease: 'elastic',
        duration: 0.5,
      });
    } else {
      gsap.to(this, {
        rotation: 0,
        ease: 'elastic',
        duration: 0.5,
      });
    }
  }

  /** 모든 현재 트윈 종료 및 제거 */
  private killTweens() {
    resolveAndKillTweens(this);
    resolveAndKillTweens(this.position);
    resolveAndKillTweens(this.scale);
    resolveAndKillTweens(this.image);
  }

  /** 모든 현재 트윈 일시 중지 */
  public pause() {
    this.paused = true;
    pauseTweens(this);
    pauseTweens(this.position);
    pauseTweens(this.scale);
    pauseTweens(this.image);
  }

  /** 대기 중인 트윈 재개 */
  public resume() {
    this.paused = false;
    resumeTweens(this);
    resumeTweens(this.position);
    resumeTweens(this.scale);
    resumeTweens(this.image);
  }

  /** 조각 상호작용 잠금, 마우스/터치 이벤트 방지 */
  public lock() {
    this.interactiveChildren = false;
    this.isSelected = false;
  }

  /** 조각 상호작용 잠금 해제, 마우스/터치 이벤트 방지 */
  public unlock() {
    this.interactiveChildren = true;
  }

  /** 조각이 잠겨 있는지 확인 */
  public isLocked() {
    return !this.interactiveChildren;
  }

  /** 조각의 그리드 위치를 가져오는 바로가기 */
  public getGridPosition() {
    return { row: this.row, column: this.column };
  }

  /** isSelected 조작 함수 */
  public setIsSelected(selected: boolean) {
    this.isSelected = selected;
  }

  /** cansSelect 조작 함수 */
  public setCanSelect(canSelect: boolean) {
    this.canSelect = canSelect;
  }
}
