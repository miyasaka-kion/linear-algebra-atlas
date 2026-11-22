import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  createTransform,
  drawArrow,
  drawBaseGrid,
  drawHandle,
  drawSpanLine,
  setupHiDPI,
  Vec2,
} from './canvasUtils';
import { MathTex } from '../MathTex';
import { Matrix2Editor } from './Matrix2Editor';

interface EigenVizProps {
  preset: string;
}

interface Matrix2 {
  a: number;
  b: number;
  c: number;
  d: number;
}

const EIGEN_PRESETS: Record<string, { m: Matrix2; label: string }> = {
  diagonalizable: { m: { a: 1.7, b: 0.5, c: 0.4, d: 0.9 }, label: '2 Real Eigenlines' },
  'rotation-complex': { m: { a: 0, b: -1, c: 1, d: 0 }, label: '90° Rotation (No Real λ)' },
  shear: { m: { a: 1, b: 1, c: 0, d: 1 }, label: 'Shear (1 Eigenline)' },
  jordan: { m: { a: 1.2, b: 0.9, c: 0, d: 1.2 }, label: 'Jordan Block J₂(1.2)' },
};

function computeRealEigen(m: Matrix2): { lambdas: number[]; dirs: Vec2[]; isComplex: boolean } {
  const tr = m.a + m.d;
  const det = m.a * m.d - m.b * m.c;
  const disc = tr * tr - 4 * det;
  if (disc < -1e-4) {
    return { lambdas: [], dirs: [], isComplex: true };
  }
  const sqrtD = Math.sqrt(Math.max(0, disc));
  const l1 = (tr + sqrtD) / 2;
  const l2 = (tr - sqrtD) / 2;

  const getDir = (lam: number): Vec2 => {
    const r1x = m.a - lam;
    const r1y = m.b;
    if (Math.hypot(r1x, r1y) > 1e-4) return { x: -r1y, y: r1x };
    const r2x = m.c;
    const r2y = m.d - lam;
    if (Math.hypot(r2x, r2y) > 1e-4) return { x: -r2y, y: r2x };
    return { x: 1, y: 0 };
  };

  if (Math.abs(l1 - l2) < 1e-3) {
    return { lambdas: [l1], dirs: [getDir(l1)], isComplex: false };
  }
  return { lambdas: [l1, l2], dirs: [getDir(l1), getDir(l2)], isComplex: false };
}

