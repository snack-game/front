import { Container, NineSliceSprite, Texture } from 'pixi.js';

const defaultRoundedBoxOptions = {
  color: 0xffffff,
  width: 350,
  height: 600,
  shadow: true,
  shadowColor: 0xf4e0c5,
  shadowOffset: 22,
};

export type RoundedBoxOptions = typeof defaultRoundedBoxOptions;

/**
 * 자유롭게 크기를 조절할 수 있는 nine-sliced 스프라이트를 기반으로 한 일반적인 둥근 상자.
 */
export class RoundedBox extends Container {
  /** 둥근 모서리를 왜곡하지 않고 크기를 조정할 수 있는 직사각형 영역 */
  private image: NineSliceSprite;
  /** 상자 이미지와 일치하는 선택적 그림자, y 오프셋 포함 */
  private shadow?: NineSliceSprite;

  constructor(options: Partial<RoundedBoxOptions> = {}) {
    super();
    const opts = { ...defaultRoundedBoxOptions, ...options };
    this.image = new NineSliceSprite({
      texture: Texture.from('rounded-rectangle'),
      leftWidth: 34,
      rightWidth: 34,
      topHeight: 34,
      bottomHeight: 34,
    });
    this.image.width = opts.width;
    this.image.height = opts.height;
    this.image.tint = opts.color;
    this.image.x = -this.image.width * 0.5;
    this.image.y = -this.image.height * 0.5;
    this.addChild(this.image);

    if (opts.shadow) {
      this.shadow = new NineSliceSprite({
        texture: Texture.from('rounded-rectangle'),
        leftWidth: 34,
        rightWidth: 34,
        topHeight: 34,
        bottomHeight: 34,
      });
      this.shadow.width = opts.width;
      this.shadow.height = opts.height;
      this.shadow.tint = opts.shadowColor;
      this.shadow.x = -this.shadow.width * 0.5;
      this.shadow.y = -this.shadow.height * 0.5 + opts.shadowOffset;
      this.addChildAt(this.shadow, 0);
    }
  }

  /** 그림자를 제외한 기본 너비 가져오기 */
  public get boxWidth() {
    return this.image.width;
  }

  /** 그림자를 제외한 기본 높이 가져오기 */
  public get boxHeight() {
    return this.image.height;
  }
}
