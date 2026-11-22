import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react';
import { setupHiDPI } from './canvasUtils';
import { MathTex } from '../MathTex';

interface MarkovPerronVizProps {
  preset: string;
}

const MATRICES: Record<string, { P: number[][]; pi: [number, number, number]; lam2: number }> = {
  ergodic: {
    // Fast mixing positive stochastic matrix
    P: [
      [0.4, 0.4, 0.2],
      [0.3, 0.3, 0.4],
      [0.2, 0.5, 0.3],
    ],
    pi: [0.302, 0.395, 0.302],
    lam2: 0.22,
  },
  'slow-mixing': {
    // Near-disconnected slow mixing chain
    P: [
      [0.88, 0.1, 0.02],
      [0.12, 0.84, 0.04],
      [0.03, 0.04, 0.93],
    ],
    pi: [0.36, 0.31, 0.33],
    lam2: 0.9,
  },
};

function stepDist(p: [number, number, number], P: number[][]): [number, number, number] {
  return [
    p[0] * P[0][0] + p[1] * P[1][0] + p[2] * P[2][0],
    p[0] * P[0][1] + p[1] * P[1][1] + p[2] * P[2][1],
    p[0] * P[0][2] + p[1] * P[1][2] + p[2] * P[2][2],
  ];
}

export const MarkovPerronViz: React.FC<MarkovPerronVizProps> = ({ preset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<string>(preset === 'slow-mixing' ? 'slow-mixing' : 'ergodic');
  const [history, setHistory] = useState<[number, number, number][]>([[0.9, 0.06, 0.04]]);
  const [playing, setPlaying] = useState<boolean>(false);

  const spec = MATRICES[mode] || MATRICES.ergodic;
  const current = history[history.length - 1];

  useEffect(() => {
    setMode(preset === 'slow-mixing' ? 'slow-mixing' : 'ergodic');
    setHistory([[0.9, 0.06, 0.04]]);
    setPlaying(false);
  }, [preset]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setHistory((prev) => {
        if (prev.length >= 36) {
          setPlaying(false);
          return prev;
        }
        return [...prev, stepDist(prev[prev.length - 1], spec.P)];
      });
    }, 240);
    return () => clearInterval(id);
  }, [playing, spec.P]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setup = setupHiDPI(canvas);
    if (!setup) return;
    const { ctx, width, height } = setup;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, width, height);

    // Draw 2-simplex triangle (left 60%) and state bars (right 40%)
    const triCx = width * 0.34;
    const triCy = height * 0.56;
    const R = Math.min(width * 0.25, height * 0.42);

    const vA = { x: triCx, y: triCy - R };
    const vB = { x: triCx - R * Math.cos(Math.PI / 6), y: triCy + R * Math.sin(Math.PI / 6) };
    const vC = { x: triCx + R * Math.cos(Math.PI / 6), y: triCy + R * Math.sin(Math.PI / 6) };

    const toTri = (p: [number, number, number]) => ({
      x: p[0] * vA.x + p[1] * vB.x + p[2] * vC.x,
      y: p[0] * vA.y + p[1] * vB.y + p[2] * vC.y,
    });

    // Simplex triangle
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 236, 228, 0.22)';
    ctx.fillStyle = 'rgba(239, 236, 228, 0.025)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(vA.x, vA.y);
    ctx.lineTo(vB.x, vB.y);
    ctx.lineTo(vC.x, vC.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Vertex labels
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#9F9B92';
    ctx.fillText('S₁', vA.x - 6, vA.y - 8);
    ctx.fillText('S₂', vB.x - 16, vB.y + 12);
    ctx.fillText('S₃', vC.x + 6, vC.y + 12);

    // Stationary point π
    const piPt = toTri(spec.pi);
    ctx.strokeStyle = '#76A695';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(piPt.x, piPt.y, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#76A695';
    ctx.fillText('π', piPt.x + 9, piPt.y + 3);

    // Trajectory path
    ctx.strokeStyle = 'rgba(200, 131, 107, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    history.forEach((pt, idx) => {
      const s = toTri(pt);
      if (idx === 0) ctx.moveTo(s.x, s.y);
      else ctx.lineTo(s.x, s.y);
    });
    ctx.stroke();

    // Dots along trajectory
    history.forEach((pt, idx) => {
      const s = toTri(pt);
      ctx.beginPath();
      ctx.arc(s.x, s.y, idx === history.length - 1 ? 4.5 : 2, 0, Math.PI * 2);
      ctx.fillStyle = idx === history.length - 1 ? '#EFECE4' : '#C8836B';
      ctx.fill();
    });

    // Right side: probability distribution bars
    const barX = width * 0.67;
    const barW = width * 0.26;
    const colors = ['#C8836B', '#C9A465', '#5DA6B3'];
    ctx.fillStyle = '#9F9B92';
    ctx.fillText(`STEP k = ${history.length - 1}`, barX, 34);

    current.forEach((val, idx) => {
      const y = 58 + idx * 54;
      ctx.fillStyle = '#9F9B92';
      ctx.fillText(`p_${idx + 1} = ${val.toFixed(3)}`, barX, y);
      // Track
      ctx.fillStyle = 'rgba(239, 236, 228, 0.06)';
      ctx.fillRect(barX, y + 7, barW, 12);
      // Value bar
      ctx.fillStyle = colors[idx];
      ctx.fillRect(barX, y + 7, barW * val, 12);
      // Target π marker
      ctx.fillStyle = '#EFECE4';
      ctx.fillRect(barX + barW * spec.pi[idx] - 1, y + 4, 2, 18);
    });
    ctx.restore();
  }, [history, current, spec]);

  const distErr = Math.hypot(
    current[0] - spec.pi[0],
    current[1] - spec.pi[1],
    current[2] - spec.pi[2]
  );

  return (
    <div>
      <div className="viz-canvas-wrap">
        <canvas ref={canvasRef} className="viz-canvas" />
      </div>
      <div className="viz-controls">
        <div className="viz-btn-row">
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            <button
              className={`viz-btn ${playing ? 'active' : ''}`}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause size={11} /> : <Play size={11} />}
              {playing ? 'Pause' : 'Iterate'}
            </button>
            <button
              className="viz-btn"
              onClick={() => {
                setPlaying(false);
                setHistory((prev) => [...prev, stepDist(prev[prev.length - 1], spec.P)]);
              }}
            >
              <StepForward size={11} />
              Step
            </button>
            <button
              className="viz-btn"
              onClick={() => {
                setPlaying(false);
                setHistory([[0.9, 0.06, 0.04]]);
              }}
            >
              <RotateCcw size={11} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              className={`viz-btn ${mode === 'ergodic' ? 'active' : ''}`}
              onClick={() => {
                setMode('ergodic');
                setHistory([[0.9, 0.06, 0.04]]);
                setPlaying(false);
              }}
            >
              Fast
            </button>
            <button
              className={`viz-btn ${mode === 'slow-mixing' ? 'active' : ''}`}
              onClick={() => {
                setMode('slow-mixing');
                setHistory([[0.9, 0.06, 0.04]]);
                setPlaying(false);
              }}
            >
              Slow
            </button>
          </div>
        </div>
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={`|\\lambda_2| \\approx ${spec.lam2.toFixed(2)},\\quad \\|p_{${
            history.length - 1
          }} - \\pi\\|_2 = ${distErr.toFixed(4)}`}
        />
      </div>
    </div>
  );
};
