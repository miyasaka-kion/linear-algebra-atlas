import { ChapterMeta, LearningPath } from './types';

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    title: { en: 'Vector Spaces', zh: '向量空间', ja: 'ベクトル空間' },
    shortTitle: { en: 'Ch.1 Spaces', zh: '1. 向量空间', ja: '1. 空間' },
    color: '#C8836B', // Terracotta (declspec accent)
  },
  {
    id: 2,
    title: { en: 'Finite-Dimensional Vector Spaces', zh: '有限维向量空间', ja: '有限次元ベクトル空間' },
    shortTitle: { en: 'Ch.2 Dimension', zh: '2. 维数与基', ja: '2. 次元と基底' },
    color: '#C9A465', // Warm ochre gold
  },
  {
    id: 3,
    title: { en: 'Linear Maps', zh: '线性映射', ja: '線形写像' },
    shortTitle: { en: 'Ch.3 Linear Maps', zh: '3. 线性映射', ja: '3. 線形写像' },
    color: '#76A695', // Sage teal
  },
  {
    id: 4,
    title: { en: 'Polynomials', zh: '多项式', ja: '多項式' },
    shortTitle: { en: 'Ch.4 Polynomials', zh: '4. 多项式', ja: '4. 多項式' },
    color: '#6E95B8', // Dusty cerulean
  },
  {
    id: 5,
    title: { en: 'Eigenvalues and Eigenvectors', zh: '特征值与特征向量', ja: '固有値と固有ベクトル' },
    shortTitle: { en: 'Ch.5 Eigenvalues', zh: '5. 特征值', ja: '5. 固有値' },
    color: '#9B82C4', // Muted amethyst
  },
  {
    id: 6,
    title: { en: 'Inner Product Spaces', zh: '内积空间', ja: '内積空間' },
    shortTitle: { en: 'Ch.6 Inner Product', zh: '6. 内积空间', ja: '6. 内積空間' },
    color: '#5DA6B3', // Slate cyan
  },
  {
    id: 7,
    title: { en: 'Operators on Inner Product Spaces', zh: '内积空间上的算子', ja: '内積空間上の作用素' },
    shortTitle: { en: 'Ch.7 Spectral & SVD', zh: '7. 谱定理与SVD', ja: '7. スペクトル・SVD' },
    color: '#C4758A', // Dusty rose
  },
  {
    id: 8,
    title: { en: 'Operators on Complex Vector Spaces', zh: '复向量空间上的算子', ja: '複素ベクトル空間上の作用素' },
    shortTitle: { en: 'Ch.8 Jordan Form', zh: '8. Jordan标准型', ja: '8. ジョルダン標準形' },
    color: '#B58963', // Burnished bronze
  },
  {
    id: 9,
    title: { en: 'Multilinear Algebra and Determinants', zh: '多重线性代数与行列式', ja: '多重線形代数と行列式' },
    shortTitle: { en: 'Ch.9 Determinants', zh: '9. 行列式与张量', ja: '9. 行列式・テンソル' },
    color: '#8E9B74', // Olive lichen
  },
];

