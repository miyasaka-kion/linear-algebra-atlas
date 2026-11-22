import React, { useMemo } from 'react';
import { MathTex } from './MathTex';
import { JaText } from './JaText';
import { TheoremRefLink } from './RefLinkContext';

function renderTextWithRefs(
  text: string,
  isJa: boolean,
  furigana: boolean
): React.ReactNode {
  const re = /\b(\d+\.\d+)\b/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      const chunk = text.slice(last, m.index);
      out.push(
        isJa ? (
          <JaText key={k++} text={chunk} furigana={furigana} />
        ) : (
          <React.Fragment key={k++}>{chunk}</React.Fragment>
        )
      );
    }
    out.push(<TheoremRefLink key={k++} refNum={m[1]} />);
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    const chunk = text.slice(last);
    out.push(
      isJa ? (
        <JaText key={k++} text={chunk} furigana={furigana} />
      ) : (
        <React.Fragment key={k++}>{chunk}</React.Fragment>
      )
    );
  }
  return out;
}

interface RichMathTextProps {
  text: string;
  isJa?: boolean;
  furigana?: boolean;
}

const SUB_MAP: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '₊': '+', '₋': '-', 'ᵢ': 'i', 'ⱼ': 'j', 'ₖ': 'k',
  'ₘ': 'm', 'ₙ': 'n', 'ₚ': 'p', 'ₓ': 'x',
};

const SUP_MAP: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-', 'ⁿ': 'n', 'ᵏ': 'k', 'ᵐ': 'm',
  'ⁱ': 'i', 'ʲ': 'j', 'ᵀ': 'T',
};

const SYM_MAP: [RegExp, string][] = [
  [/conj\(([^)]+)\)/g, '\\overline{$1}'],
  [/√\(([^)]+)\)/g, '\\sqrt{$1}'],
  [/√([A-Za-z0-9]+)/g, '\\sqrt{$1}'],
  [/‖([^‖]+)‖/g, '\\|$1\\|'],
  [/⟨/g, '\\langle '],
  [/⟩/g, '\\rangle '],
  [/∑/g, '\\sum '],
  [/∏/g, '\\prod '],
  [/⊕/g, '\\oplus '],
  [/⊗/g, '\\otimes '],
  [/⊥/g, '^{\\perp}'],
  [/†/g, '^{\\dagger}'],
  [/≤/g, '\\le '],
  [/≥/g, '\\ge '],
  [/≠/g, '\\neq '],
  [/≈/g, '\\approx '],
  [/≪/g, '\\ll '],
  [/∈/g, '\\in '],
  [/⊆/g, '\\subseteq '],
  [/⊂/g, '\\subset '],
  [/→/g, '\\to '],
  [/↦/g, '\\mapsto '],
  [/⇒/g, '\\implies '],
  [/⇔/g, '\\iff '],
  [/∀/g, '\\forall '],
  [/∃/g, '\\exists '],
  [/∘/g, '\\circ '],
  [/≼/g, '\\preceq '],
  [/≽/g, '\\succeq '],
  [/≺/g, '\\prec '],
  [/∞/g, '\\infty '],
  [/⋯/g, '\\cdots '],
  [/…/g, '\\dots '],
  [/·/g, '\\cdot '],
  [/−/g, '-'],
  [/ℓ/g, '\\ell '],
  [/λ/g, '\\lambda '],
  [/σ/g, '\\sigma '],
  [/φ/g, '\\varphi '],
  [/δ/g, '\\delta '],
  [/θ/g, '\\theta '],
  [/π/g, '\\pi '],
  [/κ/g, '\\kappa '],
  [/ρ/g, '\\rho '],
  [/μ/g, '\\mu '],
  [/Σ/g, '\\Sigma '],
  [/Λ/g, '\\Lambda '],
  [/î/g, '\\hat{\\imath}'],
  [/ĵ/g, '\\hat{\\jmath}'],
  [/z̄/g, '\\bar{z}'],
  [/T̃/g, '\\tilde{T}'],
  [/′/g, "'"],
];

function unicodeToLatex(raw: string): string {
  let s = raw;

  // Escape literal set braces like {0} or {v : ...} BEFORE introducing LaTeX _{...} / ^{...}
  s = s.replace(/\{([^{}]+)\}/g, '\\{$1\\}');

  // Convert adjoint/conjugate-transpose '*' after letters or ')' to superscript '^{*}'
  s = s.replace(/([A-Za-z0-9)\]])\*/g, '$1^{*}');

  // Convert runs of unicode subscripts -> _{...}
  s = s.replace(/[₀-₉₊₋ᵢⱼₖₘₙₚₓ]+/g, (m) => {
    const inner = [...m].map((c) => SUB_MAP[c] || c).join('');
    return `_{${inner}}`;
  });

  // Convert runs of unicode superscripts -> ^{...}
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿᵏᵐⁱʲᵀ]+/g, (m) => {
    const inner = [...m].map((c) => SUP_MAP[c] || c).join('');
    return `^{${inner}}`;
  });

  // Blackboard bold F^n, R^n, C^n
  s = s.replace(/\b([FRC])\^\{/g, '\\mathbb{$1}^{');

  // Calligraphic L(V, W) and M(T)
  s = s.replace(/\bL\(([^)]+)\)/g, '\\mathcal{L}($1)');
  s = s.replace(/\bM\(([^)]+)\)/g, '\\mathcal{M}($1)');

  // Multi-char subscripts like _min, _max, _op, _polar
  s = s.replace(/_([A-Za-z]{2,})/g, '_{\\mathrm{$1}}');

  // Standard upright math operator names (must NOT be italicized like nullT!)
  s = s.replace(
    /\b(null|range|dim|span|rank|tr|det|diag|deg|vol|arg|min|max)\b/g,
    '\\operatorname{$1}\\,'
  );

  for (const [re, rep] of SYM_MAP) {
    s = s.replace(re, rep);
  }
  return s.trim();
}

