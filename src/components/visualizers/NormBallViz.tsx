import React, { useEffect, useRef, useState } from 'react';
import { createTransform, drawBaseGrid, setupHiDPI } from './canvasUtils';
import { MathTex } from '../MathTex';

interface NormBallVizProps {
  preset: string;
}

function drawLpBall(
  ctx: CanvasRenderingContext2D,
  tr: ReturnType<typeof createTransform>,
  p: number,
  radius: number,
  stroke: string,
  fill: string,
  dashed = false
) {
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.lineWidth = 1.8;
  if (dashed) ctx.setLineDash([4, 4]);
  ctx.beginPath();
  const N = 160;
  for (let i = 0; i <= N; i++) {
    const th = (i / N) * Math.PI * 2;
    const cx = Math.cos(th);
    const sy = Math.sin(th);
    let r = radius;
    if (p > 40) {
      r = radius / Math.max(Math.abs(cx), Math.abs(sy));
    } else {
      const denom = Math.pow(Math.pow(Math.abs(cx), p) + Math.pow(Math.abs(sy), p), 1 / p);
      r = radius / denom;
    }
    const pt = tr.toScreen(cx * r, sy * r);
    if (i === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export const NormBallViz: React.FC<NormBallVizProps> = ({ preset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pVal, setPVal] = useState<number>(preset === 'sparse-l1' ? 1 : 1.4);
  const [slope, setSlope] = useState<number>(-0.42);
  const isSparseMode = preset === 'sparse-l1';

  useEffect(() => {
    setPVal(preset === 'sparse-l1' ? 1 : 1.4);
  }, [preset]);

  // Dual exponent q: 1/p + 1/q = 1
  const qVal = pVal <= 1.02 ? 99 : pVal >= 20 ? 1 : pVal / (pVal - 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const tr = createTransform(width, height, Math.min(width, height) / 4.2);

    drawBaseGrid(ctx, tr, width, height);

    if (isSparseMode) {
      // Affine line: y = slope * x + b (passing through (0, 1.35))
      const intercept = 1.35;
      // Sparse solution on y-axis: (0, intercept), l1 radius = intercept
      const r1 = intercept;
      // l2 closest point to origin on line slope*x - y + intercept = 0
      const denom = slope * slope + 1;
      const x2 = (-slope * intercept) / denom;
      const y2 = intercept / denom;
      const r2 = Math.hypot(x2, y2);

      // Draw l2 circle tangent to line
      drawLpBall(ctx, tr, 2, r2, '#5DA6B3', 'rgba(93, 166, 179, 0.1)', true);
      // Draw l1 diamond touching line at sparse corner (0, intercept)
      drawLpBall(ctx, tr, 1, r1, '#C8836B', 'rgba(200, 131, 107, 0.14)', false);

      // Draw affine line Ax = b
      const pA = tr.toScreen(-3, slope * -3 + intercept);
      const pB = tr.toScreen(3, slope * 3 + intercept);
      ctx.save();
      ctx.strokeStyle = '#EFECE4';
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();

      // Highlight sparse l1 solution
      const sp1 = tr.toScreen(0, intercept);
      ctx.fillStyle = '#C8836B';
      ctx.beginPath();
      ctx.arc(sp1.x, sp1.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Highlight dense l2 solution
      const sp2 = tr.toScreen(x2, y2);
      ctx.fillStyle = '#5DA6B3';
      ctx.beginPath();
      ctx.arc(sp2.x, sp2.y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#C8836B';
      ctx.fillText('ℓ₁ SPARSE: (0, 1.35)', sp1.x + 8, sp1.y - 6);
      ctx.fillStyle = '#5DA6B3';
      ctx.fillText(`ℓ₂ DENSE: (${x2.toFixed(2)}, ${y2.toFixed(2)})`, sp2.x + 8, sp2.y + 14);
      ctx.restore();
      return;
    }

    // Standard l_p and dual l_q unit balls
    drawLpBall(ctx, tr, qVal, 1, '#5DA6B3', 'rgba(93, 166, 179, 0.08)', true);
    drawLpBall(ctx, tr, pVal, 1, '#C8836B', 'rgba(200, 131, 107, 0.13)', false);

    ctx.save();
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#C8836B';
    ctx.fillText(`— ℓ_p BALL (p = ${pVal >= 20 ? '∞' : pVal.toFixed(2)})`, 12, 20);
    ctx.fillStyle = '#5DA6B3';
    ctx.fillText(`-- DUAL ℓ_q BALL (q = ${qVal >= 40 ? '∞' : qVal.toFixed(2)})`, 12, 35);
    ctx.restore();
  }, [pVal, qVal, slope, isSparseMode]);

  return (
    <div>
      <div className="viz-canvas-wrap">
        <canvas ref={canvasRef} className="viz-canvas" />
      </div>
      <div className="viz-controls">
        {isSparseMode ? (
          <div className="viz-slider-row">
            <span>LINE SLOPE</span>
            <input
              type="range"
              className="viz-slider"
              min={-0.85}
              max={0.85}
              step={0.02}
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
            />
            <span>{slope.toFixed(2)}</span>
          </div>
        ) : (
          <>
            <div className="viz-btn-row">
              <div style={{ display: 'flex', gap: 5 }}>
                <button className={`viz-btn ${pVal === 1 ? 'active' : ''}`} onClick={() => setPVal(1)}>
                  p = 1 (ℓ₁)
                </button>
                <button className={`viz-btn ${pVal === 2 ? 'active' : ''}`} onClick={() => setPVal(2)}>
                  p = 2 (ℓ₂)
                </button>
                <button className={`viz-btn ${pVal >= 20 ? 'active' : ''}`} onClick={() => setPVal(20)}>
                  p = ∞ (ℓ_∞)
                </button>
              </div>
            </div>
            <div className="viz-slider-row">
              <span>NORM p</span>
              <input
                type="range"
                className="viz-slider"
                min={1}
                max={20}
                step={0.1}
                value={pVal}
                onChange={(e) => setPVal(parseFloat(e.target.value))}
              />
              <span>{pVal >= 20 ? '∞' : pVal.toFixed(1)}</span>
            </div>
          </>
        )}
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={
            isSparseMode
              ? `\\arg\\min_{Ax=b}\\|x\\|_1 = (0,\\,1.35)\\text{ (sparse!)}\\quad\\text{vs}\\quad \\ell_2\\text{ dense}`
              : `\\frac{1}{${pVal >= 20 ? '\\infty' : pVal.toFixed(2)}} + \\frac{1}{${
                  qVal >= 40 ? '\\infty' : qVal.toFixed(2)
                }} = 1`
          }
        />
      </div>
    </div>
  );
};