export const CHAPTER_MAP: Record<number, ChapterMeta> = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, c])
);

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'eigen-no-det',
    title: {
      en: 'Eigenvalues Without Determinants',
      zh: '无行列式特征值主线',
      ja: '行列式を使わない固有値への道',
    },
    description: {
      en: "Axler's signature determinant-free route from vector spaces and polynomials to eigenvalues, upper-triangular matrices, and diagonalizability.",
      zh: 'Axler 最著名的“无行列式”证明主线：从向量空间、线性映射基本定理与多项式分解出发，直达特征值存在性、上三角化与可对角化。',
      ja: '行列式を一切使わず、線形写像の基本定理と多項式の因数分解から固有値の存在・上三角化・対角化へ至る Axler 流の王道ルート。',
    },
    accent: '#9B82C4',
    nodeIds: [
      'vs-def', 'span-def', 'lin-indep', 'basis-def', 'dim-def',
      'lin-map-def', 'fund-thm-lin-maps', 'poly-fact-c', 'invariant-subspace',
      'eigenvalue-def', 'poly-operator', 'eigen-exists-c', 'minimal-poly',
      'upper-triangular', 'diagonalizable',
    ],
  },
  {
    id: 'spectral-svd',
    title: {
      en: 'Spectral Theorem & SVD',
      zh: '谱定理与奇异值分解主线',
      ja: 'スペクトル定理と特異値分解',
    },
    description: {
      en: 'How inner products and orthogonality unlock adjoints, the Real & Complex Spectral Theorems, Positive Operators, SVD, and Polar Decomposition.',
      zh: '从内积与正交性出发，经由 Gram-Schmidt、伴随算子，推导出实/复谱定理、正算子、奇异值分解 (SVD) 与极分解。',
      ja: '内積と直交性からグラム・シュミット、随伴作用素を経て、実・複素スペクトル定理、正作用素、SVD、極分解へ至る幾何学的主線。',
    },
    accent: '#C4758A',
    nodeIds: [
      'inner-prod-def', 'norm-cauchy', 'orthonormal-basis', 'gram-schmidt',
      'riesz-rep', 'ortho-complement', 'adjoint-def', 'self-adjoint',
      'normal-op', 'complex-spectral', 'real-spectral', 'positive-op',
      'unitary-op', 'svd-thm', 'polar-decomp', 'low-rank-approx',
    ],
  },
  {
    id: 'jordan-form',
    title: {
      en: 'Generalized Eigenspaces & Jordan Form',
      zh: '广义特征空间与 Jordan 标准型',
      ja: '広義固有空間とジョルダン標準形',
    },
    description: {
      en: 'When an operator fails to be diagonalizable over C, generalized eigenvectors and nilpotent chains yield the canonical Jordan Form.',
      zh: '当复算子不可对角化时，通过幂零算子与广义特征空间分解，最终得到最简的分块对角结构——Jordan 标准型。',
      ja: '複素作用素が対角化不能な場合、べき零作用素と広義固有空間分解を通じてジョルダン標準形へ到達する経路。',
    },
    accent: '#B58963',
    nodeIds: [
      'eigenvalue-def', 'eigen-exists-c', 'minimal-poly', 'upper-triangular',
      'gen-eigenvector', 'nilpotent-op', 'gen-eigenspace-decomp',
      'char-poly', 'cayley-hamilton', 'block-diag', 'jordan-form', 'trace-def',
    ],
  },
  {
    id: 'duality-quotient',
    title: {
      en: 'Quotients, Duality & Tensors',
      zh: '商空间、对偶与张量积',
      ja: '商空間・双対空間・テンソル積',
    },
    description: {
      en: 'The abstract algebraic arc: quotient spaces, dual functionals, annihilators, bilinear forms, and tensor products.',
      zh: '全书最抽象也最具现代代数美感的一条线：商空间、对偶空间、零化子、双线性形式与第 9 章的张量积。',
      ja: '商空間、双対空間、零化空間、双線形形式、そして第9章のテンソル積へと繋がる現代代数的な抽象化ルート。',
    },
    accent: '#76A695',
    nodeIds: [
      'subspace-def', 'direct-sum', 'lin-map-def', 'fund-thm-lin-maps',
      'quotient-space', 'dual-space', 'dual-map', 'annihilator',
      'bilinear-form', 'tensor-product',
    ],
  },
  {
    id: 'determinants-arc',
    title: {
      en: 'Determinants Done Right (Ch.9)',
      zh: '多重线性视角下的行列式',
      ja: '多重線形代数からの行列式',
    },
    description: {
      en: 'Axler’s modern finale: defining determinants via alternating multilinear forms, proving multiplicativity, and connecting to volume & eigenvalues.',
      zh: '第 9 章的压轴好戏：通过交错多重线性形式自然定义行列式，优雅证明乘积公式，并与特征值、奇异值体积相连。',
      ja: '交代多重線形形式から行列式を自然に定義し、乗法性・固有値・特異値による体積解釈を鮮やかに結びつける最終章。',
    },
    accent: '#8E9B74',
    nodeIds: [
      'matrix-rep', 'invertible-map', 'dual-space', 'svd-thm',
      'volume-singular', 'alt-multilinear', 'det-def', 'det-mult', 'det-eigen',
    ],
  },
];
