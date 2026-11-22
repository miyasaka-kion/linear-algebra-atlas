import { CrossBookBridge } from './types';

export const CROSS_BOOK_BRIDGES: CrossBookBridge[] = [
  {
    ladrId: 'invertible-map',
    maId: 'ma-similarity',
    note: {
      en: 'Change of basis P⁻¹AP becomes Matrix Similarity (Ch.1)',
      zh: '基变换 P⁻¹AP 延伸为矩阵相似性与不变量 (Ch.1)',
      ja: '基底変換 P⁻¹AP が行列の相似性へ発展 (Ch.1)',
    },
  },
  {
    ladrId: 'svd-thm',
    maId: 'ma-svd',
    note: {
      en: 'LADR’s SVD (7.66) is the starting foundation of Matrix Analysis (2.1)',
      zh: 'LADR 的 SVD (7.66) 成为矩阵分析全书的第一基本定理 (2.1)',
      ja: 'LADR の SVD (7.66) が行列解析の第1基本定理となる (2.1)',
    },
  },
  {
    ladrId: 'pseudoinverse',
    maId: 'ma-moore-penrose',
    note: {
      en: 'Abstract pseudoinverse T† meets explicit SVD form A⁺ = VΣ⁺U*',
      zh: '抽象伪逆 T† 对应矩阵分析中的 Moore-Penrose 逆 A⁺',
      ja: '抽象擬似逆 T† が SVD による A⁺ = VΣ⁺U* と合流',
    },
  },
  {
    ladrId: 'real-spectral',
    maId: 'ma-rayleigh',
    note: {
      en: 'Real Spectral Theorem unlocks Rayleigh–Ritz & Courant–Fischer variational bounds',
      zh: '实谱定理直接开启 Rayleigh 商与 Courant-Fischer 变分不等式',
      ja: '実スペクトル定理がレイリー商と変分不等式を切り開く',
    },
  },
  {
    ladrId: 'complex-spectral',
    maId: 'ma-spectral-polar',
    note: {
      en: 'Complex Spectral Theorem & Polar Decomposition in matrix form',
      zh: '复谱定理与极分解在矩阵分析中的统一表述',
      ja: '複素スペクトル定理と極分解の行列解析版',
    },
  },
  {
    ladrId: 'qr-cholesky',
    maId: 'ma-triangular-fact',
    note: {
      en: 'QR & Cholesky expand into the full Schur / LU triangular hierarchy',
      zh: 'QR 与 Cholesky 扩展为完整的 Schur / LU 三角分解体系',
      ja: 'QR・コレスキー分解が Schur / LU を含む三角分解体系へ拡張',
    },
  },
  {
    ladrId: 'commuting-ops',
    maId: 'ma-simultaneous',
    note: {
      en: 'Commuting operators generalize to simultaneous unitary diagonalization',
      zh: '可交换算子推广为矩阵族的同时酉对角化',
      ja: '可換作用素が同時ユニタリ対角化へ一般化',
    },
  },
  {
    ladrId: 'dual-space',
    maId: 'ma-dual-norms',
    note: {
      en: 'Linear functionals V′ become Dual Norms & Hölder inequalities',
      zh: '对偶空间 V′ 在分析中演化为对偶范数与 Hölder 不等式',
      ja: '双対空間 V′ が双対ノルムとヘルダー不等式へ発展',
    },
  },
  {
    ladrId: 'low-rank-approx',
    maId: 'ma-cond-num',
    note: {
      en: 'Operator norm s₁ & smallest singular value sₙ define Condition Number κ(A)',
      zh: '最大与最小奇异值之比直接定义线性系统的条件数 κ(A)',
      ja: '最大・最小特異値の比が条件数 κ(A) を定義する',
    },
  },
  {
    ladrId: 'positive-op',
    maId: 'ma-psd-char',
    note: {
      en: 'Positive operators expand into Loewner order, PSD cones & Schur products',
      zh: '正算子扩展为 Loewner 偏序、半正定锥与 Schur 乘积定理',
      ja: '正作用素がレヴナー順序・半正定値錐・シューアの積定理へ拡張',
    },
  },
  {
    ladrId: 'tensor-product',
    maId: 'ma-kronecker-hadamard',
    note: {
      en: 'Tensor Product V ⊗ W materializes as Kronecker A ⊗ B & Hadamard A ∘ B',
      zh: '抽象张量积 V ⊗ W 具象化为矩阵的 Kronecker 积与 Hadamard 积',
      ja: 'テンソル積 V ⊗ W がクロネッカー積・アダマール積として具現化',
    },
  },
  {
    ladrId: 'gershgorin',
    maId: 'ma-gershgorin',
    note: {
      en: 'Geršgorin disks deepen into connected-component counting & Bauer–Fike',
      zh: 'Geršgorin 圆盘进一步深化为连通分支计数与 Bauer-Fike 扰动界',
      ja: 'ゲルシュゴリンの円板が連結成分数とバウアー＝ファイク摂動論へ深化',
    },
  },
];
