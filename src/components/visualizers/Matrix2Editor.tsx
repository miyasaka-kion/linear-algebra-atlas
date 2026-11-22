import React from 'react';
import { Shuffle } from 'lucide-react';

export interface Matrix2Values {
  a: number;
  b: number;
  c: number;
  d: number;
}

interface Matrix2EditorProps {
  value: Matrix2Values;
  onChange: (next: Matrix2Values) => void;
  onRandom?: () => void;
  label?: string;
}

export function randomMatrix2(min = -2, max = 2): Matrix2Values {
  const r = () => Math.round((min + Math.random() * (max - min)) * 10) / 10;
  return { a: r(), b: r(), c: r(), d: r() };
}

export const Matrix2Editor: React.FC<Matrix2EditorProps> = ({
  value,
  onChange,
  onRandom,
  label = 'A =',
}) => {
  const update = (key: keyof Matrix2Values, raw: string) => {
    const parsed = parseFloat(raw);
    if (Number.isNaN(parsed)) return;
    onChange({ ...value, [key]: Math.max(-5, Math.min(5, parsed)) });
  };

  return (
    <div className="mat2-row">
      <div className="mat2-editor">
        <span className="mat2-label">{label}</span>
        <div className="mat2-brackets">
          <div className="mat2-grid">
            <input
              type="number"
              step={0.1}
              className="mat2-input"
              value={value.a}
              onChange={(e) => update('a', e.target.value)}
              aria-label="a11"
            />
            <input
              type="number"
              step={0.1}
              className="mat2-input"
              value={value.b}
              onChange={(e) => update('b', e.target.value)}
              aria-label="a12"
            />
            <input
              type="number"
              step={0.1}
              className="mat2-input"
              value={value.c}
              onChange={(e) => update('c', e.target.value)}
              aria-label="a21"
            />
            <input
              type="number"
              step={0.1}
              className="mat2-input"
              value={value.d}
              onChange={(e) => update('d', e.target.value)}
              aria-label="a22"
            />
          </div>
        </div>
      </div>

      <button
        className="viz-btn"
        onClick={() => (onRandom ? onRandom() : onChange(randomMatrix2()))}
        title="Generate random 2×2 matrix"
      >
        <Shuffle size={11} />
        Random
      </button>
    </div>
  );
};
