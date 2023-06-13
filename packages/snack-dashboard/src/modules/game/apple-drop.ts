export class AppleDrop {
  private units: any[];
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastTime: number;
  private image: HTMLImageElement;
  private settings = {
    unitMaximum: 20,
    radius: 15,
    gravity: 0.1,
    corFactor: 0.5,
    mass: 1,
    creationFactor: 0.02,
  };

  constructor(canvas: HTMLCanvasElement, src: string) {
    this.units = [];
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.lastTime = new Date().getTime();
    this.image = new Image();
    this.image.src = src;
  }

  public init(): void {
    window.onresize = () => {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.canvas.width = width;
      this.canvas.height = height;
    };

    window.onresize(new UIEvent('resize'));
  }

  public addUnit(settings: any): boolean {
    if (this.units.length >= this.settings.unitMaximum) {
      return false;
    }

    settings.radius = this.settings.radius;
    settings.mass =
      (Math.random() * this.settings.mass) / 2 + (this.settings.mass / 4) * 3;
    settings.bounceCount = 0;

    settings.velocity = {
      x: Math.random() * 4 - 2,
      y: 0,
    };

    this.units.push(settings);
    return true;
  }

  private getVelocity(unit1: any, unit2: any): any {
    return {
      x:
        ((unit1.mass - unit2.mass * this.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit1.velocity.x +
        ((unit2.mass + unit2.mass * this.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit2.velocity.x,
      y:
        ((unit1.mass - unit2.mass * this.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit1.velocity.y +
        ((unit2.mass + unit2.mass * this.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit2.velocity.y,
    };
  }

  public update(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.units.length < this.settings.unitMaximum) {
      if (Math.random() <= this.settings.creationFactor) {
        this.addUnit({
          x: this.canvas.width * Math.random(),
          y: this.canvas.height,
        });
      }
    }

    for (let idx in this.units) {
      this.units[idx].cals = false;
    }

    for (let idx in this.units) {
      let collapsed = false;

      const unit = this.units[idx];
      const afterUnitPosition = {
        x: unit.x + unit.velocity.x,
        y: unit.y - unit.velocity.y,
      };

      if (unit.cals === false) {
        for (let key in this.units) {
          if (key === idx) {
            continue;
          }

          const item = this.units[key];
          const afterItemPosition = {
            x: item.x + item.velocity.x,
            y: item.y - item.velocity.y,
          };

          const distanceUnits = Math.sqrt(
            Math.pow(afterItemPosition.x - afterUnitPosition.x, 2) +
              Math.pow(afterItemPosition.y - afterUnitPosition.y, 2)
          );
          const sumRadius = item.radius + unit.radius;

          if (distanceUnits < sumRadius) {
            collapsed = true;

            const afterVelocity1 = this.getVelocity(unit, item);
            const afterVelocity2 = this.getVelocity(item, unit);

            unit.velocity.x = afterVelocity1.x;
            unit.velocity.y = afterVelocity1.y;
            item.velocity.x = afterVelocity2.x;
            item.velocity.y = afterVelocity2.y;

            unit.cals = true;
            item.cals = true;

            break;
          }
        }
      }

      if (
        unit.x + unit.velocity.x <= 0 ||
        unit.x + unit.velocity.x + unit.radius >= this.canvas.width
      ) {
        collapsed = true;
        unit.velocity.x *= -1;
      }

      if (unit.y - unit.velocity.y < 0) {
        if (unit.bounceCount > 5) {
          this.units.splice(Number(idx), 1);
          continue;
        } else {
          collapsed = true;
          unit.velocity.y *= -this.settings.corFactor;
          unit.bounceCount += 1;
        }
      } else {
        unit.velocity.y += this.settings.gravity;
      }

      unit.x += unit.velocity.x;
      unit.y -= unit.velocity.y;

      let size = unit.radius * unit.mass;

      this.context.save();
      this.context.globalAlpha = Math.max(unit.opacity, 0);
      this.context.beginPath();
      this.context.arc(
        unit.x,
        this.canvas.height - unit.y,
        size,
        0,
        2 * Math.PI,
        false
      );
      this.context.closePath();
      this.context.clip();
      this.context.drawImage(
        this.image,
        unit.x - size,
        this.canvas.height - unit.y - size,
        size * 2,
        size * 2
      );
      this.context.restore();
    }

    window.requestAnimationFrame(() => {
      this.update.call(this);
    });
  }
}
