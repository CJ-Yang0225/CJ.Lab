const mouse = {
  x: 0,
  y: 0,
};

class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.dx = Math.random() * 3 - 1.5;
    this.dy = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x as number, this.y as number, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function renderParticles(canvas: HTMLCanvasElement) {
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d")!;
  const particles: Particle[] = [];

  const init = () => {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(ctx));
    }
  };

  const handleParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update();

      if (particles[i].size <= 0.3) {
        particles.splice(i, 1);
        i--;
      }
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(ctx));
    }
  };

  let animationFrameId: ReturnType<typeof requestAnimationFrame>;
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    animationFrameId = requestAnimationFrame(render);
  };

  render();

  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    cancelAnimationFrame(animationFrameId);
    removeEventListener("mousemove", handleMouseMove);
  };
}
