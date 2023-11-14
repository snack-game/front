import { Apple } from '@modules/apple-game/apple';
import { Particle } from '@modules/apple-game/particle';

const handleAppleRendering = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  currentX: number,
  currentY: number,
  isDrawing: boolean,
  Apple: Apple,
) => {
  Apple.inDragArea = false;
  drawApple(ctx, Apple);
  highlightBorder(ctx, isDrawing, startX, startY, currentX, currentY, Apple);
};

const drawApple = (ctx: CanvasRenderingContext2D, Apple: Apple) => {
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
};

const highlightBorder = (
  ctx: CanvasRenderingContext2D,
  isDrawing: boolean,
  startX: number,
  startY: number,
  currentX: number,
  currentY: number,
  Apple: Apple,
) => {
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
};

const drawDragArea = (
  ctx: CanvasRenderingContext2D,
  currentX: number,
  currentY: number,
  startX: number,
  startY: number,
) => {
  const width = currentX - startX;
  const height = currentY - startY;

  ctx.beginPath();
  ctx.rect(startX, startY, width, height);

  ctx.fillStyle = 'rgba(248, 114, 114, 0.3)';
  ctx.fill();

  ctx.strokeStyle = 'rgba(248, 114, 114, 1)';
  ctx.stroke();

  ctx.stroke();
};

const handleParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
) => {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw(ctx);
    if (particles[i].size <= 1) {
      particles.splice(i, 1);
      i--;
    }
  }
};

let ctx: CanvasRenderingContext2D;

const drawAppleGame = ({
  devicePixelRatio,
  drag,
  offsetWidth,
  offsetHeight,
  apples,
  removedApples,
}: any) => {
  ctx.scale(devicePixelRatio, devicePixelRatio);

  ctx.clearRect(0, 0, offsetWidth, offsetHeight);

  if (drag.isDrawing)
    drawDragArea(ctx, drag.currentX, drag.currentY, drag.startX, drag.startY);

  if (apples) {
    apples.forEach((apple: Apple) => {
      handleAppleRendering(
        ctx,
        drag.startX,
        drag.startY,
        drag.currentX,
        drag.currentY,
        drag.isDrawing,
        apple,
      );
    });
  }

  if (removedApples) {
    removedApples.forEach((removedApple: Apple) => {
      drawApple(ctx, removedApple);
    });
  }

  // if (particles) {
  //   handleParticles(ctx, particles);
  // }
};

onmessage = function (e) {
  const {
    offScreen,
    devicePixelRatio,
    drag,
    offsetWidth,
    offsetHeight,
    apples,
    removedApples,
    particles,
  } = e.data;

  if (offScreen) {
    ctx = offScreen.getContext('2d');
  }

  requestAnimationFrame(drawAndRotate);
};