const STRONG_MATH_CHAR =
  /[⟨⟩‖∑∏√⊕⊗⊥†≤≥≠≈≪∈⊆⊂→↦⇒⇔∀∃∘≼≽≺∞ℓλσφδθπκρμΣΛîĵ₀-₉₊₋ᵢⱼₖₘₙₚₓ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿᵏᵐⁱʲᵀ]/;

const CJK_OR_PUNCT_RE = /[\u3000-\u303f\u3040-\u30ff\u4e00-\u9fff\uff00-\uffef]/;

// Split text so CJK characters & CJK punctuation (。，、；：（）) are ALWAYS separated from ASCII math tokens!
const SPLIT_TOKENS_RE =
  /[\u3000-\u303f\u3040-\u30ff\u4e00-\u9fff\uff00-\uffef]+|\s+|[^\s\u3000-\u303f\u3040-\u30ff\u4e00-\u9fff\uff00-\uffef]+/g;

const OP_KEYWORDS = /^(?:null|range|dim|span|rank|tr|det|diag|deg|vol|min|max|arg)$/;

function tokenizeAutoMath(segment: string): { kind: 'text' | 'math'; value: string }[] {
  const out: { kind: 'text' | 'math'; value: string }[] = [];
  const rawTokens = segment.match(SPLIT_TOKENS_RE);
  if (!rawTokens) return [{ kind: 'text', value: segment }];

  const isMathToken = (tok: string): boolean => {
    if (/^\s+$/.test(tok)) return false;
    if (CJK_OR_PUNCT_RE.test(tok)) return false;
    if (STRONG_MATH_CHAR.test(tok)) return true;
    if (/^conj\(/.test(tok)) return true;
    if (/^[=+\-<>]$/.test(tok)) return true;
    const stripped = tok.replace(/^[({[]+/, '').replace(/[,;:.!?)}\]]+$/, '');
    if (!stripped) return false;
    if (OP_KEYWORDS.test(stripped)) return true;
    if (
      /^(?:[A-Za-z](?:_[A-Za-z0-9]+)?[*'′]*|[A-Z]\([A-Za-z0-9,*'′ ]+\)|[a-z]\([A-Za-z0-9]+\)|[0-9]+|[A-Z]\/[A-Z]|s\.t\.)$/.test(
        stripped
      )
    ) {
      return true;
    }
    return false;
  };

  let i = 0;
  let textBuf = '';
  const flushText = () => {
    if (textBuf) {
      out.push({ kind: 'text', value: textBuf });
      textBuf = '';
    }
  };

  while (i < rawTokens.length) {
    const tok = rawTokens[i];
    if (isMathToken(tok)) {
      let j = i;
      let run = '';
      let lastMathIdx = i;
      while (j < rawTokens.length) {
        if (isMathToken(rawTokens[j])) {
          run += rawTokens[j];
          lastMathIdx = j;
          j++;
        } else if (
          /^\s+$/.test(rawTokens[j]) &&
          j + 1 < rawTokens.length &&
          isMathToken(rawTokens[j + 1])
        ) {
          run += rawTokens[j];
          j++;
        } else {
          break;
        }
      }

      const trimmed = run.trimEnd();
      const trailMatch = trimmed.match(/([,.;:!?)]+)$/);
      let core = trimmed;
      let trail = '';
      if (trailMatch) {
        const t = trailMatch[1];
        if (
          !t.includes(')') ||
          (core.match(/\(/g)?.length || 0) < (core.match(/\)/g)?.length || 0)
        ) {
          core = trimmed.slice(0, -t.length);
          trail = t;
        }
      }

      const hasStrong =
        STRONG_MATH_CHAR.test(core) ||
        /[=^_⟨⟩‖*†′{}]/.test(core) ||
        /\b[LM]\([^)]+\)/.test(core) ||
        /\b[A-Z]\/[A-Z]\b/.test(core) ||
        /\b(?:null|range|dim|span|rank|tr|det|diag|deg)\s+[A-Za-z(]/.test(core) ||
        /^conj\(/.test(core);

      if (hasStrong && core.length > 0) {
        flushText();
        out.push({ kind: 'math', value: unicodeToLatex(core) });
        if (trail) textBuf += trail;
        i = lastMathIdx + 1;
        continue;
      }
    }
    textBuf += tok;
    i++;
  }
  flushText();
  return out;
}

export const RichMathText: React.FC<RichMathTextProps> = ({
  text,
  isJa = false,
  furigana = false,
}) => {
  const parts = useMemo(() => {
    const out: { kind: 'text' | 'math'; value: string }[] = [];
    const re = /\$([^$\n]+?)\$/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) {
        out.push(...tokenizeAutoMath(text.slice(last, m.index)));
      }
      out.push({ kind: 'math', value: m[1] });
      last = m.index + m[0].length;
    }
    if (last < text.length) {
      out.push(...tokenizeAutoMath(text.slice(last)));
    }
    return out;
  }, [text]);

  return (
    <>
      {parts.map((part, idx) =>
        part.kind === 'math' ? (
          <MathTex key={idx} tex={part.value} className="inline-math" />
        ) : (
          <React.Fragment key={idx}>
            {renderTextWithRefs(part.value, isJa, furigana)}
          </React.Fragment>
        )
      )}
    </>
  );
};
