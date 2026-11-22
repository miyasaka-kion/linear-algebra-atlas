import { TrilingualText } from '../types';

export const DEEP_LADR_3: Record<string, TrilingualText> = {
  'adjoint-def': {
    en: 'Inside an inner product $\\langle Tv, w \\rangle$, the operator $T$ acts on the left vector $v$. What if you want to move $T$ across the comma so it acts on the right vector $w$ instead, WITHOUT changing the answer? The unique operator that makes $\\langle Tv, w \\rangle = \\langle v, T^*w \\rangle$ always hold is the adjoint $T^*$. Think of it as the "mirror partner" of $T$ across the dot product.',
    zh: '在内积 $\\langle Tv, w \\rangle$ 里，算子 $T$ 作用在左边的 $v$ 上。如果想把 $T$ 搬到逗号右边去作用在 $w$ 上，且让内积结果丝毫不变，那个唯一的“镜像搭档”就是伴随算子 $T^*$！在标准正交基下，它恰好就是矩阵的共轭转置。',
    ja: '内積 $\\langle Tv, w \\rangle$ で左の $v$ に掛かっている $T$ を、結果を変えずに右の $w$ 側へ引っ越しさせたときの唯一の相棒が随伴作用素 $T^*$ です。正規直交基底ではちょうど共役転置行列になります。',
  },
  'self-adjoint': {
    en: 'A self-adjoint operator ($T = T^*$) is its own mirror partner! Just as a real number equals its own complex conjugate ($z = \\bar{z}$), self-adjoint operators are the "real numbers" of matrix algebra. They NEVER rotate space—they only stretch or compress along perpendicular directions, which is why every eigenvalue is guaranteed to be a real number.',
    zh: '自伴算子 ($T = T^*$) 就是“自己等于自己的镜像”，就像实数等于自身的共轭 ($z = \\bar{z}$)。几何上，自伴算子绝不旋转空间，只做沿正交方向的纯拉伸或压缩——所以它的特征值永远是实数，绝不会出现虚数旋转！',
    ja: '自己随伴 ($T = T^*$) は複素数における実数 ($z = \\bar{z}$) にあたります。空間を回転させることは決してなく、互いに垂直な軸に沿って純粋に伸ばす・縮めるだけなので、固有値は必ずすべて実数になります。',
  },
  'normal-op': {
    en: 'Normal operators ($TT^* = T^*T$) are operators that play nicely with their own mirror partner: doing $T$ then $T^*$ gives the exact same length as $T^*$ then $T$. This peaceful family includes BOTH pure stretches (self-adjoint) AND pure rotations (unitary)—and in $\\mathbb{C}$, normality is the exact golden ticket to having perpendicular eigenvectors!',
    zh: '正规算子 ($TT^* = T^*T$) 是能和自己伴随“和平共处、顺序可换”的算子家族。它把纯拉伸（自伴）和纯旋转（酉算子）全都包了进来——在复空间上，正规恰恰是“特征向量两两垂直”的唯一充要条件！',
    ja: '正規作用素 ($TT^* = T^*T$) は自身の随伴と順序交換できる穏やかなクラスです。純粋な伸縮（自己随伴）も純粋な回転（ユニタリ）も含み、複素空間では「固有ベクトルがすべて直交する」ための必要十分条件です。',
  },
  'complex-spectral': {
    en: 'Remember how diagonalization meant "tilted independent axes," which might be awkwardly skewed? The Complex Spectral Theorem upgrades that to the ultimate dream: for ANY normal operator on $\\mathbb{C}^n$, its eigen-axes are guaranteed to meet at perfect $90^\\circ$ right angles! So the operator is just independent scaling/phase-rotation along a pristine perpendicular grid.',
    zh: '普通对角化的特征轴可能是歪斜的，而复谱定理给出了终极完美形态：复空间上的任何正规算子，它的特征轴不仅张成全空间，还**严格两两呈 $90^\\circ$ 垂直**！也就是说，换一组刚体旋转后的直角坐标系，算子就彻底变成对角矩阵。',
    ja: '通常の対角化では固有軸が斜めに交わることがありますが、複素スペクトル定理は「複素空間の正規作用素なら、固有軸がすべて完璧な90度直角（正規直交基底）をなす」ことを保証します。',
  },
  'real-spectral': {
    en: 'Imagine stretching a circular rubber trampoline into an oval. No matter how complicated the symmetric matrix looks on paper, the Real Spectral Theorem promises there are ALWAYS two perpendicular lines drawn on the trampoline that stay perpendicular after stretching—the whole matrix is just "rotate your head to those two axes, then stretch by $\\lambda_1$ and $\\lambda_2$!"',
    zh: '把一张圆形蹦床拉成椭圆。不管实对称矩阵在纸面上看起来多密密麻麻，实谱定理保证：蹦床上**永远存在两条互相垂直的主轴**，拉完之后依然垂直！整个矩阵的几何动作其实极其简单：转个角度对齐主轴，再分别拉伸 $\\lambda_1, \\lambda_2$ 倍。',
    ja: '円形のトランポリンを楕円に引っ張るイメージです。実対称行列がどれほど複雑に見えても、必ず互いに直角な主軸が存在し、その軸に沿って $\\lambda_1, \\lambda_2$ 倍に純粋に伸ばすだけの変換に分解できます！',
  },
  'positive-op': {
    en: 'If self-adjoint operators are like real numbers ($\\mathbb{R}$), then positive operators are like nonnegative numbers ($x \\ge 0$): they stretch space along perpendicular axes by nonnegative factors, NEVER flipping any direction backward! Just as every $x \\ge 0$ has a unique square root $\\sqrt{x} \\ge 0$, every positive operator $T$ has a unique positive square root $\\sqrt{T}$.',
    zh: '如果自伴算子对应实数，那么正算子就对应非负实数 ($x \\ge 0$)：它们沿正交轴只做非负倍率拉伸，绝不把任何方向掉头反转！就像每个非负数都有唯一的算术平方根 $\\sqrt{x}$ 一样，每个正算子也都有唯一的正平方根 $\\sqrt{T}$。',
    ja: '正作用素は非負の実数 $x \\ge 0$ の行列版です。直交軸に沿って0以上の倍率で伸縮するだけ（反転しない）なので、非負実数に $\\sqrt{x}$ が一意に存在するように、正作用素にも一意な正の平方根 $\\sqrt{T}$ が存在します。',
  },
  'unitary-op': {
    en: 'Pick up a rigid wooden cube and rotate it in midair, or look at it in a mirror. Every edge keeps its exact length and every $90^\\circ$ corner stays $90^\\circ$—zero bending, zero stretching! Unitary (or real orthogonal) operators are precisely these rigid, distance-preserving motions of space.',
    zh: '拿起一块坚硬的木头魔方在空中随意旋转或照镜子：每条棱的长度分毫不差，每个 $90^\\circ$ 直角依然是直角——零拉伸、零扭曲！酉算子（实空间称正交算子）正是这种保持一切距离与角度不变的“刚体运动”。',
    ja: '硬い木製キューブを空中で回したり鏡に映したりする剛体運動です。辺の長さも90度の角も一切歪みません。このように長さも角度も完全に保つ変換がユニタリ（実なら直交）作用素です。',
  },
  'qr-cholesky': {
    en: 'QR factorization simply packages the Gram–Schmidt procedure into one tidy matrix equation $A = QR$: $Q$ holds the clean $90^\\circ$ unit axes, and $R$ is an upper-triangular recipe recording how to rebuild the original slanted columns from $Q$. Cholesky ($A = R^*R$) is like taking the fast triangular square root of a positive-definite matrix.',
    zh: 'QR 分解其实就是把 Gram-Schmidt 正交化写成一个清爽的矩阵公式 $A = QR$：$Q$ 装着规整的直角单位基，$R$ 是一张上三角配方表，记录怎么把原列向量拼回来。Cholesky 分解 $A = R^*R$ 则是给正定矩阵求“三角平方根”，在数值计算中比 LU 快一倍！',
    ja: 'QR 分解はグラム・シュミット直交化を1つの行列式 $A = QR$ にまとめたもの（直交行列 $Q$ × 上三角行列 $R$）。コレスキー分解 $A = R^*R$ は正定値行列の高速な三角平方根です。',
  },
  'svd-thm': {
    en: 'Most matrices are NOT symmetric, NOT square, and NOT even diagonalizable—yet SVD works for **100% of all matrices ever written**! Draw a unit circle (or sphere) in the input space. EVERY linear map turns that circle into an ellipse! SVD simply finds the two perpendicular input arrows ($v_1, v_2$) that land on the longest and shortest perpendicular axes of the output ellipse ($\\sigma_1 u_1, \\sigma_2 u_2$). So EVERY matrix is just: Rotate $\\to$ Stretch $\\to$ Rotate!',
    zh: '绝大多数矩阵既不对称、也不是方阵、甚至不可对角化——但 SVD 对**全世界 100% 的任何矩阵**都成立！在输入空间画一个单位圆，任何线性变换都会把它变成一个椭圆。SVD 就是找出输入圆上互相垂直的两根轴 ($v_1, v_2$)，它们变换后恰好落到输出椭圆最长的长轴和最短的短轴 ($\\sigma_1 u_1, \\sigma_2 u_2$) 上！所以任何矩阵都只是三步：旋转 $\\to$ 拉伸 $\\to$ 再旋转！',
    ja: '対称でも正方でも対角化可能でもない「あらゆる行列」に使える究極の分解が SVD です！入力の単位円はどんな行列を通しても必ず楕円になります。SVD はその楕円の長軸・短軸へ写る直交入力軸を見つけるため、すべての行列が「回転 → 伸縮 → 回転」の3歩に分解されます！',
  },
  'polar-decomp': {
    en: 'Every complex number $z$ can be written as "distance from origin $|z|$, then rotate by angle $\\theta$" ($z = e^{i\\theta}|z|$). Polar decomposition says the exact same thing about ANY square matrix $T$: first deform a rubber sphere symmetrically into an ellipsoid ($\\sqrt{T^*T}$), then pick up that rigid ellipsoid and rotate it into place ($S$)!',
    zh: '每个复数都能写成“模长 $|z|$ 乘以旋转角 $e^{i\\theta}$”。极分解对任何方阵 $T$ 说了完全一样的话：任何复杂的变形，都等价于先对橡胶球做一次对称纯拉伸 ($\\sqrt{T^*T}$)，再把拉好的椭球整体刚体旋转到最终角度 ($S$)！',
    ja: '複素数の極形式 $z = e^{i\\theta}|z|$ の行列版です。どんな正方行列の変形も「まず対称な純粋伸縮 $\\sqrt{T^*T}$ で楕円体を作り、次にそれを剛体回転 $S$ で最終位置へ回す」の2段階に綺麗に分けられます！',
  },
  'low-rank-approx': {
    en: 'Suppose you have a high-resolution photo stored as a $1000 \\times 1000$ matrix. Its SVD breaks the photo into 1000 simple "rank-1" layers sorted from most important ($\\sigma_1$) to tiny noise ($\\sigma_{1000}$). Keeping just the top 50 layers gives a crisp image at 10% of the file size—and Eckart–Young proves NO other rank-50 approximation can beat it!',
    zh: '把一张 $1000 \\times 1000$ 的高清照片当成矩阵做 SVD，它会被拆成 1000 张按重要性 ($\\sigma_1 \\ge \\sigma_2 \\ge \\dots$) 排好序的极简图层。只保留前 50 层、扔掉后面微小的细节层，就能用 1/10 的体积还原极清晰的画面——而且定理保证，全世界没有比这误差更小的秩 50 近似！',
    ja: '写真を巨大な行列とみなして SVD すると、重要な順 ($\\sigma_1 \\ge \\sigma_2 \\ge \\dots$) に並んだ単純なレイヤーの和に分解できます。上位の数十層だけ残せばファイルサイズを激減させつつ原画を忠実に再現でき、それが数学的に最良の近似になります！',
  },
  'volume-singular': {
    en: 'Take a $1 \\times 1 \\times 1$ unit cube and transform it by $T = U\\Sigma V^*$. Rotating the cube ($V^*$) does NOT change its volume. Stretching its 3 perpendicular sides by $\\sigma_1, \\sigma_2, \\sigma_3$ multiplies its volume by $\\sigma_1\\sigma_2\\sigma_3$. Rotating again ($U$) does NOT change its volume. Therefore, volume ALWAYS scales by the product of singular values!',
    zh: '拿一个 $1 \\times 1 \\times 1$ 的单位正方体做变换 $T = U\\Sigma V^*$：第一步旋转 $V^*$ 不改变体积；第二步把三条垂直棱分别拉长 $\\sigma_1, \\sigma_2, \\sigma_3$ 倍，体积自然变成 $\\sigma_1\\sigma_2\\sigma_3$ 倍；第三步旋转 $U$ 也不改变体积。所以体积缩放倍数永远等于全体奇异值之积！',
    ja: '単位立方体に $T = U\\Sigma V^*$ を施します。回転 $V^*$ と $U$ は体積を一切変えず、真ん中の伸縮 $\\Sigma$ だけが縦・横・高さを $\\sigma_1, \\sigma_2, \\sigma_3$ 倍にするため、体積は必ず特異値の積だけ拡大縮小されます！',
  },
  'gen-eigenvector': {
    en: 'Imagine a shear matrix that only has ONE true eigenvector line, so ordinary eigenvectors can’t fill 2D space. Instead of demanding $(T - \\lambda I)v = 0$ in ONE shot, we allow vectors that take 2 or 3 steps to hit zero: $(T - \\lambda I)^k v = 0$. Those "delayed-action eigenvectors" recover every single missing dimension!',
    zh: '像剪切矩阵那样，普通特征向量只有一条线，根本凑不齐整个二维空间的基。于是我们放宽要求：不强求一步就归零 $(T - \\lambda I)v = 0$，而是允许走两步、三步才归零 $(T - \\lambda I)^k v = 0$。这些“延迟归零”的广义特征向量，刚好把缺失的维度全部补齐！',
    ja: '剪断行列のように通常の固有ベクトルだけでは空間を張れないとき、1回で 0 になる $(T-\\lambda I)v = 0$ という条件を「$k$ 回適用すれば 0 になる $(T-\\lambda I)^k v = 0$」へ緩めます。これで不足していた次元がすべて回収できます！',
  },
  'nilpotent-op': {
    en: 'Think of a conveyor belt with 3 slots: slot 3 moves to slot 2, slot 2 moves to slot 1, and slot 1 falls off the edge into 0! Applying the shift once doesn’t empty the belt, nor does twice—but after 3 shifts ($N^3 = 0$), EVERYTHING is gone. Every nilpotent operator is just a collection of finite conveyor belts like this.',
    zh: '想象一条 3 格长的传送带：3 号格的物体移到 2 号格，2 号移到 1 号，1 号直接掉下悬崖变成 0！推动一次传送带还没空，但推满 3 次 ($N^3 = 0$) 后整条传送带彻底清空。所有幂零算子本质上都是若干条这种有限长的传送带！',
    ja: '3マスしかないベルトコンベアを想像してください。1回動かすごとに荷物が1マス左へずれ、左端から落ちると 0 になります。3回動かせば ($N^3 = 0$) 必ず空っぽになる——これがべき零作用素の正体です。',
  },
  'gen-eigenspace-decomp': {
    en: 'Even if a complex operator refuses to be diagonalized, it is NEVER a hopeless mess: you can ALWAYS split the entire space into completely independent rooms $G(\\lambda_1, T) \\oplus \\cdots \\oplus G(\\lambda_m, T)$. Inside room $k$, the operator simply scales everything by $\\lambda_k$ plus a tiny conveyor-belt nilpotent shift!',
    zh: '哪怕一个复算子死活不能对角化，它也绝不是一团乱麻：你总能把全空间拆成互不串门的独立房间 $G(\\lambda_1, T) \\oplus \\cdots \\oplus G(\\lambda_m, T)$。在第 $k$ 号房间里，算子做的事情非常简单：整体乘以 $\\lambda_k$，再附带一条小小的幂零传送带！',
    ja: '対角化できない複素作用素でも、空間全体を独立な部屋 $G(\\lambda_1, T) \\oplus \\cdots \\oplus G(\\lambda_m, T)$ に必ず直和分解できます。各部屋の中では「$\\lambda_k$ 倍の伸縮 ＋ べき零シフト」という単純な動きしかしません！',
  },
  'char-poly': {
    en: 'Most textbooks force you to compute ugly determinants $\\det(zI - A)$ just to define the characteristic polynomial. Axler skips all that: if eigenvalue $\\lambda_k$ owns a $d_k$-dimensional room $G(\\lambda_k, T)$, its multiplicity is simply $d_k$, and the characteristic polynomial is literally $(z - \\lambda_1)^{d_1}\\cdots(z - \\lambda_m)^{d_m}$!',
    zh: '传统教材逼着你先算繁琐的行列式 $\\det(zI - A)$ 才能定义特征多项式。Axler 一笔带过：特征值 $\\lambda_k$ 对应的广义特征房间有 $d_k$ 维，它的代数重数就是 $d_k$，特征多项式直接就是 $(z - \\lambda_1)^{d_1}\\cdots(z - \\lambda_m)^{d_m}$——清晰得像呼吸一样自然！',
    ja: '通常の教科書は複雑な行列式 $\\det(zI - A)$ で定義しますが、Axler は各広義固有空間の次元 $d_k$ をそのまま重複度とし、特性多項式を $(z-\\lambda_1)^{d_1}\\cdots(z-\\lambda_m)^{d_m}$ と極めて自然に定義します！',
  },
  'cayley-hamilton': {
    en: 'Cayley–Hamilton says every matrix obeys its own characteristic equation $q(T) = 0$. With Axler’s rooms, the proof is 2 lines: inside room $k$ (dimension $d_k$), the conveyor belt $(T - \\lambda_k I)$ empties everything in at most $d_k$ steps, so $(T - \\lambda_k I)^{d_k} = 0$ on room $k$—hence the product of all rooms’ factors kills the entire space!',
    zh: 'Cayley-Hamilton 说每个算子把自己代入自己的特征多项式一定得 0。用前面的“房间”视角只需两行就懂：在 $d_k$ 维的第 $k$ 号房间里，传送带 $(T - \\lambda_k I)$ 最多推 $d_k$ 下就把房间清空了，所以把所有房间的因子乘在一起，全空间就彻底归零！',
    ja: '各 $d_k$ 次元の部屋ではべき零シフト $(T-\\lambda_k I)$ が高々 $d_k$ 回で部屋を空にします。だから全部屋の因子を掛け合わせた $q(T)$ は空間全体を必ず 0 にします——わずか2行の明快な証明です！',
  },
  'block-diag': {
    en: 'Block-diagonal form means your giant $10 \\times 10$ matrix splits into smaller independent square tiles along the diagonal with zeros everywhere else—like running 3 separate small programs in parallel that never touch each other’s memory!',
    zh: '分块对角矩阵意味着一个庞大的 $10 \\times 10$ 矩阵被拆成了沿对角线排列的几个互不沾边的小方块，其余位置全是 0——就像三个互不共享内存的独立小程序并行运行！',
    ja: 'ブロック対角行列とは、大きな行列が対角線上に並ぶ小さな独立ブロックに分かれ、残りがすべて 0 になる形です。互いに干渉しない別々の小問題へ完全に分解された状態です。',
  },
  'jordan-form': {
    en: 'Jordan Form is the absolute cleanest possible matrix ANY complex operator can ever achieve. Inside each diagonal block, you have $\\lambda$ down the diagonal (scaling) and $1$s just above it (a pure 1-step conveyor belt). If all conveyor belts have length 1, there are no $1$s above the diagonal—meaning the operator is diagonalizable!',
    zh: 'Jordan 标准型是任何复算子能化简到的**极致最简形态**：每个小方块里，对角线全是缩放倍数 $\\lambda$，正上方一排 $1$ 就是纯粹的 1 步传送带。如果所有传送带长度都是 1（上方没有 $1$），那就退化回最简单的对角矩阵！',
    ja: 'ジョルダン標準形は複素作用素が到達できる究極のシンプル形です。各ブロックは対角に倍率 $\\lambda$、すぐ上に1段ずらすベルトコンベアの $1$ が並ぶだけ。上に $1$ が1つもなければ対角化可能ということです！',
  },
  'trace-def': {
    en: 'Add up all the diagonal entries of a matrix—that’s the trace. Amazingly, even if you scramble the matrix by changing coordinate systems ($P^{-1}AP$), the diagonal sum NEVER changes! Why? Because it always equals the sum of all the eigenvalues, which are intrinsic geometric properties of the transformation.',
    zh: '把矩阵主对角线上的数字加起来就是“迹”。神奇的是，不管你换什么坐标系把矩阵折腾成 $P^{-1}AP$，对角线之和永远纹丝不动！因为它本质上等于全部特征值之和——而特征值是变换固有的几何属性，不随坐标系改变。',
    ja: '対角成分の和がトレースです。座標変換 $P^{-1}AP$ で行列の中身がガラッと変わっても、対角和だけは絶対に変わりません。なぜなら空間固有の不変量である「全固有値の和」に等しいからです！',
  },
  'bilinear-form': {
    en: 'Think of a bilinear form as a generalized dot product $\\beta(u, v)$ that doesn’t have to be positive. Plugging in the same vector twice gives a quadratic bowl $q(v) = \\beta(v, v)$ (like a valley $x^2 + y^2$, a dome $-x^2 - y^2$, or a Pringles chip saddle $x^2 - y^2$). Sylvester’s Law says no matter how you stretch or tilt coordinates, you can NEVER turn a Pringles saddle into a valley—the number of upward and downward directions is locked forever!',
    zh: '双线性形式是允许取负值的广义内积；代入两个相同向量得到的二次型 $q(v)$ 就像三维曲面（向上弯的碗 $x^2+y^2$、向下弯的穹顶、或薯片状马鞍面 $x^2-y^2$）。Sylvester 惯性定理说：不管你怎么拉伸旋转坐标系，**薯片马鞍绝不可能变成碗**——向上弯和向下弯的维数永远锁死不变！',
    ja: '二次形式は曲面の形（お椀 $x^2+y^2$ か、馬の鞍 $x^2-y^2$ か）を表します。シルベスターの慣性法則は、座標をどう歪めても「馬の鞍をお椀に変えることはできない」——上向きに曲がる方向と下向きに曲がる方向の個数は不変だと保証します！',
  },
  'alt-multilinear': {
    en: 'Imagine designing a machine that takes $n$ arrows and outputs the signed volume of the box they form. Three common-sense rules must hold: (1) doubling one edge doubles the volume (multilinear); (2) if two edges point the exact same way, the box is squashed flat so volume $= 0$ (alternating); (3) swapping two edges flips inside-out to negative volume. Astonishingly, up to choosing your unit of measurement (cubic meters vs cubic inches), there is ONLY ONE such machine in the entire universe!',
    zh: '想象设计一台“体积测量仪”，输入 $n$ 条边输出盒子体积，只需满足三条常识：① 某条边拉长 2 倍体积变 2 倍（多重线性）；② 有两条边重合盒子压扁体积为 0（交错性）；③ 交换两条边体积变负号（翻转定向）。令人震惊的是：除去换算单位（立方米 vs 立方厘米）之外，全世界满足这三条常识的机器**只有唯一一台**！',
    ja: '$n$ 本の辺が作る箱の符号付き体積を測る機械を考えます。「①1辺を2倍すれば体積も2倍」「②2辺が重なれば潰れて体積0」「③2辺を入れ替えると裏返って符号反転」の3ルールを満たす機械は、単位の選び方を除けば世界にただ1つしか存在しません！',
  },
  'det-def': {
    en: 'Forget memorizing giant checkerboard cofactor formulas! The determinant $\\det T$ has ONE crystal-clear meaning: take a $1 \\times 1$ unit square (area 1), apply your transformation $T$, and measure the new area of the squished/stretched parallelogram. If $T$ flipped space inside-out like a mirror, slap a minus sign on it. That signed area multiplier IS $\\det T$!',
    zh: '彻底忘掉那些折磨人的代数余子式展开公式吧！行列式 $\\det T$ 只有一个清晰无比的几何含义：拿一个面积为 1 的单位正方形做变换 $T$，量出变换后平行四边形的新面积——如果空间像照镜子一样被翻了个面，就加个负号。这个“有向面积/体积缩放倍数”就是 $\\det T$！',
    ja: '複雑な余因子展開は一旦忘れましょう！行列式 $\\det T$ の意味はたった1つ：「面積1の単位正方形を変換 $T$ で変形したとき、面積が何倍になったか（鏡映で裏返ったらマイナスをつける）」という符号付き体積倍率そのものです！',
  },
  'det-mult': {
    en: 'If transformation $T$ doubles every area ($\\det T = 2$), and transformation $S$ triples every area ($\\det S = 3$), then doing $T$ followed by $S$ obviously multiplies every area by $3 \\times 2 = 6$! And if $\\det T = 0$, $T$ crushed the whole space flat to zero volume—you can never un-crush a flat pancake back into a 3D cube, so $T$ is NOT invertible!',
    zh: '如果变换 $T$ 把所有面积放大 2 倍，紧接着 $S$ 再放大 3 倍，合起来自然放大 $3 \\times 2 = 6$ 倍，这就是 $\\det(ST) = (\\det S)(\\det T)$！而 $\\det T = 0$ 说明变换把立体压成了面积/体积为 0 的煎饼——压扁的煎饼永远复原不成三维方块，所以不可逆！',
    ja: '変換 $T$ で面積が2倍、続けて $S$ で3倍になれば合計で $3 \\times 2 = 6$ 倍——これが乗法性です！また $\\det T = 0$ は空間が面積0にペチャンコに潰れたことを意味し、元に戻せない（不可逆）のです！',
  },
  'det-eigen': {
    en: 'In an eigenbasis (or upper-triangular basis), the transformation stretches axis 1 by $\\lambda_1$, axis 2 by $\\lambda_2$, …, axis $n$ by $\\lambda_n$. So the total volume scaling factor $\\det T$ is simply $\\lambda_1 \\lambda_2 \\cdots \\lambda_n$! At the very end of the book, determinants and eigenvalues finally shake hands.',
    zh: '在特征基（或上三角基）下，变换把第 1 根轴拉伸 $\\lambda_1$ 倍、第 2 根轴拉伸 $\\lambda_2$ 倍……那么总体积缩放倍数 $\\det T$ 自然等于所有特征值的乘积 $\\lambda_1 \\lambda_2 \\cdots \\lambda_n$！全书最后，行列式与特征值终于完美握手言和。',
    ja: '固有基底で見れば各軸がそれぞれ $\\lambda_1, \\dots, \\lambda_n$ 倍に伸びるため、全体の体積倍率 $\\det T$ は全固有値の積 $\\lambda_1\\cdots\\lambda_n$ に一致します！本の最後で行列式と固有値が見事に合流します。',
  },
  'tensor-product': {
    en: 'Suppose Particle A has 2 states (Up, Down) and Particle B has 2 states (Up, Down). Together, the 2-particle system does NOT have $2 + 2 = 4$ additive states—it has $2 \\times 2 = 4$ paired states (Up-Up, Up-Down, Down-Up, Down-Down), and general states are combinations like $\\text{Up}\\otimes\\text{Up} + \\text{Down}\\otimes\\text{Down}$ that CANNOT be split into separate states for A and B! That’s the tensor product $V \\otimes W$—the exact math of quantum entanglement!',
    zh: '假设粒子 A 有 2 个状态（上、下），粒子 B 也有 2 个状态。合在一起的系统不是简单拼接，而是产生 $2 \\times 2 = 4$ 种配对状态（上上、上下、下上、下下），而且可以叠加出像 $\\text{上}\\otimes\\text{上} + \\text{下}\\otimes\\text{下}$ 这样**无法拆回成 A 和 B 各自独立状态**的整体——这就是张量积 $V \\otimes W$，量子纠缠的精确数学语言！',
    ja: '粒子Aに2状態、粒子Bに2状態あるとき、複合系は $2 \\times 2 = 4$ 通りのペア状態を持ちます。さらに「上$\\otimes$上 $+$ 下$\\otimes$下」のようにAとBの単独状態に分離できない重ね合わせが生まれます——これがテンソル積であり、量子もつれの数学そのものです！',
  },
};
