import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  createTransform,
  drawArrow,
  drawBaseGrid,
  drawHandle,
  drawSpanLine,
  lerp,
  setupHiDPI,
  Vec2,
} from './canvasUtils';
import { MathTex } from '../MathTex';

interface InnerProductVizProps {
  preset: string;
}

export const InnerProductViz: React.FC<InnerProductVizProps> = ({ preset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [u, setU] = useState<Vec2>({ x: 2.0, y: 0.7 });
  const [v, setV] = useState<Vec2>({ x: 1.1, y: 1.8 });
  const [gsStep, setGsStep] = useState<number>(preset === 'gram-schmidt' ? 1 : 0);
  const draggingRef = useRef<'u' | 'v' | null>(null);

  useEffect(() => {
    setU({ x: 2.0, y: 0.7 });
    setV({ x: 1.1, y: 1.8 });
    setGsStep(preset === 'gram-schmidt' ? 1 : 0);
  }, [preset]);

  const dot = u.x * v.x + u.y * v.y;
  const uNorm2 = u.x * u.x + u.y * u.y || 1e-6;
  const uNorm = Math.sqrt(uNorm2);
  const vNorm = Math.hypot(v.x, v.y);
  const projScale = dot / uNorm2;
  const proj: Vec2 = { x: u.x * projScale, y: u.y * projScale };
  const perp: Vec2 = { x: v.x - proj.x, y: v.y - proj.y };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const tr = createTransform(width, height, Math.min(width, height) / 5.8);

    drawBaseGrid(ctx, tr, width, height);

    // Draw span of u
    drawSpanLine(ctx, tr, u, 'rgba(93, 166, 179, 0.35)', true, 1.2);

    if (preset === 'gram-schmidt') {
      // Unit circle reference
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 236, 228, 0.14)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(tr.cx, tr.cy, 1 * tr.scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const e1: Vec2 = { x: u.x / uNorm, y: u.y / uNorm };
      const perpNorm = Math.hypot(perp.x, perp.y) || 1;
      const e2: Vec2 = { x: perp.x / perpNorm, y: perp.y / perpNorm };

      // Interpolate v -> perp (step 0..0.5) -> e2 (step 0.5..1)
      const t1 = Math.min(1, gsStep * 2);
      const t2 = Math.max(0, (gsStep - 0.5) * 2);
      const curE1: Vec2 = { x: lerp(u.x, e1.x, t2), y: lerp(u.y, e1.y, t2) };
      const midV: Vec2 = { x: lerp(v.x, perp.x, t1), y: lerp(v.y, perp.y, t1) };
      const curE2: Vec2 = { x: lerp(midV.x, e2.x, t2), y: lerp(midV.y, e2.y, t2) };

      // Original vectors faded
      drawArrow(ctx, tr, { x: 0, y: 0 }, u, 'rgba(93, 166, 179, 0.35)', 1.3, 'v₁', true);
      drawArrow(ctx, tr, { x: 0, y: 0 }, v, 'rgba(200, 131, 107, 0.35)', 1.3, 'v₂', true);
      // Orthogonalized vectors
      drawArrow(ctx, tr, { x: 0, y: 0 }, curE1, '#5DA6B3', 2.4, t2 > 0.5 ? 'e₁' : 'v₁');
      drawArrow(ctx, tr, { x: 0, y: 0 }, curE2, '#C8836B', 2.4, t2 > 0.5 ? 'e₂' : 'f₂');

      drawHandle(ctx, tr, u, '#5DA6B3');
      drawHandle(ctx, tr, v, '#C8836B');
      return;
    }

    // Standard Projection / Cauchy-Schwarz view
    // Shaded right triangle
    const o = tr.toScreen(0, 0);
    const pProj = tr.toScreen(proj.x, proj.y);
    const pV = tr.toScreen(v.x, v.y);

    ctx.save();
    ctx.fillStyle = 'rgba(93, 166, 179, 0.08)';
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    ctx.lineTo(pProj.x, pProj.y);
    ctx.lineTo(pV.x, pV.y);
    ctx.closePath();
    ctx.fill();

    // Perpendicular drop line
    ctx.strokeStyle = 'rgba(239, 236, 228, 0.45)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(pProj.x, pProj.y);
    ctx.lineTo(pV.x, pV.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Right angle marker at proj
    const perpLen = Math.hypot(perp.x, perp.y);
    if (perpLen > 0.15 && uNorm > 0.15) {
      const s = 0.18;
      const ux = (u.x / uNorm) * (projScale >= 0 ? -s : s);
      const uy = (u.y / uNorm) * (projScale >= 0 ? -s : s);
      const px = (perp.x / perpLen) * s;
      const py = (perp.y / perpLen) * s;
      const c1 = tr.toScreen(proj.x + ux, proj.y + uy);
      const c2 = tr.toScreen(proj.x + ux + px, proj.y + uy + py);
      const c3 = tr.toScreen(proj.x + px, proj.y + py);
      ctx.strokeStyle = 'rgba(239, 236, 228, 0.55)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(c1.x, c1.y);
      ctx.lineTo(c2.x, c2.y);
      ctx.lineTo(c3.x, c3.y);
      ctx.stroke();
    }
    ctx.restore();

    drawArrow(ctx, tr, { x: 0, y: 0 }, proj, '#C9A465', 2.4, 'P_U(v)');
    drawArrow(ctx, tr, { x: 0, y: 0 }, u, '#5DA6B3', 2.1, 'u');
    drawArrow(ctx, tr, { x: 0, y: 0 }, v, '#C8836B', 2.2, 'v');

    drawHandle(ctx, tr, u, '#5DA6B3');
    drawHandle(ctx, tr, v, '#C8836B');
  }, [u, v, gsStep, preset, proj, perp, uNorm, projScale]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const tr = createTransform(rect.width, rect.height, Math.min(rect.width, rect.height) / 5.8);
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const pu = tr.toScreen(u.x, u.y);
    const pv = tr.toScreen(v.x, v.y);
    if (Math.hypot(mx - pu.x, my - pu.y) < 18) draggingRef.current = 'u';
    else if (Math.hypot(mx - pv.x, my - pv.y) < 18) draggingRef.current = 'v';
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const tr = createTransform(rect.width, rect.height, Math.min(rect.width, rect.height) / 5.8);
    const m = tr.toMath(e.clientX - rect.left, e.clientY - rect.top);
    const clamped = {
      x: Math.max(-2.6, Math.min(2.6, Math.round(m.x * 10) / 10)),
      y: Math.max(-2.2, Math.min(2.2, Math.round(m.y * 10) / 10)),
    };
    if (draggingRef.current === 'u') setU(clamped);
    if (draggingRef.current === 'v') setV(clamped);
  };

  const ratio = uNorm * vNorm > 1e-4 ? Math.abs(dot) / (uNorm * vNorm) : 0;

  return (
    <div>
      <div className="viz-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="viz-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={() => {
            draggingRef.current = null;
          }}
        />
      </div>
      <div className="viz-controls">
        <div className="viz-btn-row">
          <button
            className="viz-btn"
            onClick={() => {
              setU({ x: 2.0, y: 0.7 });
              setV({ x: 1.1, y: 1.8 });
              setGsStep(preset === 'gram-schmidt' ? 1 : 0);
            }}
          >
            <RotateCcw size={11} />
            Reset
          </button>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--dim)' }}>
            DRAG u & v · |cos θ| = {ratio.toFixed(2)}
          </span>
        </div>
        {preset === 'gram-schmidt' && (
          <div className="viz-slider-row">
            <span>ORTHO</span>
            <input
              type="range"
              className="viz-slider"
              min={0}
              max={1}
              step={0.01}
              value={gsStep}
              onChange={(e) => setGsStep(parseFloat(e.target.value))}
            />
            <span>{Math.round(gsStep * 100)}%</span>
          </div>
        )}
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={`|\\langle u,v\\rangle| = ${Math.abs(dot).toFixed(2)} \\le \\|u\\|\\|v\\| = ${(
            uNorm * vNorm
          ).toFixed(2)}`}
        />
      </div>
    </div>
  );
};
