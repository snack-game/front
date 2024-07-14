import gsap from 'gsap';
import { Container, Sprite, Texture, Ticker } from 'pixi.js';

import { randomRange } from '../util/random';

const defaultCloudOptions = {
  width: 130,
  height: 10,
  color: 0xffffff,
  circleSize: 40,
};

export type CloudOptions = typeof defaultCloudOptions;

/**
 * 게임의 다른 부분에서 재사용할 수 있는 원으로 구성된 구름 같은 애니메이션 컴포넌트
 */
export class Cloud extends Container {
  /** 구름 표시 설정 */
  private options: CloudOptions;
  /** 구름의 직사각형 영역 */
  private base: Sprite;
  /** 구름 원의 하단 컨테이너 */
  private bottom: Container;
  /** 구름 원의 상단 컨테이너 */
  private top: Container;
  /** 재사용할 수 있는 원 풀 */
  private circlesPool: CloudCircle[] = [];
  /** 현재 표시된 원들 */
  private circles: CloudCircle[] = [];

  constructor(options: Partial<CloudOptions> = {}) {
    super();

    this.options = { ...defaultCloudOptions, ...options };
    this.base = new Sprite(Texture.WHITE);
    this.base.tint = this.options.color;
    this.base.anchor.set(0.5);
    this.addChild(this.base);

    this.bottom = new Container();
    this.addChild(this.bottom);

    this.top = new Container();
    this.addChild(this.top);

    this.width = this.options.width;
    this.height = this.options.height;

    this.onRender = () => this.renderUpdate();
  }

  /** 구름의 너비를 눈에 보이는 영역이 아닌 기본에서 가져오기 */
  public get width() {
    return this.base.width;
  }

  /** 구름 기본 너비 설정, 눈에 보이는 영역은 조금 더 커짐 */
  public set width(value: number) {
    this.base.width = value;
    this.rebuildCircles();
  }

  /** 구름의 높이를 눈에 보이는 영역이 아닌 기본에서 가져오기 */
  public get height() {
    return this.base.height;
  }

  /** 구름 기본 높이 설정, 눈에 보이는 영역은 조금 더 커짐 */
  public set height(value: number) {
    this.base.height = value;
    this.top.y = -value * 0.5;
    this.bottom.y = value * 0.5;
  }

  /** 구름 원 생성 */
  private getCircle() {
    let circle = this.circlesPool.pop();
    if (!circle) {
      circle = new CloudCircle();
      circle.tint = this.options.color;
    }
    circle.step = Math.random() * 100;
    circle.speed = Math.random() * 0.5 + 0.5;
    return circle;
  }

  /** 구름 원 삭제 */
  private releaseCircle(circle: CloudCircle) {
    if (!this.circlesPool.includes(circle)) {
      this.circlesPool.push(circle);
    }
  }

  /** 현재 기본 너비 및 높이에 따라 모든 원 재생성 */
  private rebuildCircles() {
    for (const circle of this.circles) {
      this.bottom.removeChild(circle);
      this.top.removeChild(circle);
      this.releaseCircle(circle);
    }
    this.circles.length = 0;
    this.fillCircles(this.bottom, this.base.width, this.options.circleSize);
    this.fillCircles(this.top, this.base.width, this.options.circleSize);
  }

  /** 주어진 너비에 따라 원을 균등하게 분포시켜 컨테이너 채우기 */
  private fillCircles(container: Container, width: number, circleSize: number) {
    const spacing = circleSize * 0.4;
    const numCircles = Math.ceil(width / spacing);
    const offset = ((numCircles - 1) * spacing) / 2;
    for (let i = 0; i < numCircles; i++) {
      const circle = this.getCircle();
      circle.x = spacing * i - offset;
      circle.size = circleSize;
      container.addChild(circle);
      this.circles.push(circle);
    }
  }

  /** 매 프레임마다 자동 업데이트 */
  public renderUpdate() {
    const delta = new Ticker().deltaTime;
    for (const circle of this.circles) {
      circle.update(delta);
    }
  }

  /** 원이 멀리서 나타나 구름을 형성하는 애니메이션 재생 */
  public async playFormAnimation(duration = 1) {
    const ease = 'expo.out';

    this.alpha = 0;
    gsap.to(this, { alpha: 1, duration: 0.1, ease: 'linear' });

    for (const circle of this.circles) {
      circle.pivot.x = randomRange(-200, 200);
      circle.pivot.y = randomRange(-200, 200);
      circle.scale.set(0);
      circle.alpha = 1;
      gsap.to(circle.scale, { x: 1, y: 1, duration, ease });
      gsap.to(circle.pivot, { x: 0, y: 0, duration, ease });
    }

    this.top.pivot.y = this.top.y;
    gsap.to(this.top.pivot, { y: 0, duration, ease });

    this.bottom.pivot.y = this.bottom.y;
    gsap.to(this.bottom.pivot, { y: 0, duration, ease });

    const width = this.base.width;
    const height = this.base.height;
    this.base.width = 0;
    this.base.height = 0;
    this.base.alpha = 0;
    gsap.to(this.base, { alpha: 1, duration, ease });
    await gsap.to(this.base, { width, height, duration, ease });
  }

  /** 원이 이동하며 흐려져서 구름을 해제하는 애니메이션 재생 */
  public async playDismissAnimation(duration = 1) {
    const ease = 'expo.in';
    for (const circle of this.circles) {
      gsap.to(circle.pivot, {
        x: randomRange(-500, 500),
        y: randomRange(-500, 500),
        duration,
        ease,
      });
      gsap.to(circle.scale, {
        x: 0.2,
        y: 0.2,
        duration,
        ease,
      });
      gsap.to(circle, {
        alpha: 0,
        duration,
        ease,
      });
    }
    gsap.to(this.base, { alpha: 0, duration: duration * 0.5, ease });
    await gsap.to(this.base, { duration: duration });
  }
}

/**
 * 각각 독립적으로 애니메이션 되는 구름 원
 */
class CloudCircle extends Container {
  public step = 0;
  public size = 100;
  public speed = 1;
  public image: Sprite;

  constructor() {
    super();
    this.image = Sprite.from('circle');
    this.image.anchor.set(0.5);
    this.addChild(this.image);
  }

  public update(delta: number) {
    this.step += delta * 0.1 * this.speed;
    const size = this.size + Math.sin(this.step) * this.size * 0.25;
    this.image.width = size;
    this.image.height = size;
  }

  public get tint() {
    return Number(this.image.tint);
  }

  public set tint(v: number) {
    this.image.tint = v;
  }
}
