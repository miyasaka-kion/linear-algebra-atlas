import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import {
  createTransform,
  drawArrow,
  drawBaseGrid,
  easeInOutCubic,
  lerp,
  setupHiDPI,
  Vec2,
} from './canvasUtils';
import { MathTex } from '../MathTex';
import { Matrix2Editor, Matrix2Values } from './Matrix2Editor';

// Exact analytic 2x2 SVD: decomposes A = R(thetaU) * diag(s1, s2) * R(-thetaV)
function svdFromMatrix2(m: Matrix2Values): {
  thetaV: number;
  s1: number;
  s2: number;
  thetaU: number;
} {
  // A^T A = [[p, r], [r, q]]
  const p = m.a * m.a + m.c * m.c;
  const q = m.b * m.b + m.d * m.d;
  const r = m.a * m.b + m.c * m.d;
  const thetaV = 0.5 * Math.atan2(2 * r, p - q);
  const c = Math.cos(thetaV);
  const s = Math.sin(thetaV);
  // First column of A*V: (a*c + b*s, c*c + d*s)
  const u1x = m.a * c + m.b * s;
  const u1y = m.c * c + m.d * s;
  const s1 = Math.hypot(u1x, u1y);
  const thetaU = s1 > 1e-6 ? Math.atan2(u1y, u1x) : 0;
  // Second column of A*V: (-a*s + b*c, -c*s + d*c)
  const u2x = -m.a * s + m.b * c;
  const u2y = -m.c * s + m.d * c;
  // Signed s2 along (-sin(thetaU), cos(thetaU)) so orientation (det sign) is exact!
  const s2 = -Math.sin(thetaU) * u2x + Math.cos(thetaU) * u2y;
  return { thetaV, s1, s2, thetaU };
}

function matrix2FromSvd(
  thetaV: number,
  s1: number,
  s2: number,
  thetaU: number
): Matrix2Values {
  const cu = Math.cos(thetaU);
  const su = Math.sin(thetaU);
  const cv = Math.cos(thetaV);
  const sv = Math.sin(thetaV);
  const rnd = (x: number) => Math.round(x * 100) / 100;
  return {
    a: rnd(cu * s1 * cv + su * s2 * sv),
    b: rnd(cu * s1 * sv - su * s2 * cv),
    c: rnd(su * s1 * cv - cu * s2 * sv),
    d: rnd(su * s1 * sv + cu * s2 * cv),
  };
}

interface SpectralSvdVizProps {
  preset: string;
}

interface SvdPreset {
  thetaV: number; // right singular rotation
  s1: number;     // singular value 1
  s2: number;     // singular value 2
  thetaU: number; // left singular rotation
}

const SVD_PRESETS: Record<string, SvdPreset> = {
  'svd-full': { thetaV: 0.55, s1: 1.9, s2: 0.65, thetaU: -0.45 },
  'real-spectral': { thetaV: 0.65, s1: 1.85, s2: -0.8, thetaU: 0.65 },
  positive: { thetaV: 0.55, s1: 1.8, s2: 0.75, thetaU: 0.55 },
  unitary: { thetaV: 0, s1: 1.0, s2: 1.0, thetaU: 0.95 },
  polar: { thetaV: 0.45, s1: 1.8, s2: 0.7, thetaU: 1.1 },
  'low-rank': { thetaV: 0.5, s1: 1.9, s2: 0.55, thetaU: -0.35 },
};

function rot(v: Vec2, ang: number): Vec2 {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: c * v.x - s * v.y, y: s * v.x + c * v.y };
}