export const EigenViz: React.FC<EigenVizProps> = ({ preset }) => {
  const spec = EIGEN_PRESETS[preset] || EIGEN_PRESETS.diagonalizable;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mat, setMat] = useState<Matrix2>(spec.m);
  const [angle, setAngle] = useState<number>(0.75);
  const draggingRef = useRef<boolean>(false);

  useEffect(() => {
    const next = EIGEN_PRESETS[preset] || EIGEN_PRESETS.diagonalizable;
    setMat(next.m);
    setAngle(0.75);
  }, [preset]);

  const v: Vec2 = { x: Math.cos(angle) * 1.4, y: Math.sin(angle) * 1.4 };
  const tv: Vec2 = {
    x: mat.a * v.x + mat.b * v.y,
    y: mat.c * v.x + mat.d * v.y,
  };

  // Alignment check: cross product near 0 => eigenvector!
  const cross = v.x * tv.y - v.y * tv.x;
  const isAligned = Math.abs(cross) < 0.14;
  const eig = computeRealEigen(mat);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const tr = createTransform(width, height, Math.min(width, height) / 6.0);

    drawBaseGrid(ctx, tr, width, height);

    // Draw subtle transformed unit circle -> ellipse
    ctx.save();
    ctx.strokeStyle = 'rgba(155, 130, 196, 0.3)';
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    for (let i = 0; i <= 72; i++) {
      const th = (i / 72) * Math.PI * 2;
      const ux = Math.cos(th) * 1.4;
      const uy = Math.sin(th) * 1.4;
      const p = tr.toScreen(mat.a * ux + mat.b * uy, mat.c * ux + mat.d * uy);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.stroke();

    // Original circle of radius 1.4
    ctx.strokeStyle = 'rgba(239, 236, 228, 0.1)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(tr.cx, tr.cy, 1.4 * tr.scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Draw real eigen-lines
    eig.dirs.forEach((d, idx) => {
      drawSpanLine(
        ctx,
        tr,
        d,
        idx === 0 ? 'rgba(200, 131, 107, 0.65)' : 'rgba(118, 166, 149, 0.65)',
        true,
        1.5
      );
    });

    // Draw v's current span line faintly
    drawSpanLine(ctx, tr, v, 'rgba(239, 236, 228, 0.12)', false, 1);

    // Draw v and T(v)
    drawArrow(ctx, tr, { x: 0, y: 0 }, tv, isAligned ? '#C9A465' : '#9B82C4', 2.4, 'T(v)');
    drawArrow(ctx, tr, { x: 0, y: 0 }, v, isAligned ? '#EFECE4' : '#C8836B', 2.2, 'v');
    drawHandle(ctx, tr, v, '#EFECE4');

    if (isAligned) {
      ctx.save();
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#C9A465';
      ctx.fillText('★ EIGENVECTOR ALIGNED!', 14, 22);
      ctx.restore();
    } else if (eig.isComplex) {
      ctx.save();
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#C4758A';
      ctx.fillText('NO REAL EIGENLINES (λ ∈ C \\ R)', 14, 22);
      ctx.restore();
    }
  }, [mat, angle, isAligned, eig, v, tv]);

  const updateAngleFromPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const tr = createTransform(rect.width, rect.height, Math.min(rect.width, rect.height) / 6.0);
    const m = tr.toMath(e.clientX - rect.left, e.clientY - rect.top);
    setAngle(Math.atan2(m.y, m.x));
  };

  const eigTex = eig.isComplex
    ? `\\lambda = ${((mat.a + mat.d) / 2).toFixed(2)} \\pm ${Math.sqrt(
        Math.max(0, mat.a * mat.d - mat.b * mat.c - Math.pow((mat.a + mat.d) / 2, 2))
      ).toFixed(2)}i \\in \\mathbb{C}`
    : eig.lambdas.length === 1
    ? `\\lambda = ${eig.lambdas[0].toFixed(2)}\\;(\\text{repeated})`
    : `\\lambda_1 = ${eig.lambdas[0].toFixed(2)},\\; \\lambda_2 = ${eig.lambdas[1].toFixed(2)}`;

  return (
    <div>
      <div className="viz-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="viz-canvas"
          onPointerDown={(e) => {
            draggingRef.current = true;
            updateAngleFromPointer(e);
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) updateAngleFromPointer(e);
          }}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
        />
      </div>
      <div className="viz-controls">
        <div className="viz-btn-row">
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {Object.entries(EIGEN_PRESETS).map(([k, val]) => (
              <button
                key={k}
                className={`viz-btn ${
                  mat.a === val.m.a && mat.b === val.m.b && mat.c === val.m.c && mat.d === val.m.d
                    ? 'active'
                    : ''
                }`}
                onClick={() => setMat(val.m)}
              >
                {k === 'diagonalizable'
                  ? 'Diag'
                  : k === 'rotation-complex'
                  ? 'Rot 90°'
                  : k === 'shear'
                  ? 'Shear'
                  : 'Jordan'}
              </button>
            ))}
          </div>
          <button className="viz-btn" onClick={() => setMat(spec.m)}>
            <RotateCcw size={11} />
          </button>
        </div>
        <Matrix2Editor value={mat} onChange={setMat} />
        <div className="viz-slider-row">
          <span>ANGLE θ</span>
          <input
            type="range"
            className="viz-slider"
            min={0}
            max={Math.PI * 2}
            step={0.02}
            value={angle < 0 ? angle + Math.PI * 2 : angle}
            onChange={(e) => setAngle(parseFloat(e.target.value))}
          />
          <span>{Math.round(((angle < 0 ? angle + Math.PI * 2 : angle) * 180) / Math.PI)}°</span>
        </div>
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={`A = \\begin{pmatrix}${mat.a.toFixed(1)} & ${mat.b.toFixed(1)}\\\\${mat.c.toFixed(1)} & ${mat.d.toFixed(1)}\\end{pmatrix},\\quad ${eigTex}`}
        />
      </div>
    </div>
  );
};
