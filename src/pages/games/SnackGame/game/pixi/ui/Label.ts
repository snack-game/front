import { TextStyleOptions, Text, TextStyle } from 'pixi.js';

const defaultLabelStyle: Partial<TextStyleOptions> = {
  fontFamily: 'DovemayoGothic',
  align: 'center',
};

export type LabelOptions = typeof defaultLabelStyle;

/**
 * 간단한 라벨 UI
 */
export class Label extends Text {
  constructor(
    text?: string | number,
    style?: Partial<TextStyleOptions> | TextStyle,
  ) {
    style = { ...defaultLabelStyle, ...style };
    super({ text, style });

    // 라벨은 항상 가운데 정렬
    this.anchor.set(0.5);
  }
}
