import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import {
  createTransform,
  drawArrow,
  drawBaseGrid,
  drawHandle,
  drawSpanLine,
  drawTransformedGrid,
  easeInOutCubic,
  lerp,
  setupHiDPI,
  Vec2,
} from './canvasUtils';
import { MathTex } from '../MathTex';
import { Matrix2Editor } from './Matrix2Editor';

interface LinearMapVizProps {
  preset: string;
}

interface PresetSpec {
  c1: Vec2; // image of i-hat
  c2: Vec2; // image of j-hat
  v: Vec2;  // test vector
  mode: 'transform' | 'quotient' | 'dual';
}

const PRESETS: Record<string, PresetSpec> = {
  basis: { c1: { x: 1.8, y: 0.5 }, c2: { x: -0.6, y: 1.5 }, v: { x: 1.2, y: 1.1 }, mode: 'transform' },
  dependent: { c1: { x: 1.6, y: 0.8 }, c2: { x: -1.0, y: -0.5 }, v: { x: 0.8, y: 1.2 }, mode: 'transform' },
  general: { c1: { x: 1.5, y: 0.7 }, c2: { x: -0.8, y: 1.3 }, v: { x: 1.0, y: 1.0 }, mode: 'transform' },
  'rank-nullity': { c1: { x: 1.4, y: 0.7 }, c2: { x: -1.4, y: -0.7 }, v: { x: 1.0, y: 1.0 }, mode: 'transform' },
  nilpotent: { c1: { x: 0, y: 0 }, c2: { x: 1.5, y: 0 }, v: { x: 0.8, y: 1.3 }, mode: 'transform' },
  quotient: { c1: { x: 1.4, y: 0.7 }, c2: { x: 0.7, y: -1.4 }, v: { x: 1.2, y: 1.0 }, mode: 'quotient' },
  dual: { c1: { x: 1.1, y: 0.7 }, c2: { x: -0.7, y: 1.1 }, v: { x: 1.5, y: 1.2 }, mode: 'dual' },
};

