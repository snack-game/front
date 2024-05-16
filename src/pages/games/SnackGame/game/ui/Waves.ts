import gsap from 'gsap';
import { Container, Graphics, Texture, Sprite } from 'pixi.js';

/** 여러 Wave를 렌더링할 수 있는 UI 입니다.  */
export class Waves extends Container {
  private waves: Wave[] = [];

  constructor(colors: number[]) {
    super();

    for (const color of colors) {
      const wave = new Wave(color);
      this.waves.push(wave);
      this.addChild(wave);
    }
  }

  // wave 들의 width 설정
  public set width(value: number) {
    for (const wave of this.waves) {
      wave.width = value;
    }
  }

  // wave 들의 hegith 설정
  public set height(value: number) {
    for (const wave of this.waves) {
      wave.height = value;
    }
  }
}

/** 단일 Wave UI 입니다.  */
export class Wave extends Container {
  private color: number;
  private base: Sprite;
  private wave: Graphics;
  private points: Point[] = [];
  private centerY = 0;
  private gap = 0;
  private maxPoints = 6;

  constructor(color: number) {
    super();

    this.color = color;

    this.base = new Sprite(Texture.EMPTY);
    this.addChild(this.base);

    this.wave = new Graphics();
    this.addChild(this.wave);

    this.onRender = () => this.renderUpdate();
  }

  public get width() {
    return this.base.width;
  }

  public set width(value: number) {
    this.base.width = value;
    this.rebuildPoints();
  }

  public get height() {
    return this.base.height;
  }

  public set height(value: number) {
    this.base.height = value;
  }

  /** Wave UI에 width가 설정되면 Point들의 렌더링 위치를 조정하고 추가합니다. */
  public rebuildPoints() {
    this.base.width = this.width;
    this.base.height = this.height;

    this.centerY = this.height / 2;

    this.gap = this.width / (this.maxPoints - 1);

    for (const circle of this.points) {
      this.removeChild(circle);
    }

    for (let i = 0; i < this.maxPoints; i++) {
      const point = new Point(this.gap * i, this.centerY, i);
      this.addChild(point);
      this.points.push(point);
    }

    for (const point of this.points) {
      point.update();
    }
  }

  /** 렌더링 함수 */
  public renderUpdate() {
    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    this.wave.clear();
    this.wave.beginPath();
    this.wave.moveTo(prevX, prevY);

    for (const point of this.points) {
      const cx = (prevX + point.x) / 2;
      const cy = (prevY + point.y) / 2;

      this.wave.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = point.x;
      prevY = point.y;
    }
    this.wave.lineTo(prevX, prevY);
    this.wave.lineTo(this.width, this.height);
    this.wave.lineTo(0, this.height);
    this.wave.lineTo(this.points[0].x, this.points[0].y);
    this.wave.fill({ alpha: 0.3, color: this.color });
    this.wave.closePath;
  }
}

/** 파도 효과를 위한 꼭지점 역할을 하는 요소입니다.  */
class Point extends Graphics {
  private delay: number;

  constructor(x: number, y: number, delay: number) {
    super();

    this.x = x;
    this.y = y;
    this.delay = delay;
  }

  public update() {
    gsap.to(this, {
      y: '+=20', // y 위치를 20만큼 아래로
      repeat: -1, // 무한 반복
      yoyo: true, // 다시 위로
      duration: 1 + Math.random(), // 랜덤한 지속시간으로 자연스러운 움직임 생성
      ease: 'sine.inOut', // Sine 웨이브 이징
      delay: this.delay * 0.1,
    });
  }
}
