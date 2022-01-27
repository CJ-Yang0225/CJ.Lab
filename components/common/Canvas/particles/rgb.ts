import { throttle } from "../../../../utils/helper";

const mouse = {
  x: 500,
  y: 400,
};
enum Mode {
  bubble,
  fadeOut,
}
let hue = 0;
let mode = Mode.bubble;

class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 20 + 1;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.color = `hsl(${hue}, 100%, 50%)`; // To keep color
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.3) this.size -= 0.1;
  }

  draw() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x as number, this.y as number, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function renderParticles(canvas: HTMLCanvasElement) {
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d")!;
  const particles: Particle[] = [];

  const fillParticles = () => {
    for (let i = 0; i < 4; i++) {
      particles.push(new Particle(ctx));
    }
  };

  const handleParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update();

      if (mode === Mode.bubble) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx ** 2 + dy ** 2);

          if (distance > 100 && distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      if (particles[i].size <= 0.3) {
        particles.splice(i, 1);
        i--;
      }
    }
  };

  let animationFrameId: ReturnType<typeof requestAnimationFrame>;
  const render = () => {
    switch (mode) {
      case Mode.bubble:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        break;

      case Mode.fadeOut:
        ctx.fillStyle = `rgba(0, 0, 0, 0.03)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;
    }

    handleParticles();
    hue += 3;
    hue %= 360;
    animationFrameId = requestAnimationFrame(render);
  };

  render();

  const handleModeSwitch = () => {
    mode++;
    mode %= 2;
  };

  const handleMouseMove = throttle((event: MouseEvent) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    fillParticles();
  }, 25);

  const handleTouchMove = throttle((event: TouchEvent) => {
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, 30);

  canvas.addEventListener("click", handleModeSwitch);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("touchmove", handleTouchMove);

  return () => {
    cancelAnimationFrame(animationFrameId);
    removeEventListener("click", handleModeSwitch);
    removeEventListener("mousemove", handleMouseMove);
    removeEventListener("touchmove", handleTouchMove);
  };
}
