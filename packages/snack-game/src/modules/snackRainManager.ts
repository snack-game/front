import AppleImage from '@assets/images/apple.png';
import CandyCaneImage from '@assets/images/candy-cane.png';
import CandyImage from '@assets/images/candy.png';
import ChocolateImage from '@assets/images/chocolate.png';
import CookieImage from '@assets/images/cookie.png';
import JellyImage from '@assets/images/jelly.png';
import OrangeImage from '@assets/images/orange.png';

interface Unit {
  x: number;
  y: number;
  radius: number;
  mass: number;
  bounceCount: number;
  velocity: {
    x: number;
    y: number;
  };
  cals: boolean;
  image: HTMLImageElement;
}

interface Settings {
  unitMaximum: number;
  radius: number;
  gravity: number;
  corFactor: number;
  mass: number;
  creationFactor: number;
}

export class SnackRainManager {
  private readonly units: Unit[];
  private settings: Settings;
  private images = [
    CandyImage,
    CandyCaneImage,
    AppleImage,
    OrangeImage,
    JellyImage,
    CookieImage,
    ChocolateImage,
  ];

  constructor() {
    this.units = [];
    this.settings = {
      unitMaximum: 8,
      radius: 15,
      gravity: 0.1,
      corFactor: 0.5,
      mass: 1,
      creationFactor: 0.02,
    };
  }

  addUnit(x: number, y: number): void {
    if (this.units.length >= this.settings.unitMaximum) {
      return;
    }

    const unit: Unit = {
      x: x,
      y: y,
      radius: this.settings.radius,
      mass:
        (Math.random() * this.settings.mass) / 2 + (this.settings.mass / 4) * 3,
      bounceCount: 0,
      velocity: {
        x: Math.random() * 4 - 2,
        y: 0,
      },
      cals: false,
      image: new Image(),
    };

    unit.image.src =
      this.images[Math.floor(Math.random() * this.images.length)];

    this.units.push(unit);
  }

  drawSnackRain(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ): void {
    if (this.units.length < this.settings.unitMaximum) {
      if (Math.random() <= this.settings.creationFactor) {
        this.addUnit(width * Math.random(), height);
      }
    }

    this.units.forEach((unit) => {
      unit.cals = false;
    });

    for (const idx in this.units) {
      let collapsed = false;

      const unit = this.units[idx];
      const afterUnitPosition = {
        x: unit.x + unit.velocity.x,
        y: unit.y - unit.velocity.y,
      };

      if (!unit.cals) {
        for (const key in this.units) {
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
              Math.pow(afterItemPosition.y - afterUnitPosition.y, 2),
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
        unit.x + unit.velocity.x + unit.radius >= width
      ) {
        unit.velocity.x *= -1;
      }

      if (unit.y - unit.velocity.y < 0) {
        if (unit.bounceCount > 5) {
          this.units.splice(Number(idx), 1);
          continue;
        } else {
          unit.velocity.y *= -this.settings.corFactor;
          unit.bounceCount += 1;
        }
      } else {
        unit.velocity.y += this.settings.gravity;
      }

      unit.x += unit.velocity.x;
      unit.y -= unit.velocity.y;

      const size = unit.radius * unit.mass;

      ctx.save();
      ctx.beginPath();
      ctx.arc(unit.x, height - unit.y, size + 5, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(
        unit.image,
        unit.x - size,
        height - unit.y - size,
        size * 2,
        size * 2,
      );
      ctx.restore();
    }
  }

  getVelocity(unit1: Unit, unit2: Unit) {
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
}