export const LinearMapViz: React.FC<LinearMapVizProps> = ({ preset }) => {
  const spec = PRESETS[preset] || PRESETS.general;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [c1, setC1] = useState<Vec2>(spec.c1);
  const [c2, setC2] = useState<Vec2>(spec.c2);
  const [testV, setTestV] = useState<Vec2>(spec.v);
  const [t, setT] = useState<number>(1);
  const [playing, setPlaying] = useState<boolean>(false);
  const draggingRef = useRef<'c1' | 'c2' | 'v' | null>(null);

  useEffect(() => {
    const next = PRESETS[preset] || PRESETS.general;
    setC1(next.c1);
    setC2(next.c2);
    setTestV(next.v);
    setT(1);
    setPlaying(false);
  }, [preset]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let start: number | null = null;
    const duration = 2200;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = ((ts - start) % (duration + 700)) / duration;
      setT(Math.min(1, p));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const tr = createTransform(width, height, Math.min(width, height) / 6.2);

    drawBaseGrid(ctx, tr, width, height);

    const et = easeInOutCubic(t);

    if (spec.mode === 'dual') {
      // 3b1b Dual functional: parallel level sets φ(v) = a*x + b*y = k
      const a = c1.x;
      const b = c1.y;
      const norm2 = a * a + b * b || 1;
      const perpX = -b;
      const perpY = a;
      for (let k = -6; k <= 6; k++) {
        const px = (k * a) / norm2;
        const py = (k * b) / norm2;
        const p1 = tr.toScreen(px - perpX * 8, py - perpY * 8);
        const p2 = tr.toScreen(px + perpX * 8, py + perpY * 8);
        ctx.save();
        ctx.strokeStyle =
          k === 0
            ? 'rgba(200, 131, 107, 0.55)'
            : 'rgba(110, 149, 184, 0.24)';
        ctx.lineWidth = k === 0 ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }
      // Normal vector representing φ
      drawArrow(ctx, tr, { x: 0, y: 0 }, c1, '#C8836B', 2.2, 'φ');
      drawHandle(ctx, tr, c1, '#C8836B');
      // Test vector v
      drawArrow(ctx, tr, { x: 0, y: 0 }, testV, '#EFECE4', 2, 'v');
      drawHandle(ctx, tr, testV, '#EFECE4');
      return;
    }

    if (spec.mode === 'quotient') {
      // Subspace U direction = c1; parallel cosets v + U collapse along orthogonal direction as t -> 1
      const len = Math.hypot(c1.x, c1.y) || 1;
      const ux = c1.x / len;
      const uy = c1.y / len;
      const nx = -uy;
      const ny = ux;

      // Draw subspace U
      drawSpanLine(ctx, tr, { x: ux, y: uy }, 'rgba(200, 131, 107, 0.7)', false, 1.8);
      // Draw quotient axis U⊥
      drawSpanLine(ctx, tr, { x: nx, y: ny }, 'rgba(118, 166, 149, 0.45)', true, 1.3);

      // Parallel cosets collapsing toward quotient axis as t moves 0 -> 1
      for (let k = -3; k <= 3; k++) {
        if (k === 0) continue;
        const bx = nx * k * 0.85;
        const by = ny * k * 0.85;
        const spanHalf = lerp(6, 0.08, et);
        const p1 = tr.toScreen(bx - ux * spanHalf, by - uy * spanHalf);
        const p2 = tr.toScreen(bx + ux * spanHalf, by + uy * spanHalf);
        ctx.save();
        ctx.strokeStyle = 'rgba(239, 236, 228, 0.25)';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();

        // Point on quotient axis
        const qp = tr.toScreen(bx, by);
        ctx.beginPath();
        ctx.arc(qp.x, qp.y, lerp(2.2, 4.5, et), 0, Math.PI * 2);
        ctx.fillStyle = '#76A695';
        ctx.fill();
      }

      drawArrow(ctx, tr, { x: 0, y: 0 }, c1, '#C8836B', 2, 'U');
      drawHandle(ctx, tr, c1, '#C8836B');
      return;
    }

    // Standard 3b1b Grid Warp: interpolate I -> A
    const a11 = lerp(1, c1.x, et);
    const a21 = lerp(0, c1.y, et);
    const a12 = lerp(0, c2.x, et);
    const a22 = lerp(1, c2.y, et);

    drawTransformedGrid(ctx, tr, a11, a21, a12, a22, 0.24);

    // Check if near-singular (Rank 1) to highlight Null Space & Range!
    const det = c1.x * c2.y - c1.y * c2.x;
    if (Math.abs(det) < 0.08) {
      // Null space direction: if c1 != 0, null is (-c2_factor, c1_factor) -> (c2.x or -c2.y, ...)
      const nullDir =
        Math.hypot(c1.x, c1.y) > 0.05
          ? { x: -c2.x, y: c1.x }
          : { x: 1, y: 0 };
      const nullVec =
        Math.abs(c1.x * nullDir.x + c2.x * nullDir.y) < 0.05
          ? nullDir
          : { x: -c2.y, y: c1.y };
      drawSpanLine(ctx, tr, nullVec, 'rgba(196, 117, 138, 0.8)', true, 1.7);
      const rangeDir = Math.hypot(c1.x, c1.y) > 0.05 ? c1 : c2;
      drawSpanLine(ctx, tr, rangeDir, 'rgba(201, 164, 101, 0.65)', false, 2);
    }

    // Transformed basis vectors î and ĵ
    drawArrow(ctx, tr, { x: 0, y: 0 }, { x: a11, y: a21 }, '#C8836B', 2.3, 'T(î)');
    drawArrow(ctx, tr, { x: 0, y: 0 }, { x: a12, y: a22 }, '#76A695', 2.3, 'T(ĵ)');

    // Test vector v and its image T(v)
    const tv = {
      x: a11 * testV.x + a12 * testV.y,
      y: a21 * testV.x + a22 * testV.y,
    };
    drawArrow(ctx, tr, { x: 0, y: 0 }, testV, 'rgba(239, 236, 228, 0.3)', 1.2, 'v', true);
    drawArrow(ctx, tr, { x: 0, y: 0 }, tv, '#EFECE4', 2, 'T(v)');

    if (t > 0.92) {
      drawHandle(ctx, tr, c1, '#C8836B');
      drawHandle(ctx, tr, c2, '#76A695');
    }
  }, [c1, c2, testV, t, spec.mode]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const tr = createTransform(rect.width, rect.height, Math.min(rect.width, rect.height) / 6.2);
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const p1 = tr.toScreen(c1.x, c1.y);
    const p2 = tr.toScreen(c2.x, c2.y);
    const pv = tr.toScreen(testV.x, testV.y);

    if (Math.hypot(mx - p1.x, my - p1.y) < 18) {
      draggingRef.current = 'c1';
      setT(1);
      setPlaying(false);
    } else if (spec.mode === 'transform' && Math.hypot(mx - p2.x, my - p2.y) < 18) {
      draggingRef.current = 'c2';
      setT(1);
      setPlaying(false);
    } else if (spec.mode === 'dual' && Math.hypot(mx - pv.x, my - pv.y) < 18) {
      draggingRef.current = 'v';
    }
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const tr = createTransform(rect.width, rect.height, Math.min(rect.width, rect.height) / 6.2);
    const m = tr.toMath(e.clientX - rect.left, e.clientY - rect.top);
    const clamped = {
      x: Math.max(-2.8, Math.min(2.8, Math.round(m.x * 10) / 10)),
      y: Math.max(-2.4, Math.min(2.4, Math.round(m.y * 10) / 10)),
    };
    if (draggingRef.current === 'c1') setC1(clamped);
    if (draggingRef.current === 'c2') setC2(clamped);
    if (draggingRef.current === 'v') setTestV(clamped);
  };

  const handlePointerUp = () => {
    draggingRef.current = null;
  };

  const det = c1.x * c2.y - c1.y * c2.x;
  const rank =
    Math.abs(det) > 0.08
      ? 2
      : Math.hypot(c1.x, c1.y) > 0.05 || Math.hypot(c2.x, c2.y) > 0.05
      ? 1
      : 0;

  const telemetryTex =
    spec.mode === 'dual'
      ? `\\varphi(v) = (${c1.x.toFixed(1)})(${testV.x.toFixed(1)}) + (${c1.y.toFixed(1)})(${testV.y.toFixed(1)}) = ${(
          c1.x * testV.x +
          c1.y * testV.y
        ).toFixed(2)}`
      : spec.mode === 'quotient'
      ? `\\dim(V/U) = 2 - 1 = 1,\\quad \\text{collapse } t = ${t.toFixed(2)}`
      : `A = \\begin{pmatrix}${c1.x.toFixed(1)} & ${c2.x.toFixed(1)}\\\\${c1.y.toFixed(1)} & ${c2.y.toFixed(1)}\\end{pmatrix},\\; \\operatorname{rank}=${rank},\\; \\operatorname{nullity}=${2 - rank}`;

  return (
    <div>
      <div className="viz-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="viz-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </div>
      <div className="viz-controls">
        {spec.mode !== 'dual' && (
          <div className="viz-btn-row">
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className={`viz-btn ${playing ? 'active' : ''}`}
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? <Pause size={11} /> : <Play size={11} />}
                {playing ? 'Pause' : 'Morph I → T'}
              </button>
              <button
                className="viz-btn"
                onClick={() => {
                  setC1(spec.c1);
                  setC2(spec.c2);
                  setTestV(spec.v);
                  setT(1);
                  setPlaying(false);
                }}
              >
                <RotateCcw size={11} />
                Reset
              </button>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--dim)' }}>
              DRAG HANDLES
            </span>
          </div>
        )}
        {spec.mode === 'transform' && (
          <Matrix2Editor
            value={{ a: c1.x, b: c2.x, c: c1.y, d: c2.y }}
            onChange={(m) => {
              setC1({ x: m.a, y: m.c });
              setC2({ x: m.b, y: m.d });
              setT(1);
              setPlaying(false);
            }}
          />
        )}
        {spec.mode !== 'dual' && (
          <div className="viz-slider-row">
            <span>MORPH t</span>
            <input
              type="range"
              className="viz-slider"
              min={0}
              max={1}
              step={0.01}
              value={t}
              onChange={(e) => {
                setPlaying(false);
                setT(parseFloat(e.target.value));
              }}
            />
            <span>{t.toFixed(2)}</span>
          </div>
        )}
      </div>
      <div className="viz-telemetry">
        <MathTex tex={telemetryTex} />
      </div>
    </div>
  );
};
