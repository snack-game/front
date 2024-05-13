import { Container, Graphics, Texture, Sprite } from 'pixi.js';

export class Waves extends Container {
  private waves: Wave[] = [];

  constructor() {
    super();

    const colors = [0xdb7b2d, 0xfb923c, 0xffedd5];

    for (const color of colors) {
      const wave = new Wave(color);
      this.waves.push(wave);
      this.addChild(wave);
    }
  }

  public set width(value: number) {
    for (const wave of this.waves) {
      wave.width = value;
    }
  }

  public set height(value: number) {
    for (const wave of this.waves) {
      wave.height = value;
    }
  }
}

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

  public rebuildPoints() {
    this.base.width = this.width;
    this.base.height = this.height;

    this.centerY = this.height / 2;

    this.gap = this.width / (this.maxPoints - 1);

    for (const circle of this.points) {
      this.removeChild(circle);
    }

    for (let i = 0; i < this.maxPoints; i++) {
      const point = new Point(this.gap * i, this.centerY);
      this.addChild(point);
      this.points.push(point);
    }
  }

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

      point.update();
    }
    this.wave.lineTo(prevX, prevY);
    this.wave.lineTo(this.width, this.height);
    this.wave.lineTo(0, this.height);
    this.wave.lineTo(this.points[0].x, this.points[0].y);
    this.wave.fill({ alpha: 0.5, color: this.color });
    this.wave.closePath;
  }
}

class Point extends Graphics {
  private speed: number;
  private cur: number;
  private max: number;
  private fieldY: number;

  constructor(x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
    this.fieldY = y; // 기본 Y 중심
    this.speed = 0.1;
    this.cur = 0;
    this.max = Math.random() * 30 + 20;
  }

  public update() {
    this.cur += this.speed;
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}
