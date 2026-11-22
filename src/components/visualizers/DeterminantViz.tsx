import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  createTransform,
  drawArrow,
  drawBaseGrid,
  drawHandle,
  setupHiDPI,
  Vec2,
} from './canvasUtils';
import { MathTex } from '../MathTex';
import { Matrix2Editor } from './Matrix2Editor';

interface DeterminantVizProps {
  preset: string;
}

export const DeterminantViz: React.FC<DeterminantVizProps> = ({ preset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const initialA1 = preset === 'det-flip' ? { x: 0.6, y: 1.5 } : { x: 1.7, y: 0.4 };
  const initialA2 = preset === 'det-flip' ? { x: 1.5, y: 0.3 } : { x: 0.5, y: 1.4 };

  const [a1, setA1] = useState<Vec2>(initialA1);
  const [a2, setA2] = useState<Vec2>(initialA2);
  const draggingRef = useRef<'a1' | 'a2' | null>(null);

  useEffect(() => {
    setA1(preset === 'det-flip' ? { x: 0.6, y: 1.5 } : { x: 1.7, y: 0.4 });
    setA2(preset === 'det-flip' ? { x: 1.5, y: 0.3 } : { x: 0.5, y: 1.4 });
  }, [preset]);

  const det = a1.x * a2.y - a1.y * a2.x;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const tr = createTransform(width, height, Math.min(width, height) / 6.0);

    drawBaseGrid(ctx, tr, width, height);

    // Reference unit square
    const u0 = tr.toScreen(0, 0);
    const u1 = tr.toScreen(1, 0);
    const u11 = tr.toScreen(1, 1);
    const u01 = tr.toScreen(0, 1);
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 236, 228, 0.18)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(u0.x, u0.y);
    ctx.lineTo(u1.x, u1.y);
    ctx.lineTo(u11.x, u11.y);
    ctx.lineTo(u01.x, u01.y);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Transformed parallelogram
    const p0 = tr.toScreen(0, 0);
    const p1 = tr.toScreen(a1.x, a1.y);
    const p12 = tr.toScreen(a1.x + a2.x, a1.y + a2.y);
    const p2 = tr.toScreen(a2.x, a2.y);

    const fillColor =
      Math.abs(det) < 0.05
        ? 'rgba(239, 236, 228, 0.1)'
        : det > 0
        ? 'rgba(142, 155, 116, 0.25)'
        : 'rgba(196, 117, 138, 0.25)';
    const strokeColor =
      Math.abs(det) < 0.05
        ? '#9F9B92'
        : det > 0
        ? '#8E9B74'
        : '#C4758A';

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p12.x, p12.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Orientation badge
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = strokeColor;
    ctx.fillText(
      Math.abs(det) < 0.05
        ? 'SINGULAR (AREA = 0)'
        : det > 0
        ? 'POSITIVE ORIENTATION (+)'
        : 'ORIENTATION FLIPPED (−)',
      12,
      20
    );
    ctx.restore();

    drawArrow(ctx, tr, { x: 0, y: 0 }, a1, '#C8836B', 2.3, 'a₁');
    drawArrow(ctx, tr, { x: 0, y: 0 }, a2, '#76A695', 2.3, 'a₂');
    drawHandle(ctx, tr, a1, '#C8836B');
    drawHandle(ctx, tr, a2, '#76A695');
  }, [a1, a2, det]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const tr = createTransform(rect.width, rect.height, Math.min(rect.width, rect.height) / 6.0);
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const p1 = tr.toScreen(a1.x, a1.y);
    const p2 = tr.toScreen(a2.x, a2.y);
    if (Math.hypot(mx - p1.x, my - p1.y) < 18) draggingRef.current = 'a1';
    else if (Math.hypot(mx - p2.x, my - p2.y) < 18) draggingRef.current = 'a2';
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const tr = createTransform(rect.width, rect.height, Math.min(rect.width, rect.height) / 6.0);
    const m = tr.toMath(e.clientX - rect.left, e.clientY - rect.top);
    const clamped = {
      x: Math.max(-2.6, Math.min(2.6, Math.round(m.x * 10) / 10)),
      y: Math.max(-2.2, Math.min(2.2, Math.round(m.y * 10) / 10)),
    };
    if (draggingRef.current === 'a1') setA1(clamped);
    if (draggingRef.current === 'a2') setA2(clamped);
  };

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
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className="viz-btn"
              onClick={() => {
                // Shear a2 by +0.6*a1: proves shear invariance of determinant!
                setA2((prev) => ({
                  x: Math.round((prev.x + 0.5 * a1.x) * 10) / 10,
                  y: Math.round((prev.y + 0.5 * a1.y) * 10) / 10,
                }));
              }}
            >
              Shear a₂ += ½a₁
            </button>
            <button
              className="viz-btn"
              onClick={() => {
                const tmp = a1;
                setA1(a2);
                setA2(tmp);
              }}
            >
              Swap a₁ ↔ a₂
            </button>
            <button
              className="viz-btn"
              onClick={() => {
                setA1(initialA1);
                setA2(initialA2);
              }}
            >
              <RotateCcw size={11} />
            </button>
          </div>
        </div>
        <Matrix2Editor
          value={{ a: a1.x, b: a2.x, c: a1.y, d: a2.y }}
          onChange={(m) => {
            setA1({ x: m.a, y: m.c });
            setA2({ x: m.b, y: m.d });
          }}
        />
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={`\\det\\begin{pmatrix}${a1.x.toFixed(1)} & ${a2.x.toFixed(1)}\\\\${a1.y.toFixed(
            1
          )} & ${a2.y.toFixed(1)}\\end{pmatrix} = ${det.toFixed(2)}`}
        />
      </div>
    </div>
  );
};
