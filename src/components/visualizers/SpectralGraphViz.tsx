import React, { useMemo, useState } from 'react';
import { MathTex } from '../MathTex';

interface SpectralGraphVizProps {
  preset: string;
}

// Fixed 6-vertex two-cluster geometry (left triangle 0-1-2, right triangle 3-4-5)
const VERTICES = [
  { id: 0, x: 75, y: 70 },
  { id: 1, x: 55, y: 175 },
  { id: 2, x: 145, y: 125 },
  { id: 3, x: 255, y: 125 },
  { id: 4, x: 345, y: 70 },
  { id: 5, x: 325, y: 175 },
];

const CORE_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 2],
  [3, 4],
  [4, 5],
  [3, 5],
];

const BRIDGE_EDGES: [number, number][] = [
  [2, 3],
  [0, 4],
  [1, 5],
];

// Clean Jacobi symmetric eigenvalue solver for small n×n real symmetric matrices
function jacobiEigen(M: number[][]): { values: number[]; vectors: number[][] } {
  const n = M.length;
  const A = M.map((row) => [...row]);
  const V: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  for (let iter = 0; iter < 60; iter++) {
    let p = 0;
    let q = 1;
    let maxOff = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(A[i][j]) > maxOff) {
          maxOff = Math.abs(A[i][j]);
          p = i;
          q = j;
        }
      }
    }
    if (maxOff < 1e-9) break;
    const diff = A[q][q] - A[p][p];
    const phi = Math.atan2(2 * A[p][q], diff) / 2;
    const c = Math.cos(phi);
    const s = Math.sin(phi);

    for (let i = 0; i < n; i++) {
      if (i !== p && i !== q) {
        const aip = A[i][p];
        const aiq = A[i][q];
        A[i][p] = A[p][i] = c * aip - s * aiq;
        A[i][q] = A[q][i] = s * aip + c * aiq;
      }
    }
    const app = A[p][p];
    const aqq = A[q][q];
    const apq = A[p][q];
    A[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    A[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    A[p][q] = A[q][p] = 0;

    for (let i = 0; i < n; i++) {
      const vip = V[i][p];
      const viq = V[i][q];
      V[i][p] = c * vip - s * viq;
      V[i][q] = s * vip + c * viq;
    }
  }

  const pairs = Array.from({ length: n }, (_, k) => ({
    val: Math.abs(A[k][k]) < 1e-7 ? 0 : A[k][k],
    vec: V.map((row) => row[k]),
  }));
  pairs.sort((a, b) => a.val - b.val);
  return {
    values: pairs.map((x) => x.val),
    vectors: pairs.map((x) => x.vec),
  };
}

export const SpectralGraphViz: React.FC<SpectralGraphVizProps> = () => {
  const [activeBridges, setActiveBridges] = useState<boolean[]>([true, false, false]);

  const { values, fiedler, components } = useMemo(() => {
    const n = VERTICES.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const allEdges: [number, number][] = [
      ...CORE_EDGES,
      ...BRIDGE_EDGES.filter((_, idx) => activeBridges[idx]),
    ];
    for (const [u, v] of allEdges) {
      L[u][u] += 1;
      L[v][v] += 1;
      L[u][v] = -1;
      L[v][u] = -1;
    }
    const { values, vectors } = jacobiEigen(L);
    const fiedler = vectors[1];
    const components = values.filter((v) => v < 1e-4).length;
    return { values, fiedler, components };
  }, [activeBridges]);

  const toggleBridge = (idx: number) => {
    setActiveBridges((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div>
      <div className="viz-canvas-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 400 235" style={{ width: '100%', height: '100%' }}>
          {/* Core cluster edges */}
          {CORE_EDGES.map(([u, v], idx) => (
            <line
              key={`c-${idx}`}
              x1={VERTICES[u].x}
              y1={VERTICES[u].y}
              x2={VERTICES[v].x}
              y2={VERTICES[v].y}
              stroke="rgba(239, 236, 228, 0.3)"
              strokeWidth={1.6}
            />
          ))}

          {/* Clickable bridge edges */}
          {BRIDGE_EDGES.map(([u, v], idx) => {
            const on = activeBridges[idx];
            return (
              <g
                key={`b-${idx}`}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleBridge(idx)}
              >
                {/* Invisible wider hit target */}
                <line
                  x1={VERTICES[u].x}
                  y1={VERTICES[u].y}
                  x2={VERTICES[v].x}
                  y2={VERTICES[v].y}
                  stroke="transparent"
                  strokeWidth={14}
                />
                <line
                  x1={VERTICES[u].x}
                  y1={VERTICES[u].y}
                  x2={VERTICES[v].x}
                  y2={VERTICES[v].y}
                  stroke={on ? '#C9A465' : 'rgba(239, 236, 228, 0.14)'}
                  strokeWidth={on ? 2.2 : 1.2}
                  strokeDasharray={on ? undefined : '5 5'}
                />
              </g>
            );
          })}

          {/* Vertices colored by Fiedler vector v2 sign */}
          {VERTICES.map((v) => {
            const val = fiedler[v.id];
            const color = val >= 0 ? '#C8836B' : '#5DA6B3';
            return (
              <g key={v.id}>
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={15}
                  fill="#0B0B0D"
                  stroke={color}
                  strokeWidth={2}
                />
                <text
                  x={v.x}
                  y={v.y + 3.5}
                  textAnchor="middle"
                  fill="#EFECE4"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {val >= 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                </text>
              </g>
            );
          })}

          <text
            x={14}
            y={20}
            fill="#9F9B92"
            fontSize="9.5"
            fontFamily="JetBrains Mono, monospace"
          >
            CLICK DASHED BRIDGES TO CUT / CONNECT CLUSTERS
          </text>
        </svg>
      </div>
      <div className="viz-controls">
        <div className="viz-btn-row">
          <div style={{ display: 'flex', gap: 5 }}>
            {BRIDGE_EDGES.map((_, idx) => (
              <button
                key={idx}
                className={`viz-btn ${activeBridges[idx] ? 'active' : ''}`}
                onClick={() => toggleBridge(idx)}
              >
                Bridge {idx + 1}: {activeBridges[idx] ? 'ON' : 'OFF'}
              </button>
            ))}
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: components > 1 ? '#C4758A' : '#76A695' }}>
            {components} COMPONENT{components > 1 ? 'S' : ''}
          </span>
        </div>
      </div>
      <div className="viz-telemetry">
        <MathTex
          tex={`\\lambda_1 = 0,\\; \\mathbf{\\lambda_2 = ${values[1].toFixed(
            3
          )}},\\; \\lambda_3 = ${values[2].toFixed(2)},\\; \\dim(\\operatorname{null} L) = ${components}`}
        />
      </div>
    </div>
  );
};
