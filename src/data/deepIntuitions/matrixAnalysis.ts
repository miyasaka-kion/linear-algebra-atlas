import { TrilingualText } from '../types';

export const DEEP_MA: Record<string, TrilingualText> = {
  'ma-similarity': {
    en: 'Think of describing the same sculpture from the front vs from the side: the two photos look completely different, yet they are the exact same 3D object! Similar matrices ($A = SBS^{-1}$) are just different coordinate "photos" of the same underlying transformation—so intrinsic properties like volume ($\\det$), trace, and eigenvalues never change.',
    zh: '就像从正面和侧面拍同一座雕塑，两张照片像素完全不同，但拍的是同一个物体！相似矩阵 $A = SBS^{-1}$ 只是同一线性变换在不同坐标系下的“照片”，所以变换固有的体积 ($\\det$)、迹和特征值绝对不变。',
    ja: '同じ彫刻を正面と横から撮った写真のように、見た目の成分は違っても中身は同じ変換です。だから相似行列 $A = SBS^{-1}$ は固有値・トレース・行列式といった本質的特徴をすべて共有します。',
  },
  'ma-svd': {
    en: 'Meckes proves SVD from pure geometry: walk around the unit sphere and find the direction $v_1$ that $A$ stretches the MOST—call that stretch factor $\\sigma_1$ and the output direction $u_1$. Then restrict to the sphere perpendicular to $v_1$, find the next most-stretched direction $v_2$, and repeat! Every matrix automatically unfolds into perpendicular principal directions.',
    zh: 'Meckes 用最直观的几何方式证明 SVD：在单位球面上绕一圈，找出被矩阵 $A$ 拉得**最长**的那个方向 $v_1$，记下拉伸倍数 $\\sigma_1$ 和输出方向 $u_1$；然后在垂直于 $v_1$ 的剩余球面上继续找第二长的方向 $v_2$，一路剥洋葱下去——任何矩阵就这样自然展开成 SVD！',
    ja: '単位球面上で $A$ によって最も大きく引き伸ばされる方向 $v_1$ を探し、次に $v_1$ に垂直な方向の中から2番目に大きく伸びる $v_2$ を探す——この繰り返しだけで、すべての行列が自動的に SVD へ分解されます！',
  },
  'ma-moore-penrose': {
    en: 'If a matrix stretches axis 1 by $5$, stretches axis 2 by $2$, and crushes axis 3 to $0$, how do you "invert" it as cleanly as possible? Shrink axis 1 by $1/5$, shrink axis 2 by $1/2$, and leave crushed axis 3 at $0$! That’s literally all $A^+ = V\\Sigma^+ U^*$ does.',
    zh: '如果一个矩阵把第 1 轴拉长 5 倍、第 2 轴拉长 2 倍、把第 3 轴压成 0，怎么尽可能“求逆”？很简单：第 1 轴缩回 $1/5$、第 2 轴缩回 $1/2$，压扁的第 3 轴保持为 0！这就是 Moore-Penrose 伪逆 $A^+ = V\\Sigma^+ U^*$ 的全部秘密。',
    ja: '第1軸を5倍、第2軸を2倍にし、第3軸を0に潰す行列を「できるだけ逆に戻す」には、第1軸を $1/5$、第2軸を $1/2$ に戻し、潰れた第3軸は0のままにします。それが $A^+ = V\\Sigma^+ U^*$ の正体です。',
  },
  'ma-spectral-polar': {
    en: 'Once you already have SVD ($A = U\\Sigma V^*$), Polar Decomposition takes literally ONE line of clever insertion: $A = (UV^*)(V\\Sigma V^*)$. The left piece $UV^*$ is a pure rotation (unitary), and the right piece $V\\Sigma V^*$ is a pure symmetric stretch ($|A|$)!',
    zh: '手握 SVD ($A = U\\Sigma V^*$) 之后，极分解只需玩一个小魔术——在中间插入一个 $V^*V = I$，立刻变成 $A = (UV^*)(V\\Sigma V^*)$：左边 $UV^*$ 是纯刚体旋转，右边 $V\\Sigma V^*$ 是纯对称拉伸 $|A|$！',
    ja: 'SVD ($A = U\\Sigma V^*$) の真ん中に $V^*V = I$ を差し込むだけで $A = (UV^*)(V\\Sigma V^*)$ が現れます。左が純粋な回転、右が純粋な対称伸縮 $|A|$ という1行の魔法です！',
  },
  'ma-triangular-fact': {
    en: 'Why are there so many triangular factorizations (Schur, QR, Cholesky, LU)? Because solving an upper-triangular equation is trivial (just solve from bottom row up, one variable at a time!). Each factorization is a specialized tool: LU for general speed, QR for numerical stability, Cholesky for symmetric positive matrices, Schur for eigenvalue analysis.',
    zh: '为什么有这么多三角分解（Schur、QR、Cholesky、LU）？因为解三角方程组太容易了（从最后一行往上逐个代入即可）！它们是不同场景的专用扳手：LU 通用最快，QR 数值最稳，Cholesky 专治正定阵，Schur 专攻理论特征值分析。',
    ja: '三角行列の方程式は下から順に代入するだけで簡単に解けるため、用途別に4つの道具が用意されています：汎用高速な LU、数値安定な QR、正定値専用のコレスキー、固有値理論用の Schur です。',
  },
  'ma-simultaneous': {
    en: 'If two matrices commute ($AB = BA$), applying $B$ never scrambles the eigenspaces of $A$. That means you can find ONE single camera angle (unitary basis $U$) from which BOTH $A$ and $B$ look triangular (or diagonal, if normal) at the exact same time!',
    zh: '如果两个矩阵可交换 ($AB = BA$)，$B$ 绝不会打乱 $A$ 的特征空间。这意味着存在**同一个**规范正交视角 $U$，站在这个视角看过去，$A$ 和 $B$ 同时变成整齐的上三角阵（正规时同时变成对角阵）！',
    ja: '2つの行列が可換 ($AB = BA$) なら、ただ1つの正規直交カメラアングル $U$ から眺めるだけで、$A$ も $B$ も同時に綺麗な上三角（正規なら対角）に見えます！',
  },
  'ma-rayleigh': {
    en: 'Imagine a hilly landscape wrapped around a unit sphere, where the altitude at direction $x$ is the Rayleigh quotient $\\langle Ax, x \\rangle$. The highest mountain peak is $\\lambda_{\\max}$ (pointing along the top eigenvector), and the deepest valley is $\\lambda_{\\min}$! You can estimate eigenvalues just by sampling altitudes on the sphere.',
    zh: '想象把一片起伏的地形包在单位球面上，方向 $x$ 处的海拔高度就是 Rayleigh 商 $\\langle Ax, x \\rangle$。最高峰的海拔恰好是最大特征值 $\\lambda_{\\max}$，最低谷的海拔是最小特征值 $\\lambda_{\\min}$！只需在球面上找极值，就能直接框定特征值。',
    ja: '単位球面上の各地点 $x$ の「標高」がレイリー商 $\\langle Ax, x \\rangle$ だと想像してください。最高峰の標高が最大固有値 $\\lambda_{\\max}$、最深部の谷底が最小固有値 $\\lambda_{\\min}$ にピタリと一致します！',
  },
  'ma-courant-fischer': {
    en: 'How do you find the SECOND highest peak ($\\lambda_2$) on a mountain range without knowing where peak #1 is? Think of a two-player game: Player 1 picks any 2D slice through the origin, and Player 2 picks the LOWEST point on that slice. Player 1’s best possible guaranteed score is ALWAYS $\\lambda_2$! This clever min-max game lets you prove inequalities for EVERY $\\lambda_k$ effortlessly.',
    zh: '不知道第一高峰在哪里，怎么直接定位第二高峰 $\\lambda_2$？玩一个双人博弈：甲任选一个二维切片，乙在这个切片上挑海拔**最低**的点。不管甲怎么选，甲能保底拿到的最高分**恰好就是 $\\lambda_2$**！这个极大极小博弈让我们无需算特征向量就能直接证明所有 $\\lambda_k$ 的不等式！',
    ja: '1番高い山を知らずに2番目の固有値 $\\lambda_2$ を見つける2人ゲームです。先手が2次元断面を選び、後手がその断面で一番低い点を選びます。先手が確保できる最高スコアが必ず $\\lambda_2$ に一致します！',
  },
  'ma-weyl': {
    en: 'Suppose your true symmetric matrix $A$ gets corrupted by small measurement noise $E$ (with strength at most $0.01$). Weyl’s theorem guarantees that EVERY SINGLE eigenvalue of $A + E$ moves by at most $0.01$! Unlike non-symmetric matrices, Hermitian eigenvalues are rock-solid against noise.',
    zh: '假如你测得的对称矩阵 $A$ 混进了幅度不超过 $0.01$ 的微小噪声 $E$。Weyl 定理拍胸脯保证：$A + E$ 的**每一个特征值**偏移都不会超过 $0.01$！对称矩阵的特征值面对噪声稳如泰山。',
    ja: '対称行列 $A$ に大きさ $0.01$ 以下のノイズ $E$ が混ざっても、ワイルの定理によりすべての固有値のズレは必ず $0.01$ 以内に収まります。エルミート行列の固有値はノイズに極めて強いのです！',
  },
  'ma-interlacing': {
    en: 'Think of a guitar string vibrating at harmonic frequencies $\\lambda_1, \\lambda_2, \\lambda_3, \\dots$. If you press ONE finger lightly on the string (imposing 1 linear constraint = deleting 1 row & column from $A$), every new resonant frequency sits neatly trapped BETWEEN two adjacent old frequencies!',
    zh: '想象一根吉他弦原本有共振频率 $\\lambda_1 \\ge \\lambda_2 \\ge \\lambda_3 \\dots$。现在用一根手指按住琴弦（施加一个线性约束 = 删去矩阵的一行和对应一列得到主子阵 $B$），新琴弦的每个频率都会严严实实地**交错夹在**原来相邻两个频率之间！',
    ja: 'ギターの弦を指で1か所押さえる（1つの線形制約＝主小行列をとる）と、新しい固有振動数は必ず元の隣り合う固有振動数の「ちょうど間」に交互に挟み込まれます！',
  },
  'ma-majorization': {
    en: 'Compare two ways to split $\\$100$ among 4 people: $(100, 0, 0, 0)$ is extreme inequality, while $(25, 25, 25, 25)$ is perfectly even. Transferring money from a richer person to a poorer person makes the list "more spread out" (majorized: $x \\prec y$). Birkhoff’s theorem says you can get ANY more-even distribution by averaging shuffled versions of the original list!',
    zh: '把 100 元分给 4 个人：$(100,0,0,0)$ 最极端，$(25,25,25,25)$ 最平均。每次“劫富济贫”把钱从多的人分一点给少的人，分布就变得更均匀（被优超 $x \\prec y$）。Birkhoff 定理说，任何更均匀的分布都等价于把原列表随机洗牌后再做加权平均！',
    ja: '100円を4人で分けるとき、$(100,0,0,0)$ より $(25,25,25,25)$ の方が均一です。多い人から少ない人へ分け与えてより均一になった状態が「優越される ($x \\prec y$)」であり、元の並び替えの平均（二重確率行列）で表せます。',
  },
  'ma-schur-horn': {
    en: 'Take a diagonal matrix whose entries are $(10, 0)$—those are its eigenvalues. Now rotate it by $45^\\circ$ into a new orthonormal basis: the new diagonal entries become $(5, 5)$! Rotating away from the eigenbasis ALWAYS averages the eigenvalues inward—never making the diagonal entries more extreme than the eigenvalues.',
    zh: '拿一个特征值为 $(10, 0)$ 的对角阵，旋转 $45^\\circ$ 换到另一组正交基下，新矩阵的对角元变成了 $(5, 5)$！Schur-Horn 定理说：换基永远只会把特征值往中间“抹平平均”，对角元绝不可能比特征值更极端！',
    ja: '固有値 $(10, 0)$ の対角行列を $45^\\circ$ 回転すると対角成分は $(5, 5)$ になります。基底を回転させると対角成分は必ず固有値より平均化（内側に寄る）され、極端になることは決してありません。',
  },
  'ma-vec-norms': {
    en: 'How far is it from $(0,0)$ to $(3,4)$? A crow flying straight measures $\\ell_2 = 5$ (circle). A taxi driving Manhattan streets measures $\\ell_1 = 3 + 4 = 7$ (diamond). A chess king moving diagonally measures $\\ell_\\infty = \\max(3, 4) = 4$ (square)! Different norms are just different ways of measuring distance—and on $\\mathbb{R}^n$, they always agree up to a fixed conversion factor.',
    zh: '从 $(0,0)$ 到 $(3,4)$ 有多远？鸟直线飞是欧氏距离 $\\ell_2 = 5$（圆）；出租车走网格街区是曼哈顿距离 $\\ell_1 = 3+4 = 7$（菱形）；国际象棋的国王可以走斜线，只需 $\\ell_\\infty = \\max(3,4) = 4$ 步（正方形）！不同范数就是不同的测距尺，而在有限维空间里它们彼此只差常数倍。',
    ja: '$(0,0)$ から $(3,4)$ までの距離は、鳥の直線飛行なら $\\ell_2 = 5$（円）、街の碁盤道路を行くタクシーなら $\\ell_1 = 7$（ひし形）、斜め移動できるチェスのキングなら $\\ell_\\infty = 4$（正方形）！ノルムは距離の測り方の違いです。',
  },
  'ma-dual-norms': {
    en: 'Imagine you have a budget of $\\|x\\| \\le 1$ (inside a chosen norm ball) and you want to maximize your score $\\langle x, y \\rangle$ against a reward vector $y$. That maximum achievable score IS the dual norm $\\|y\\|_*$! If your budget is a square ($\\ell_\\infty$: each coordinate $\\le 1$), you max out every slot to $\\pm 1$, scoring $\\sum |y_i| = \\|y\\|_1$—so $\\ell_\\infty$ and $\\ell_1$ are exact duals!',
    zh: '假如你的预算被限制在某个单位球 $\\|x\\| \\le 1$ 内，想让收益 $\\langle x, y \\rangle$ 最大化，你能拿到的最高分就是**对偶范数** $\\|y\\|_*$！如果预算框是正方形 ($\\ell_\\infty$，每个分量都能取 $\\pm 1$)，最优策略就是每项全拉满，总得分正好是 $\\sum |y_i| = \\|y\\|_1$——所以 $\\ell_\\infty$ 和 $\\ell_1$ 互为对偶！',
    ja: '予算 $\\|x\\| \\le 1$ の中で報酬 $\\langle x, y \\rangle$ を最大化したときの最高スコアが双対ノルム $\\|y\\|_*$ です。各成分を $\\pm 1$ まで使える正方形 ($\\ell_\\infty$) なら最高スコアは $\\sum |y_i| = \\|y\\|_1$ となり、$\\ell_\\infty$ と $\\ell_1$ が双対になります！',
  },
  'ma-mat-norms': {
    en: 'How "big" is a matrix $A$? Feed every unit-length arrow ($\\|x\\| = 1$) into $A$ and see what the LONGEST output arrow is—that worst-case stretch factor is the induced operator norm $\\|A\\|$! Submultiplicativity ($\\|AB\\| \\le \\|A\\|\\|B\\|$) simply says: stretching by at most $3\\times$ and then at most $4\\times$ can stretch by at most $12\\times$.',
    zh: '怎么衡量一个矩阵有多“大”？把所有长度为 1 的箭头喂给矩阵 $A$，看输出最长的那个箭头有多长——这个最坏情况下的最大放大倍数就是诱导算子范数 $\\|A\\|$！次可乘性 $\\|AB\\| \\le \\|A\\|\\|B\\|$ 意思更直白：最多放大 3 倍再最多放大 4 倍，合起来绝不会超过 12 倍。',
    ja: '長さ1のあらゆる矢印を $A$ に通したときの「最大伸長率」が誘導作用素ノルム $\\|A\\|$ です。劣乗法性 $\\|AB\\| \\le \\|A\\|\\|B\\|$ は「最大3倍してから最大4倍しても合計12倍以下」という当然の事実です。',
  },
  'ma-spectral-radius': {
    en: 'Suppose you apply a matrix $A$ over and over: $A, A^2, A^3, \\dots, A^{1000}$. Does it blow up to infinity or shrink to zero? The spectral radius $\\rho(A)$ (the largest eigenvalue magnitude) is the ONLY number that decides its long-term fate: if $\\rho(A) < 1$, it ALWAYS dies out to 0; if $\\rho(A) > 1$, it ALWAYS explodes!',
    zh: '把一个矩阵反复连乘 $A, A^2, A^3, \\dots, A^{1000}$，最终会爆炸到无穷大还是衰减到零？决定长期命运的唯一开关就是谱半径 $\\rho(A)$（最大特征值的模长）：只要 $\\rho(A) < 1$，哪怕前几步会暂时变大，长期必定归零；只要 $\\rho(A) > 1$，长期必定爆炸！',
    ja: '行列を何百回も掛けた $A^k$ が最終的に 0 へ消えるか無限大へ爆発するかを決める唯一の指標がスペクトル半径 $\\rho(A)$（最大固有値の絶対値）です。$\\rho(A) < 1$ なら必ず消滅し、$> 1$ なら爆発します！',
  },
  'ma-unitary-norms': {
    en: 'A matrix norm is "unitarily invariant" if rotating the input or output space ($UAV$) does NOT change the matrix’s size—meaning it can ONLY depend on the singular values $\\sigma_1, \\dots, \\sigma_n$! Taking the $\\ell_\\infty$ of singular values gives operator norm; $\\ell_2$ gives Frobenius; $\\ell_1$ gives the Nuclear norm (the convex stand-in for rank!).',
    zh: '如果旋转输入或输出坐标系 ($UAV$) 不改变矩阵的大小，那这个范数就只能取决于奇异值 $\\sigma_1, \\dots, \\sigma_n$！对奇异值取最大值是算子范数，取平方和开根是 Frobenius 范数，直接求和 ($\\ell_1$) 就是大名鼎鼎的**核范数**——推荐系统里用来逼近低秩矩阵的神器！',
    ja: '回転 $UAV$ で値が変わらない行列ノルムは特異値 $\\sigma_k$ だけで決まります。特異値の最大値が作用素ノルム、2乗和の平方根がフロベニウスノルム、そして総和 ($\\ell_1$) が行列補完で大活躍する「核ノルム」です！',
  },
  'ma-cond-num': {
    en: 'Imagine trying to find where two nearly parallel train tracks intersect: if one track wobbles by just 1 millimeter ($\\delta b$), the intersection point jumps by 10 meters ($\\delta x$)! That sensitivity multiplier is the condition number $\\kappa(A) = \\sigma_{\\max}/\\sigma_{\\min}$. When $\\kappa(A) = 1$ (orthogonal matrix), noise isn’t amplified at all; when $\\kappa(A) = 10^8$, even tiny floating-point rounding destroys your answer!',
    zh: '想象找两条几乎平行的铁轨的交点：只要其中一根铁轨抖动 1 毫米 ($\\delta b$)，交点位置就会狂飙 10 米 ($\\delta x$)！这个“误差放大器倍数”就是条件数 $\\kappa(A) = \\sigma_{\\max}/\\sigma_{\\min}$。正交矩阵 $\\kappa=1$ 完全不放大误差；而病态矩阵 $\\kappa=10^8$ 时，连电脑的微小舍入误差都会把答案彻底毁掉！',
    ja: 'ほぼ平行な2本の線路の交点を探すとき、線路が1ミリずれただけで交点は10メートルも飛びます！この誤差増幅倍率が条件数 $\\kappa(A) = \\sigma_{\\max}/\\sigma_{\\min}$ です。$\\kappa=1$ なら誤差は増えず、大きいほど計算結果がノイズで崩壊します。',
  },
  'ma-sparse-recovery': {
    en: 'How can an MRI scanner take 5× fewer measurements and still reconstruct a sharp brain image? Because real images are SPARSE (mostly zeros in a suitable basis). Among all solutions to the underdetermined equation $Ax = b$, minimizing the $\\ell_1$ norm inflates a pointy diamond until it touches the solution plane—and a pointy diamond almost always hits a corner right on a coordinate axis (zeros everywhere else)!',
    zh: '为什么核磁共振 (MRI) 只采集 1/5 的数据就能还原高清图像？因为真实信号是**稀疏**的（绝大多数分量为 0）。在无穷多个满足 $Ax = b$ 的解里，最小化 $\\ell_1$ 范数相当于吹大一个带尖角的菱形去碰解平面——尖角正好长在坐标轴上，所以首次碰到的点几乎必然是大量分量为 0 的稀疏真解！',
    ja: 'MRI が少ないデータから鮮明な画像を復元できる秘密です！解の直線 $Ax = b$ に向かって $\\ell_1$ ひし形を膨らませると、座標軸上に尖った角があるため、最初にぶつかる点が「ほとんどの成分が 0 のスパース解」になるのです！',
  },
  'ma-psd-char': {
    en: 'A positive semidefinite (PSD) matrix is one whose energy bowl $x^*Ax$ NEVER dips below zero in any direction—just like variance $\\operatorname{Var}(X) \\ge 0$ can never be negative! Writing $A \\succeq B$ means "$A$’s energy bowl sits completely above $B$’s bowl in every direction."',
    zh: '半正定矩阵就是能量碗 $x^*Ax$ 在任何方向上都**绝不低于 0**——就像方差永远非负一样！矩阵偏序 $A \\succeq B$ 意思极其直观：$A$ 的能量碗在所有方向上都稳稳盖在 $B$ 的能量碗上面。',
    ja: '半正定値行列とは、どの方向 $x$ でもエネルギー $x^*Ax \\ge 0$ が負にならない行列（分散が常に非負なのと同じ）です。$A \\succeq B$ は「すべての方向で $A$ の方が $B$ より大きい」という行列の大小関係です。',
  },
  'ma-kronecker-hadamard': {
    en: 'The Kronecker product $A \\otimes B$ replaces each number $a_{ij}$ with a scaled copy $a_{ij}B$ (building a giant block matrix). The Hadamard product $A \\circ B$ is the naive element-by-element multiplication beginners first guess! Amazingly, $A \\circ B$ sits right inside $A \\otimes B$ as a principal submatrix—proving instantly that multiplying two PSD covariance/kernel matrices entrywise ALWAYS stays PSD!',
    zh: 'Kronecker 积 $A \\otimes B$ 是把每个元素 $a_{ij}$ 替换成整块 $a_{ij}B$；Hadamard 积 $A \\circ B$ 则是初学者最容易猜错的“对应位置直接相乘”。神奇的是，$A \\circ B$ 恰好藏在 $A \\otimes B$ 里面当主子阵——瞬间证明两个半正定核矩阵逐元素相乘依然半正定！',
    ja: 'クロネッカー積 $A \\otimes B$ は各成分を丸ごと行列 $a_{ij}B$ に置き換えた巨大行列。実は初心者が思い浮かべる成分積（アダマール積 $A \\circ B$）はその主小行列として中に隠れており、半正定値行列同士の成分積が常に半正定値になることが一瞬で分かります！',
  },
  'ma-psd-ineq': {
    en: 'Hadamard’s inequality ($\\det A \\le \\prod a_{ii}$) is pure geometry: the volume of a slanted box is ALWAYS less than or equal to multiplying its edge lengths (with equality ONLY when all edges meet at $90^\\circ$!). And watch out for non-commuting matrices: $0 \\preceq B \\preceq A$ guarantees $\\sqrt{B} \\preceq \\sqrt{A}$, yet $B^2 \\preceq A^2$ can fail!',
    zh: 'Hadamard 不等式 $\\det A \\le \\prod a_{ii}$ 背后是朴素几何：歪斜平行六面体的体积永远不超过“各条棱长直接相乘”，只有棱两两垂直时才取等号！另外矩阵世界有个著名陷阱：$0 \\preceq B \\preceq A$ 能推出 $\\sqrt{B} \\preceq \\sqrt{A}$，但两边同时平方 $B^2 \\preceq A^2$ 却可能翻车！',
    ja: 'アダマールの不等式は「斜めの箱の体積は、各辺の長さを掛けたもの（直方体）を超えない」という幾何的事実です。また非可換な行列では $B \\preceq A$ から $\\sqrt{B} \\preceq \\sqrt{A}$ は言えるのに $B^2 \\preceq A^2$ は成り立たないことがあるという驚きがあります！',
  },
  'ma-gershgorin': {
    en: 'Not only do all eigenvalues live inside the union of Gershgorin disks, they ALSO obey a conservation-of-population rule: if 3 disks overlap into one island completely separated from the other disks, then that island MUST contain **exactly 3** eigenvalues! You can prove this by slowly shrinking the off-diagonal entries to 0—eigenvalues move continuously and can never teleport across empty ocean.',
    zh: '不仅所有特征值都住在圆盘里，而且满足“人口守恒”：如果 3 个圆盘连成一座孤岛，和其他圆盘完全隔海相望，那这座孤岛里**不多不少恰好住着 3 个特征值**！把非对角元连续缩小到 0，特征值只能连续游动，绝不可能瞬间瞬移跨过空白海域。',
    ja: '円板が3つ重なって他の円板から離れた「孤島」を作っていれば、その島にはちょうど3個の固有値が住んでいます。非対角成分を連続的に 0 へ縮めても固有値は海をワープできないからです！',
  },
  'ma-bauer-fike': {
    en: 'Earlier, Weyl promised Hermitian eigenvalues move by at most $\\|E\\|$. What if $A = S\\Lambda S^{-1}$ is NOT Hermitian? Bauer–Fike shows the penalty factor is $\\kappa(S)$—how skewed the eigenvector basis is! If the eigenvectors are nearly parallel ($\\kappa(S) = 10^6$), even a $10^{-6}$ perturbation can send eigenvalues flying across the plane!',
    zh: '前面 Weyl 保证了对称矩阵特征值偏移不超过 $\\|E\\|$。如果不是对称阵呢？Bauer-Fike 指出要乘以一个惩罚系数 $\\kappa(S)$——也就是特征基有多歪斜！如果特征向量几乎挤成一条线（$\\kappa(S)=10^6$），哪怕 $10^{-6}$ 的微小扰动都会让特征值满天乱飞！',
    ja: 'エルミートでない行列 $A = S\\Lambda S^{-1}$ にノイズ $E$ を加えると、固有値のズレは固有基底の歪み具合 $\\kappa(S)$ 倍まで増幅されます。固有ベクトルがほぼ平行だと、微小ノイズで固有値が大きく飛び散ります！',
  },
  'ma-nonneg-spec': {
    en: 'Suppose every row of a nonnegative matrix $A$ sums to something between $3$ and $5$. That means every step multiplies totals by at least $3$ and at most $5$—so the long-term growth rate $\\rho(A)$ is automatically trapped between $3$ and $5$! For a probability matrix where every row sums to $1$, $\\rho(P)$ is instantly locked to $1$.',
    zh: '如果一个非负矩阵每行之和都在 3 到 5 之间，说明每迭代一步总量至少放大 3 倍、至多放大 5 倍，那么长期增长率 $\\rho(A)$ 自然被夹在 3 和 5 之间！对于每行之和都等于 1 的概率转移矩阵，谱半径立刻锁死在 1。',
    ja: '非負行列の各行の和がすべて 3 から 5 の間なら、全体の成長率 $\\rho(A)$ も必ず 3 と 5 の間に収まります。すべての行和が 1 の確率行列なら、即座に $\\rho(P) = 1$ が確定します！',
  },
  'ma-perron': {
    en: 'Imagine a network of cities where money flows between EVERY pair of cities with strictly positive rates ($A > 0$). Perron’s theorem says there is ONE unique winning wealth distribution $v > 0$ (all positive!) that simply grows by $\\rho(A)$ every year, and NO MATTER how wealth starts out, after many years it ALWAYS converges to that exact same ratio!',
    zh: '想象几座城市之间两两都有严格为正的资金流动 ($A > 0$)。Perron 定理保证：存在唯一一种全正的稳态财富比例 $v > 0$，每年整体增长 $\\rho(A)$ 倍；而且**无论一开始钱怎么分配**，跑足够多年后，各城市的财富占比都会自动收敛到这同一个唯一比例！',
    ja: 'すべての都市間で正の割合でお金が行き来しているとき ($A > 0$)、初期配分がどうであっても長い年月が経つと、必ずただ1つの正の平衡比率 $v > 0$ に収束する——これがペロンの定理の力です！',
  },
  'ma-perron-frobenius': {
    en: 'Even if not every pair of web pages links directly to every other page (lots of zeros in the matrix!), as long as you can eventually click from ANY page to ANY other page (irreducible = strongly connected), Perron–Frobenius STILL guarantees a unique positive ranking eigenvector—that is literally how Google’s PageRank ranks the entire internet!',
    zh: '现实中矩阵往往充满 0（比如网页之间不会两两互链）。但只要从任意网页出发最终都能通过点击到达其他任何网页（强连通 = 不可约），Perron-Frobenius 定理依然保证存在唯一全正的主特征向量——这正是 Google PageRank 给整个互联网网页排名的数学心脏！',
    ja: 'すべてのページが直接リンクし合っていなくても（成分に0が多くても）、クリックを辿ってどのページからでも他へ行ける（強連結＝既約）なら、一意な正の主固有ベクトルが存在します——Google PageRank の心臓部です！',
  },
  'ma-markov-chains': {
    en: 'Imagine a frog hopping randomly between 3 lily pads according to fixed probabilities $P$. Row $i$ lists the probabilities of where it jumps next from pad $i$. As long as the frog can reach every pad and isn’t stuck in a rigid rhythm (primitive), after enough hops the probability of finding the frog on each pad settles to one unique equilibrium $\\pi$—completely forgetting which pad it started on!',
    zh: '想象一只青蛙在 3 片荷叶间按固定概率矩阵 $P$ 随机跳跃。只要荷叶两两可达且不会陷入死板周期循环，跳足够多步后，青蛙落在每片荷叶上的概率就会稳定到唯一平衡分布 $\\pi$——完全忘掉它最初是从哪片荷叶起跳的！',
    ja: '3枚のハスの葉の間を確率行列 $P$ に従ってカエルがランダムに飛び跳ねるとき、どの葉にも到達できて周期的でなければ、十分多くのジャンプの後に各葉にいる確率は初期位置を忘れて一意の定常分布 $\\pi$ へ落ち着きます！',
  },
  'ma-reversible-mixing': {
    en: 'When a Markov chain is "reversible" (traffic from $i \\to j$ equals traffic from $j \\to i$ at equilibrium), you can rescale it into a real symmetric matrix! Then the second-largest eigenvalue $|\\lambda_2|$ tells you how fast the chain mixes: if $|\\lambda_2| = 0.2$, errors shrink by $5\\times$ every step (fast mixing); if $|\\lambda_2| = 0.99$, it has a bottleneck and takes hundreds of steps to mix!',
    zh: '如果马尔可夫链满足可逆性（平衡时从 $i$ 到 $j$ 的人流量等于从 $j$ 到 $i$ 的人流量），就能把它变形成实对称阵！此时第二大特征值 $|\\lambda_2|$ 直接决定混合速度：$|\\lambda_2| = 0.2$ 时每步误差缩小 5 倍（秒速收敛）；$|\\lambda_2| = 0.99$ 说明图里有瓶颈，得走几百步才混匀！',
    ja: '平衡時に $i \\to j$ と $j \\to i$ の流量が釣り合う（可逆）と、実対称行列へ変換できます。第2固有値 $|\\lambda_2|$ が小さいほど急速に混ざり合い、$1$ に近いほどボトルネックがあって収束が遅くなります！',
  },
  'ma-adj-eigen': {
    en: 'Encode a social network as a $0/1$ matrix $A$ ($1$ if friends, $0$ otherwise). Multiplying $A$ by itself ($A^2$) counts 2-step "friend-of-a-friend" paths; $A^3$ counts triangles! And if a graph can be split into two opposing teams with edges ONLY between teams (bipartite), flipping the sign on one team turns every eigenvector $\\lambda$ into $-\\lambda$—making the spectrum perfectly mirror-symmetric!',
    zh: '把社交网络写成 $0/1$ 邻接矩阵 $A$（认识写 1）。$A^2$ 算的是“朋友的朋友”路径数，$A^3$ 的对角线之和直接数出朋友圈里的三角形个数！如果图能分成互不内斗的两大阵营（二部图），把其中一个阵营取负号就能把特征值 $\\lambda$ 变成 $-\\lambda$，于是谱关于 0 完美对称！',
    ja: '友人関係を $0/1$ 行列 $A$ にすると、$A^2$ は「友達の友達」の経路数、$A^3$ は三角形の数を数えます。さらに敵対する2陣営間だけに辺がある二部グラフなら、片方の符号を反転させるだけで固有値が $\\pm\\lambda$ の完全対称になります！',
  },
  'ma-graph-laplacian': {
    en: 'Assign a temperature $x_i$ to every vertex of a network, and imagine metal wires along every edge. The quadratic form $x^T L x = \\sum (x_i - x_j)^2$ measures total heat tension across all wires! When is tension zero? ONLY when every connected island has a flat, uniform temperature. So counting how many independent zero-tension patterns exist ($\\dim \\operatorname{null} L$) literally counts how many disconnected islands the network has!',
    zh: '给网络每个节点赋一个温度 $x_i$，每条边当作导热金属丝。二次型 $x^T L x = \\sum (x_i - x_j)^2$ 度量所有金属丝上的总温差能量！什么时候总温差为 0？当且仅当每个互相连通的岛屿内部温度完全一致。所以有几个独立的零能量模式（$\\dim \\operatorname{null} L$），网络就恰好分裂成了几个互不相连的岛屿！',
    ja: '各頂点に温度 $x_i$ を割り当てると、$x^T L x = \\sum (x_i - x_j)^2$ は辺をまたぐ温度差エネルギーの総和です。エネルギーが 0 になるのは各連結な島ごとに温度が一定なときだけ。だから固有値 0 の重複度が「島の個数（連結成分数）」に厳密に一致します！',
  },
  'ma-fiedler': {
    en: 'Suppose a network is connected ($\\lambda_1 = 0$), and you want to find its weakest bottleneck to split it into two communities. You want a non-constant labeling $x$ (so $x \\perp \\mathbf{1}$) that keeps tightly connected friends at almost the SAME value while putting a big jump across the few weak bridge edges—minimizing $\\sum (x_i - x_j)^2$. By Courant–Fischer, the winner is ALWAYS the second eigenvector $v_2$ (the Fiedler vector): just put positive vertices in Group A and negative vertices in Group B!',
    zh: '假如整个网络是连通的，你想找出最薄弱的瓶颈把它切成两个社群：怎么给节点标号才能让紧密相连的朋友数值几乎一样、只在稀少的桥接边上产生落差（最小化 $\\sum (x_i - x_j)^2$）？由 Courant-Fischer 定理，最优解永远是第二小特征向量 $v_2$（Fiedler 向量）——直接按正负号把节点分成 A、B 两组，就是最优谱聚类！',
    ja: '連結なネットワークを最も少ない辺の切断で2つのコミュニティに分けるには、$\sum (x_i - x_j)^2$ を最小にする非定数ラベルを探せばよいのです。クーラン＝フィッシャーの定理により、その最適解が第2固有ベクトル $v_2$（フィードラーベクトル）であり、符号の正負で分けるだけで最適なクラスタリングが完成します！',
  },
};
