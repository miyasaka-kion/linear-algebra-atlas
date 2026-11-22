export interface Vec2 {
  x: number;
  y: number;
}

export interface CanvasTransform {
  cx: number;
  cy: number;
  scale: number;
  toScreen: (x: number, y: number) => Vec2;
  toMath: (sx: number, sy: number) => Vec2;
}

export function createTransform(
  width: number,
  height: number,
  unitScale = 44
): CanvasTransform {
  const cx = width / 2;
  const cy = height / 2;
  const scale = unitScale;
  return {
    cx,
    cy,
    scale,
    toScreen: (x, y) => ({ x: cx + x * scale, y: cy - y * scale }),
    toMath: (sx, sy) => ({ x: (sx - cx) / scale, y: (cy - sy) / scale }),
  };
}

export function setupHiDPI(canvas: HTMLCanvasElement): {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
} | null {
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

export function drawBaseGrid(
  ctx: CanvasRenderingContext2D,
  tr: CanvasTransform,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#08080a';
  ctx.fillRect(0, 0, width, height);

  const rangeX = Math.ceil(width / (2 * tr.scale)) + 2;
  const rangeY = Math.ceil(height / (2 * tr.scale)) + 2;

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(239, 236, 228, 0.045)';
  ctx.beginPath();
  for (let i = -rangeX; i <= rangeX; i++) {
    const p1 = tr.toScreen(i, -rangeY);
    const p2 = tr.toScreen(i, rangeY);
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
  }
  for (let j = -rangeY; j <= rangeY; j++) {
    const p1 = tr.toScreen(-rangeX, j);
    const p2 = tr.toScreen(rangeX, j);
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
  }
  ctx.stroke();

  // Main axes
  ctx.strokeStyle = 'rgba(239, 236, 228, 0.14)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, tr.cy);
  ctx.lineTo(width, tr.cy);
  ctx.moveTo(tr.cx, 0);
  ctx.lineTo(tr.cx, height);
  ctx.stroke();
}

export function drawTransformedGrid(
  ctx: CanvasRenderingContext2D,
  tr: CanvasTransform,
  a11: number,
  a21: number,
  a12: number,
  a22: number,
  alpha = 0.22
) {
  const N = 8;
  ctx.save();
  ctx.lineWidth = 1;
  for (let i = -N; i <= N; i++) {
    const isAxis = i === 0;
    ctx.strokeStyle = isAxis
      ? `rgba(200, 131, 107, ${alpha * 1.9})`
      : `rgba(110, 149, 184, ${alpha})`;
    // Vertical grid line x = i
    const p1 = tr.toScreen(a11 * i - a12 * N, a21 * i - a22 * N);
    const p2 = tr.toScreen(a11 * i + a12 * N, a21 * i + a22 * N);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Horizontal grid line y = i
    ctx.strokeStyle = isAxis
      ? `rgba(118, 166, 149, ${alpha * 1.9})`
      : `rgba(110, 149, 184, ${alpha})`;
    const q1 = tr.toScreen(-a11 * N + a12 * i, -a21 * N + a22 * i);
    const q2 = tr.toScreen(a11 * N + a12 * i, a21 * N + a22 * i);
    ctx.beginPath();
    ctx.moveTo(q1.x, q1.y);
    ctx.lineTo(q2.x, q2.y);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  tr: CanvasTransform,
  from: Vec2,
  to: Vec2,
  color: string,
  lineWidth = 2,
  label?: string,
  dashed = false
) {
  const p1 = tr.toScreen(from.x, from.y);
  const p2 = tr.toScreen(to.x, to.y);
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy);
  if (len < 2) return;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  if (dashed) ctx.setLineDash([4, 4]);

  const headLen = Math.min(10, len * 0.35);
  const angle = Math.atan2(dy, dx);

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x - Math.cos(angle) * (headLen * 0.6), p2.y - Math.sin(angle) * (headLen * 0.6));
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(p2.x, p2.y);
  ctx.lineTo(
    p2.x - headLen * Math.cos(angle - Math.PI / 6),
    p2.y - headLen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    p2.x - headLen * Math.cos(angle + Math.PI / 6),
    p2.y - headLen * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  if (label) {
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = color;
    const ox = Math.cos(angle) * 11;
    const oy = Math.sin(angle) * 11;
    ctx.fillText(label, p2.x + ox - 5, p2.y + oy + 4);
  }
  ctx.restore();
}

export function drawHandle(
  ctx: CanvasRenderingContext2D,
  tr: CanvasTransform,
  v: Vec2,
  color: string
) {
  const p = tr.toScreen(v.x, v.y);
  ctx.save();
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = '#08080a';
  ctx.fill();
  ctx.lineWidth = 1.6;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.restore();
}

export function drawSpanLine(
  ctx: CanvasRenderingContext2D,
  tr: CanvasTransform,
  dir: Vec2,
  color: string,
  dashed = true,
  lineWidth = 1.25
) {
  const len = Math.hypot(dir.x, dir.y);
  if (len < 1e-4) return;
  const ux = (dir.x / len) * 14;
  const uy = (dir.y / len) * 14;
  const p1 = tr.toScreen(-ux, -uy);
  const p2 = tr.toScreen(ux, uy);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  if (dashed) ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.restore();
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