export const SpectralSvdViz: React.FC<SpectralSvdVizProps> = ({ preset }) => {
  const spec = SVD_PRESETS[preset] || SVD_PRESETS['svd-full'];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [thetaV, setThetaV] = useState(spec.thetaV);
  const [s1, setS1] = useState(spec.s1);
  const [s2, setS2] = useState(spec.s2);
  const [thetaU, setThetaU] = useState(spec.thetaU);
  const [stage, setStage] = useState(3); // 0 -> 1 (V*), 1 -> 2 (Σ), 2 -> 3 (U)
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const next = SVD_PRESETS[preset] || SVD_PRESETS['svd-full'];
    setThetaV(next.thetaV);
    setS1(next.s1);
    setS2(next.s2);
    setThetaU(next.thetaU);
    setStage(3);
    setPlaying(false);
  }, [preset]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let start: number | null = null;
    const totalMs = 3600;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = ((ts - start) % (totalMs + 900)) / totalMs;
      setStage(Math.min(3, p * 3));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const applyStage = (p: Vec2): Vec2 => {
    const t1 = easeInOutCubic(Math.min(1, Math.max(0, stage)));
    const t2 = easeInOutCubic(Math.min(1, Math.max(0, stage - 1)));
    const t3 = easeInOutCubic(Math.min(1, Math.max(0, stage - 2)));

    // 1. Rotate by -thetaV (V*)
    const p1 = rot(p, -thetaV * t1);
    // 2. Scale by Σ
    const p2 = { x: p1.x * lerp(1, s1, t2), y: p1.y * lerp(1, s2, t2) };
    // 3. Rotate by thetaU (U)
    return rot(p2, thetaU * t3);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const tr = createTransform(width, height, Math.min(width, height) / 5.2);

    drawBaseGrid(ctx, tr, width, height);

    // Reference unit circle
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 236, 228, 0.14)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(tr.cx, tr.cy, 1 * tr.scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Transformed unit circle (ellipse!)
    ctx.fillStyle = 'rgba(196, 117, 138, 0.10)';
    ctx.strokeStyle = '#C4758A';
    ctx.lineWidth = 1.9;
    ctx.beginPath();
    for (let i = 0; i <= 90; i++) {
      const ang = (i / 90) * Math.PI * 2;
      const pt = applyStage({ x: Math.cos(ang), y: Math.sin(ang) });
      const sp = tr.toScreen(pt.x, pt.y);
      if (i === 0) ctx.moveTo(sp.x, sp.y);
      else ctx.lineTo(sp.x, sp.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Right singular vectors v1, v2 (input orthonormal basis)
    const v1 = { x: Math.cos(thetaV), y: Math.sin(thetaV) };
    const v2 = { x: -Math.sin(thetaV), y: Math.cos(thetaV) };

    const out1 = applyStage(v1);
    const out2 = applyStage(v2);

    // Faint original v1, v2
    drawArrow(ctx, tr, { x: 0, y: 0 }, v1, 'rgba(200, 131, 107, 0.3)', 1.1, 'v₁', true);
    drawArrow(ctx, tr, { x: 0, y: 0 }, v2, 'rgba(118, 166, 149, 0.3)', 1.1, 'v₂', true);

    // Active transformed singular axes
    drawArrow(ctx, tr, { x: 0, y: 0 }, out1, '#C8836B', 2.4, stage > 1.5 ? 'σ₁u₁' : 'v₁');
    drawArrow(ctx, tr, { x: 0, y: 0 }, out2, '#76A695', 2.4, stage > 1.5 ? 'σ₂u₂' : 'v₂');

    // Stage badge
    ctx.save();
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#EFECE4';
    const label =
      stage < 1
        ? 'STAGE 1/3 · ROTATE V*'
        : stage < 2
        ? 'STAGE 2/3 · STRETCH Σ'
        : 'STAGE 3/3 · ROTATE U';
    ctx.fillText(label, 12, 20);
    ctx.restore();
  }, [thetaV, s1, s2, thetaU, stage]);

  return (
    <div>
      <div className="viz-canvas-wrap">
        <canvas ref={canvasRef} className="viz-canvas" />
      </div>
      <div className="viz-controls">
        <div className="viz-btn-row">
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className={`viz-btn ${playing ? 'active' : ''}`}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause size={11} /> : <Play size={11} />}
              {playing ? 'Pause' : 'Animate V* → Σ → U'}
            </button>
            <button
              className="viz-btn"
              onClick={() => {
                setThetaV(spec.thetaV);
                setS1(spec.s1);
                setS2(spec.s2);
                setThetaU(spec.thetaU);
                setStage(3);
                setPlaying(false);
              }}
            >
              <RotateCcw size={11} />
              Reset
            </button>
          </div>
        </div>
        <Matrix2Editor
          value={matrix2FromSvd(thetaV, s1, s2, thetaU)}
          onChange={(m) => {
            const dec = svdFromMatrix2(m);
            setThetaV(dec.thetaV);
            setS1(dec.s1);
            setS2(dec.s2);
            setThetaU(dec.thetaU);
          }}
        />
        <div className="viz-slider-row">
          <span>STAGE</span>
          <input
            type="range"
            className="viz-slider"
            min={0}
            max={3}
            step={0.02}
            value={stage}
            onChange={(e) => {
              setPlaying(false);
              setStage(parseFloat(e.target.value));
            }}
          />
          <span>{stage.toFixed(1)}/3</span>
        </div>
        <div className="viz-slider-row">
          <span>σ₁ / λ₁</span>
          <input
            type="range"
            className="viz-slider"
            min={0}
            max={2.2}
            step={0.05}
            value={s1}
            onChange={(e) => setS1(parseFloat(e.target.value))}
          />
          <span>{s1.toFixed(2)}</span>
        </div>
        <div className="viz-slider-row">
          <span>σ₂ / λ₂</span>
          <input
            type="range"
            className="viz-slider"
            min={preset === 'real-spectral' ? -1.8 : 0}
            max={2.0}
            step={0.05}
            value={s2}
            onChange={(e) => setS2(parseFloat(e.target.value))}
          />
          <span>{s2.toFixed(2)}</span>
        </div>
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={`\\sigma_1 = ${Math.abs(s1).toFixed(2)},\\; \\sigma_2 = ${Math.abs(s2).toFixed(
            2
          )},\\; \\text{Area Scale} = \\sigma_1\\sigma_2 = ${(Math.abs(s1 * s2)).toFixed(2)}`}
        />
      </div>
    </div>
  );
};
