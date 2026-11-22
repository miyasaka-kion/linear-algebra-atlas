import { ChapterMeta, LearningPath } from '../types';

export const MA_CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    title: { en: 'Linear Algebra Background', zh: '线性代数基础回顾', ja: '線形代数の基礎' },
    shortTitle: { en: 'Ch.1 Background', zh: '1. 基础', ja: '1. 基礎' },
    color: '#9F9B92', // Warm stone
  },
  {
    id: 2,
    title: { en: 'Matrix Factorizations', zh: '矩阵分解体系', ja: '行列分解' },
    shortTitle: { en: 'Ch.2 Factorizations', zh: '2. 矩阵分解', ja: '2. 行列分解' },
    color: '#C4758A', // Dusty rose
  },
  {
    id: 3,
    title: { en: 'Eigenvalues of Hermitian Matrices', zh: 'Hermitian 矩阵特征值与变分', ja: 'エルミート行列の固有値' },
    shortTitle: { en: 'Ch.3 Hermitian', zh: '3. 变分与不等式', ja: '3. エルミート' },
    color: '#9B82C4', // Muted amethyst
  },
  {
    id: 4,
    title: { en: 'Norms & Spectral Radius', zh: '范数、对偶与谱半径', ja: 'ノルムとスペクトル半径' },
    shortTitle: { en: 'Ch.4 Norms', zh: '4. 范数理论', ja: '4. ノルム' },
    color: '#5DA6B3', // Slate cyan
  },
  {
    id: 5,
    title: { en: 'Solving Linear Systems', zh: '线性方程组、条件数与稀疏恢复', ja: '線形方程式・条件数・スパース復元' },
    shortTitle: { en: 'Ch.5 Linear Systems', zh: '5. 条件数与稀疏', ja: '5. 条件数' },
    color: '#C9A465', // Warm ochre
  },
  {
    id: 6,
    title: { en: 'Positive (Semi)Definite Matrices', zh: '正定与半正定矩阵', ja: '半正定値行列' },
    shortTitle: { en: 'Ch.6 PSD', zh: '6. 正半定矩阵', ja: '6. 半正定値' },
    color: '#76A695', // Sage teal
  },
  {
    id: 7,
    title: { en: 'Locations & Perturbations of Eigenvalues', zh: '特征值定位与扰动理论', ja: '固有値の存在領域と摂動' },
    shortTitle: { en: 'Ch.7 Perturbations', zh: '7. 特征值扰动', ja: '7. 摂動論' },
    color: '#B58963', // Burnished bronze
  },
  {
    id: 8,
    title: { en: 'Nonnegative Matrices & Markov Chains', zh: '非负矩阵与马尔可夫链', ja: '非負行列とマルコフ連鎖' },
    shortTitle: { en: 'Ch.8 Perron & Markov', zh: '8. 非负与马尔可夫', ja: '8. ペロン・マルコフ' },
    color: '#C8836B', // Terracotta
  },
  {
    id: 9,
    title: { en: 'Spectral Graph Theory', zh: '谱图论', ja: 'スペクトルグラフ理論' },
    shortTitle: { en: 'Ch.9 Spectral Graph', zh: '9. 谱图论', ja: '9. スペクトルグラフ' },
    color: '#8E9B74', // Olive lichen
  },
];

export const MA_CHAPTER_MAP: Record<number, ChapterMeta> = Object.fromEntries(
  MA_CHAPTERS.map((c) => [c.id, c])
);

export const MA_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'ma-variational',
    title: {
      en: 'Variational Eigenvalue Inequalities',
      zh: 'Hermitian 变分原理与特征值不等式',
      ja: '変分原理と固有値不等式',
    },
    description: {
      en: 'From SVD and Spectral Decomposition to Rayleigh Quotients, Courant–Fischer Min-Max, Weyl’s Inequalities, Cauchy Interlacing, and Majorization.',
      zh: '从 SVD 与谱分解出发，经 Rayleigh 商与 Courant-Fischer 极大极小定理，推导出 Weyl 不等式、Cauchy 交错定理与优超理论。',
      ja: 'SVD・スペクトル分解からレイリー商、クーラン＝フィッシャーのミニマックス定理、ワイルの不等式、コーシーの挟み込み、メジャライゼーションへ。',
    },
    accent: '#9B82C4',
    nodeIds: [
      'ma-svd', 'ma-spectral-polar', 'ma-rayleigh', 'ma-courant-fischer',
      'ma-weyl', 'ma-interlacing', 'ma-majorization', 'ma-schur-horn',
    ],
  },
  {
    id: 'ma-norms-sparse',
    title: {
      en: 'Norms, Condition Numbers & Sparse Recovery',
      zh: '范数对偶、条件数与压缩感知',
      ja: 'ノルム双対・条件数・スパース復元',
    },
    description: {
      en: 'How vector & matrix norms, duality, Gelfand’s spectral radius formula, and unitarily invariant norms power numerical stability and ℓ₁ sparse signal recovery.',
      zh: '从向量范数与对偶范数出发，建立矩阵范数、Gelfand 谱半径公式、酉不变范数，最终直达条件数分析与 ℓ₁ 稀疏信号恢复。',
      ja: 'ベクトル・行列ノルム、双対性、ゲルファントのスペクトル半径公式から、条件数と ℓ₁ スパース信号復元へ至る解析的ルート。',
    },
    accent: '#5DA6B3',
    nodeIds: [
      'ma-vec-norms', 'ma-dual-norms', 'ma-mat-norms', 'ma-spectral-radius',
      'ma-unitary-norms', 'ma-cond-num', 'ma-sparse-recovery',
    ],
  },
  {
    id: 'ma-perron-markov',
    title: {
      en: 'Perron–Frobenius & Markov Chain Mixing',
      zh: 'Perron-Frobenius 与马尔可夫链收敛',
      ja: 'ペロン＝フロベニウスとマルコフ連鎖の収束',
    },
    description: {
      en: 'Nonnegative and irreducible matrices guarantee a dominant positive eigenvalue—governing stationary distributions and mixing times of Markov chains.',
      zh: '非负与不可约矩阵必然存在严格占优的正特征值，直接刻画了马尔可夫链的唯一平稳分布与指数收敛速率。',
      ja: '非負・既約行列の最大正固有値が、マルコフ連鎖の一意な定常分布と混合時間（収束速度）を決定する過程。',
    },
    accent: '#C8836B',
    nodeIds: [
      'ma-spectral-radius', 'ma-nonneg-spec', 'ma-perron',
      'ma-perron-frobenius', 'ma-markov-chains', 'ma-reversible-mixing',
    ],
  },
  {
    id: 'ma-spectral-graph',
    title: {
      en: 'Spectral Graph Theory',
      zh: '谱图论：邻接矩阵与图拉普拉斯',
      ja: 'スペクトルグラフ理論',
    },
    description: {
      en: 'Connecting combinatorial graph connectivity, bipartiteness, and cuts directly to eigenvalues of the adjacency matrix and graph Laplacian.',
      zh: '将图的连通性、二部性与最优图割直接翻译为邻接矩阵与图拉普拉斯矩阵的特征值与 Fiedler 向量。',
      ja: 'グラフの連結性・二部性・カットを隣接行列とグラフラプラシアンの固有値・フィードラーベクトルへ結びつける。',
    },
    accent: '#8E9B74',
    nodeIds: [
      'ma-rayleigh', 'ma-courant-fischer', 'ma-psd-char',
      'ma-perron-frobenius', 'ma-adj-eigen', 'ma-graph-laplacian', 'ma-fiedler',
    ],
  },
];
