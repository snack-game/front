import { Apple } from '@modules/game/apple';
import { Drag } from '@modules/game/drag';
import { Particle } from '@modules/game/particle';

export class GameRenderer {
  handleAppleRendering(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
    isDrawing: boolean,
    Apple: Apple,
  ) {
    Apple.inDragArea = false;
    this.drawApple(ctx, Apple);
    this.highlightBorder(
      ctx,
      isDrawing,
      startX,
      startY,
      currentX,
      currentY,
      Apple,
    );
  }

  drawApple(ctx: CanvasRenderingContext2D, Apple: Apple) {
    ctx.drawImage(
      Apple.image,
      Apple.position.x,
      Apple.position.y,
      Apple.radius * 2,
      Apple.radius * 2,
    );

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = `${Apple.radius}px Dovemayo_gothic`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      Apple.number.toString(),
      Apple.position.x + Apple.radius,
      Apple.position.y + Apple.radius + Apple.radius / 3,
    );
  }

  highlightBorder(
    ctx: CanvasRenderingContext2D,
    isDrawing: boolean,
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
    Apple: Apple,
  ) {
    if (isDrawing) {
      const centerX: number = Apple.position.x + Apple.radius;
      const centerY: number = Apple.position.y + Apple.radius;
      const x = Math.min(startX, currentX);
      const y = Math.min(startY, currentY);
      const width = Math.abs(startX - currentX);
      const height = Math.abs(startY - currentY);

      if (
        centerX >= x &&
        centerX <= x + width &&
        centerY >= y &&
        centerY <= y + height
      ) {
        Apple.inDragArea = true;

        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Apple.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }

  drawDragArea(drag: Drag, ctx: CanvasRenderingContext2D) {
    if (drag.isDrawing) {
      const width = drag.currentX - drag.startX;
      const height = drag.currentY - drag.startY;

      ctx.beginPath();
      ctx.rect(drag.startX, drag.startY, width, height);

      ctx.fillStyle = 'rgba(248, 114, 114, 0.3)';
      ctx.fill();

      ctx.strokeStyle = 'rgba(248, 114, 114, 1)';
      ctx.stroke();

      ctx.stroke();
    }
  }

  drawParticle(particle: Particle, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#F96464';
    ctx.strokeStyle = '#F96464';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
