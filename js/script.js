(function () {
  'use strict';


  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }


  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LEVELS = [-0.6, -0.1, 0.4, 0.9];

  const LINE_COLORS = ['#E8241A', '#1A4CE8', '#F5C800', '#2ECC40'];

  const STEP = 10;

  const LINE_WIDTH = 2;
  const LINE_ALPHA = 0.85;
  const TIME_INCREMENT = 0.004;

  let width = 0;
  let height = 0;
  let time = 0;
  let rafId = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function field(x, y, t) {
    return (
      Math.sin(x * 0.005 + t * 0.3) * Math.cos(y * 0.007 - t * 0.2) +
      Math.sin(x * 0.010 - y * 0.006 + t * 0.4) * 0.6 +
      Math.cos(x * 0.003 + y * 0.009 + t * 0.15) * 0.4
    );
  }

  function draw() {
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, width, height);

    const cols = Math.ceil(width / STEP) + 1;
    const rows = Math.ceil(height / STEP) + 1;

    const grid = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        grid[r][c] = field(c * STEP, r * STEP, time);
      }
    }

    ctx.lineWidth = LINE_WIDTH;
    ctx.globalAlpha = LINE_ALPHA;

    LEVELS.forEach(function (level, levelIndex) {
      ctx.beginPath();
      ctx.strokeStyle = LINE_COLORS[levelIndex % LINE_COLORS.length];

      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const x = c * STEP;
          const y = r * STEP;

          const topLeft = grid[r][c];
          const topRight = grid[r][c + 1];
          const bottomLeft = grid[r + 1][c];
          const bottomRight = grid[r + 1][c + 1];

          const points = [];

          if ((topLeft < level) !== (topRight < level)) {
            const f = (level - topLeft) / (topRight - topLeft);
            points.push([x + f * STEP, y]);
          }
          if ((topRight < level) !== (bottomRight < level)) {
            const f = (level - topRight) / (bottomRight - topRight);
            points.push([x + STEP, y + f * STEP]);
          }
          if ((bottomLeft < level) !== (bottomRight < level)) {
            const f = (level - bottomLeft) / (bottomRight - bottomLeft);
            points.push([x + f * STEP, y + STEP]);
          }
          if ((topLeft < level) !== (bottomLeft < level)) {
            const f = (level - topLeft) / (bottomLeft - topLeft);
            points.push([x, y + f * STEP]);
          }

          if (points.length === 2) {
            ctx.moveTo(points[0][0], points[0][1]);
            ctx.lineTo(points[1][0], points[1][1]);
          }
        }
      }

      ctx.stroke();
    });

    ctx.globalAlpha = 1;
  }

  function loop() {
    draw();
    time += TIME_INCREMENT;
    rafId = window.requestAnimationFrame(loop);
  }

  function handleVisibility() {
    if (document.hidden) {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    } else if (rafId === null && !prefersReducedMotion) {
      loop();
    }
  }

  window.addEventListener('resize', function () {
    resize();
    if (prefersReducedMotion) draw();
  });

  document.addEventListener('visibilitychange', handleVisibility);

  resize();

  if (prefersReducedMotion) {
    draw();
  } else {
    loop();
  }
})();