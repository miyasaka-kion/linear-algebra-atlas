import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { createTransform, drawArrow, drawBaseGrid, setupHiDPI } from './canvasUtils';
import { MathTex } from '../MathTex';

interface ConditionNumberVizProps {
  preset: string;
}

export const ConditionNumberViz: React.FC<ConditionNumberVizProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sigma2, setSigma2] = useState<number>(0.25);
  const [angle, setAngle] = useState<number>(Math.PI / 2);
  const [playing, setPlaying] = useState<boolean>(true);
  const sigma1 = 1.5;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      setAngle((a) => (a + 0.022) % (Math.PI * 2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const kappa = sigma1 / sigma2;
  const noiseR = 0.35;
  const db = { x: Math.cos(angle) * noiseR, y: Math.sin(angle) * noiseR };
  // A = diag(sigma1, sigma2) => A^{-1} db = (db.x / sigma1, db.y / sigma2)
  const dx = { x: db.x / sigma1, y: db.y / sigma2 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;
    const tr = createTransform(width, height, Math.min(width, height) / 6.2);

    drawBaseGrid(ctx, tr, width, height);

    // Output noise circle ||δb|| = noiseR
    ctx.save();
    ctx.strokeStyle = '#76A695';
    ctx.fillStyle = 'rgba(118, 166, 149, 0.14)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(tr.cx, tr.cy, noiseR * tr.scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Preimage error ellipse A^{-1}(δb)
    ctx.strokeStyle = '#C8836B';
    ctx.fillStyle = 'rgba(200, 131, 107, 0.10)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(
      tr.cx,
      tr.cy,
      (noiseR / sigma1) * tr.scale,
      (noiseR / sigma2) * tr.scale,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#76A695';
    ctx.fillText('● OUTPUT NOISE δb', 12, 20);
    ctx.fillStyle = '#C8836B';
    ctx.fillText('● AMPLIFIED ERROR δx = A⁻¹δb', 12, 35);
    ctx.restore();

    drawArrow(ctx, tr, { x: 0, y: 0 }, dx, '#C8836B', 2.2, 'δx');
    drawArrow(ctx, tr, { x: 0, y: 0 }, db, '#76A695', 2.0, 'δb');
  }, [sigma2, angle, db, dx]);

  return (
    <div>
      <div className="viz-canvas-wrap">
        <canvas ref={canvasRef} className="viz-canvas" />
      </div>
      <div className="viz-controls">
        <div className="viz-btn-row">
          <button
            className={`viz-btn ${playing ? 'active' : ''}`}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={11} /> : <Play size={11} />}
            {playing ? 'Pause' : 'Rotate δb'}
          </button>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--dim)' }}>
            ‖δx‖ / ‖δb‖ = {(Math.hypot(dx.x, dx.y) / noiseR).toFixed(2)}×
          </span>
        </div>
        <div className="viz-slider-row">
          <span>σ₂ (MIN)</span>
          <input
            type="range"
            className="viz-slider"
            min={0.14}
            max={1.5}
            step={0.02}
            value={sigma2}
            onChange={(e) => setSigma2(parseFloat(e.target.value))}
          />
          <span>{sigma2.toFixed(2)}</span>
        </div>
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={`\\sigma_1 = ${sigma1.toFixed(2)},\\; \\sigma_2 = ${sigma2.toFixed(
            2
          )},\\quad \\kappa_2(A) = \\frac{\\sigma_1}{\\sigma_2} = ${kappa.toFixed(2)}`}
        />
      </div>
    </div>
  );
};
