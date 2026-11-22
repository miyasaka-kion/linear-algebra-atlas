import { TrilingualText } from '../types';

export const DEEP_LADR_2: Record<string, TrilingualText> = {
  'poly-div': {
    en: 'Remember long division in elementary school: $17 = 5 \\times 3 + 2$ (remainder $2 < 5$)? Polynomials work the EXACT same way: you can divide any polynomial $p(z)$ by $s(z)$ and get a smaller-degree remainder $r(z)$. If $\\lambda$ makes $p(\\lambda) = 0$, the remainder is 0, so $(z - \\lambda)$ divides $p(z)$ cleanly!',
    zh: '还记得小学学的带余除法 $17 = 5 \\times 3 + 2$（余数小于除数）吗？多项式一模一样：任何多项式都能除以另一个多项式，留下次数更小的余式。如果代入 $\\lambda$ 得 0，说明余数为 0，$(z - \\lambda)$ 就能把它整除！',
    ja: '小学校の割り算 $17 = 5 \\times 3 + 2$ と全く同じです。多項式でも余りの次数が小さくなるように割り算でき、$p(\\lambda)=0$ なら余り 0 で $(z-\\lambda)$ で綺麗に割り切れます。',
  },
  'poly-fact-c': {
    en: 'Over real numbers, $x^2 + 1 = 0$ gets stuck with no solutions. Complex numbers $\\mathbb{C}$ fix that forever: EVERY polynomial breaks down completely into tiny 1st-degree building blocks $(z - \\lambda_1)(z - \\lambda_2)\\cdots(z - \\lambda_m)$, just like every whole number factors into primes!',
    zh: '在实数世界里，$x^2 + 1 = 0$ 会卡壳无解；而进入复数 $\\mathbb{C}$ 后，任何多项式都能像整数分解质因数一样，彻底拆成一串最简单的一次因子 $(z - \\lambda_1)(z - \\lambda_2)\\cdots(z - \\lambda_m)$，永不卡壳！',
    ja: '実数では $x^2+1=0$ が解けずに行き詰まりますが、複素数 $\\mathbb{C}$ ならすべての多項式が素因数分解のように必ず一次式の積へ完全に分解できます。',
  },
  'poly-fact-r': {
    en: 'If a polynomial has only real coefficients, any non-real complex roots MUST appear as mirror-image twins ($a + bi$ and $a - bi$). Multiplying those twins back together produces a real quadratic $(x^2 + bx + c)$—which geometrically corresponds to a 2D rotation plane!',
    zh: '实系数多项式的复根一定成双成对以“镜像双胞胎” ($a \\pm bi$) 出现。把一对双胞胎乘回一起，就得到一个拆不开的实二次式——它在几何上正好对应一个二维旋转平面！',
    ja: '実係数多項式の複素根は必ず鏡像ペア $a \\pm bi$ で現れます。ペアを掛け戻すと既約な実二次式になり、幾何学的には2次元の回転面に対応します。',
  },
  'invariant-subspace': {
    en: 'Imagine a giant swirling pool of water ($T$), and inside it is a closed whirlpool lane ($U$) where any leaf dropped inside stays inside forever—it never washes out into the rest of the pool! Breaking a big transformation into small closed lanes makes understanding it 10× easier.',
    zh: '想象一个大漩涡 ($T$)，里面有一条封闭的环形水道 ($U$)：扔进这条水道的树叶永远只会在水道内部打转，绝不会漂出去！把复杂变换拆成若干条互不串门的小水道，问题就瞬间变简单了。',
    ja: '大きな水流 ($T$) の中に、落ち葉を落としても決して外へ流れ出ない閉じた水路 ($U$) があるイメージです。複雑な変換を小さな閉じた部分空間に分けると構造が一気にシンプルになります。',
  },
  'eigenvalue-def': {
    en: 'When you spin a globe, almost every city moves to a completely new direction—EXCEPT the North and South Poles, which stay right on the spin axis! Eigenvectors are those special "pole directions" of a transformation: arrows pointing along them NEVER get knocked sideways, they only get stretched, shrunk, or flipped by a number $\\lambda$ (the eigenvalue).',
    zh: '转动地球仪时，几乎每座城市都转偏了方向，唯独南北极所在的地轴纹丝不动！特征向量就是变换中的“地轴”：落在这条轴上的箭头不会被掰歪，只会被拉长、缩短或掉头，而缩放倍数 $\\lambda$ 就是特征值。',
    ja: '地球儀を回すとほとんどの都市は別の向きへ動きますが、地軸（北極・南極の軸）だけは向きが変わりません。変換しても向きがブレず、単に $\\lambda$ 倍に伸び縮みするだけの特別な軸が固有ベクトル、倍率 $\\lambda$ が固有値です。',
  },
  'poly-operator': {
    en: 'If $T$ is an action (like "rotate by $30^\\circ$"), then $T^2$ means "do it twice," $3T$ means "do it and stretch by 3," and $T^2 + 3T + 2I$ is a recipe combining repeated applications of $T$. Because doing $T$ twice then once is the same as once then twice, algebra with $p(T)$ works just like high-school algebra with numbers!',
    zh: '如果 $T$ 是一个动作（比如“旋转 $30^\\circ$”），那 $T^2$ 就是“连续做两次”，$p(T) = T^2 + 3T + 2I$ 就是把多次动作按权重叠加的配方。因为 $T$ 和自己怎么乘都满足交换律，你可以像中学算多项式一样给算子做因式分解！',
    ja: '$T$ が1回の操作なら $T^2$ は2回連続の操作。$p(T)$ は操作の繰り返しを組み合わせたレシピです。$T$ 同士は順序を入れ替えても同じ（可換）なので、高校数学の多項式と同じように因数分解できます！',
  },
  'eigen-exists-c': {
    en: 'Why does EVERY complex operator have an eigenvalue—without ever mentioning determinants? Pick ANY nonzero vector $v$ and apply $T$ repeatedly: $v, Tv, T^2v, \\dots, T^nv$. That’s $n+1$ vectors in an $n$-dimensional room, so they MUST be crowded (linearly dependent)! That gives a polynomial equation $p(T)v = 0$. Factor $p$ over $\\mathbb{C}$ into $(T-\\lambda_1 I)\\cdots(T-\\lambda_m I)v = 0$: if a chain of steps kills a nonzero vector, at least one step $(T-\\lambda_k I)$ MUST crush some nonzero vector to zero—boom, you found an eigenvector!',
    zh: '为什么不用行列式也能证明复算子必有特征值？任选一个非零向量 $v$，反复作用 $T$ 得到 $n+1$ 个向量 $v, Tv, \\dots, T^nv$。在 $n$ 维房间里塞 $n+1$ 个向量一定挤爆（线性相关），于是凑出 $p(T)v = 0$。在复数域把 $p$ 拆成一串括号 $(T-\\lambda_1 I)\\cdots(T-\\lambda_m I)v = 0$：一连串操作把非零向量变成了 0，说明至少有一步 $(T-\\lambda_k I)$ 把某个非零向量压成了 0——特征向量当场现身！',
    ja: '行列式なしで固有値の存在を示す名証明！任意の $v \\neq 0$ から $n+1$ 個の列 $v, Tv, \\dots, T^nv$ を作ると $n$ 次元空間には収まらず必ず線形従属になり $p(T)v = 0$ を得ます。$\\mathbb{C}$ 上で一次式に分解すると $(T-\\lambda_1 I)\\cdots(T-\\lambda_m I)v = 0$ となり、どこかのステップで必ず非零ベクトルが 0 に潰れる——それが固有ベクトルです！',
  },
  'minimal-poly': {
    en: 'Every operator obeys infinitely many polynomial equations $q(T) = 0$. The minimal polynomial is the **shortest possible** equation that kills $T$ completely—like a person’s shortest unique fingerprint. All other equations $q(T) = 0$ are simply multiples of this shortest recipe.',
    zh: '能让算子归零的多项式方程有无穷多个，而最小多项式就是能让 $p(T) = 0$ 成立的**最短、最精简**的那个方程——就像算子的基因指纹。任何其他零化方程都只是它的倍数。',
    ja: '$q(T) = 0$ を満たす多項式は無数にありますが、その中で最も次数が低く無駄のない「最短のレシピ」が最小多項式です。作用素の DNA のようなもので、他のすべての零化多項式はこれの倍数になります。',
  },
  'eigen-odd-r': {
    en: 'Try spinning a 3D basketball in any crazy direction you want: there is ALWAYS a skewer line passing through the ball that stays pointing in the same direction (the axis of rotation)! In 2D (even dimension), a $90^\\circ$ spin has NO fixed axis; in 3D, 5D, 7D (odd dimensions), rotations pair off 2D planes and ALWAYS leave at least one real axis untouched!',
    zh: '不管你怎么胡乱旋转一颗三维篮球，总有一根穿过球心的“烤串签子”方向保持不变（旋转轴）！二维（偶数维）平面旋转 $90^\\circ$ 可以没有任何不动轴；但在三维、五维等奇数维空间里，旋转平面两两配对后，总会剩下一条实特征直线！',
    ja: '3次元のバスケットボールをどんな向きに回しても、必ず1本の回転軸（向きが変わらない直線）が残ります。2次元（偶数次元）の回転には実軸がありませんが、奇数次元では2次元回転面がペアになって必ず1本余るのです。',
  },
  'upper-triangular': {
    en: 'Sometimes an operator can’t be split into completely independent axes (like a deck of cards being sheared sideways). Upper-triangular form is the next best thing: a "domino chain" of nested subspaces where layer 1 stays in layer 1, layer 2 only leaks into layer 1, layer 3 only leaks into layers 1–2, etc. Over $\\mathbb{C}$, EVERY operator can be organized this cleanly!',
    zh: '有些变换（比如把一叠扑克牌向旁边推斜的“剪切”）没法拆成完全独立的轴。上三角矩阵是退而求其次的完美秩序：第 1 层只留在第 1 层，第 2 层最多只混进第 1 层，绝不往上乱窜——在复数域上，**每一个**算子都能整理成这种清爽的阶梯状！',
    ja: 'トランプの束を横にずらす「剪断」のように完全独立な軸に分けられない変換でも、上三角行列なら「第1層は第1層へ、第2層は1〜2層へ」という綺麗な階層構造に整理できます。複素空間ならすべての作用素で可能です！',
  },
  'diagonalizable': {
    en: 'A diagonalizable operator is the easiest kind in the universe: if you tilt your coordinate axes to line up with its eigenvectors, the entire complicated transformation turns into pure independent stretching along each axis—no mixing, no shearing! Computing $T^{100}$ is as easy as raising each diagonal number to the 100th power.',
    zh: '可对角化算子是宇宙中最友好的变换：只要把坐标轴歪到特征向量的方向上，原本乱七八糟的矩阵立刻变成**纯各轴独立拉伸**——互不干扰、没有剪切！算 $T^{100}$ 只需把对角线上的数字各自 100 次方，一秒搞定。',
    ja: '対角化可能とは、座標軸を固有ベクトルの向きに合わせるだけで、複雑な変換が「各軸ごとの独立な伸縮」に完全にバラける状態です。$T^{100}$ の計算も対角成分を100乗するだけで一瞬で終わります。',
  },
  'gershgorin': {
    en: 'Imagine each diagonal entry $A_{j,j}$ is a person standing in the complex plane, and the off-diagonal numbers in row $j$ are the length of a leash pulling on them. Gershgorin’s theorem says: the eigenvalues can NEVER wander farther from the diagonal entries than the total length of the leash!',
    zh: '把每个对角元 $A_{j,j}$ 想象成复平面上的一根木桩，该行其他非对角元的绝对值之和就是拴狗绳的总长度。Gershgorin 定理说：所有特征值就像拴在桩上的小狗，绝对跑不出这些圆盘圈定的范围！',
    ja: '対角成分 $A_{j,j}$ を杭、同じ行の非対角成分の絶対値和を「リードの長さ」と考えると、すべての固有値は必ずそのリードが届く円板の中に収まります。行列を一目見るだけで固有値の居場所が分かる便利な定理です。',
  },
  'commuting-ops': {
    en: 'Does "put on socks then shoes" equal "put on shoes then socks"? No—they don’t commute! But "stretch horizontally by 2" and "stretch vertically by 3" DO commute ($ST = TS$). Commuting diagonalizable operators share the EXACT same set of stretching axes, so one single coordinate system simplifies both at once.',
    zh: '“先穿袜子再穿鞋”和“先穿鞋再穿袜子”结果不同（不可交换）；但“横向拉长 2 倍”和“纵向拉长 3 倍”顺序随便换（可交换 $ST=TS$）。可交换的可对角化算子共享同一套拉伸坐标轴，换一次坐标系就能同时把它们俩都变成对角阵！',
    ja: '「靴下を履いてから靴を履く」は順序を変えられませんが、「横に2倍」と「縦に3倍」は順序が自由（可換 $ST=TS$）です。可換な対角化可能作用素は同じ固有軸を共有するため、1つの基底で同時に簡約できます。',
  },
  'inner-prod-def': {
    en: 'Up through Chapter 5, vector spaces were like rubber geometry: we knew straight lines, but we had NO concept of "how long is this arrow?" or "are these two arrows at $90^\\circ$?" The inner product $\\langle u, v \\rangle$ hands us a ruler (length $= \\sqrt{\\langle v,v\\rangle}$) and a carpenter’s square ($90^\\circ \\iff \\langle u,v\\rangle = 0$).',
    zh: '前五章的向量空间就像没有刻度的橡皮世界：我们知道直线和平行，却根本没法问“这个箭头有多长”或“它们垂直吗”？内积 $\\langle u, v \\rangle$ 终于递给了我们一把**尺子**（长度 $\\sqrt{\\langle v,v\\rangle}$）和一把**直角三角板**（垂直 $\\iff \\langle u,v\\rangle = 0$）。',
    ja: '第5章までの空間には「長さ」も「角度」もありませんでした。内積 $\\langle u, v \\rangle$ は抽象空間に初めて「定規（長さ）」と「直角定規（直交 $= 0$）」を持ち込んでくれる道具です。',
  },
  'norm-cauchy': {
    en: 'Shine sunlight straight down onto the ground ($v$) over a slanted stick ($u$). The shadow on the ground can NEVER be longer than the stick itself—it only equals the stick’s full length when the stick lies completely flat on the ground! That simple geometric truth IS the Cauchy–Schwarz inequality $|\\langle u,v\\rangle| \\le \\|u\\|\\|v\\|$.',
    zh: '把一根斜着的木棍 ($u$) 在正午阳光下投影到地面 ($v$) 上：木棍在地面上的**影子永远不可能比木棍本身更长**，只有把木棍完全放平贴地时影子才和木棍一样长！这个朴素的几何事实就是大名鼎鼎的 Cauchy-Schwarz 不等式。',
    ja: '斜めの棒 ($u$) に真上から光を当てたとき、地面 ($v$) に落ちる影が棒本体より長くなることは絶対にありません（完全に平行なときだけ一致）。それがコーシー＝シュワルツの不等式 $|\\langle u,v\\rangle| \\le \\|u\\|\\|v\\|$ の正体です！',
  },
  'orthonormal-basis': {
    en: 'If your coordinate axes are crooked, finding a point’s coordinates requires solving a messy system of equations. If your axes are all at $90^\\circ$ and length 1 (an orthonormal basis), finding each coordinate is effortless: just measure the shadow $\\langle v, e_k \\rangle$ onto each axis!',
    zh: '如果坐标轴歪歪扭扭，求一个点的坐标得解一堆联立方程组；而一旦所有坐标轴都互相垂直且长度为 1（规范正交基），求坐标就只需拿向量跟每根轴做一次内积 $\\langle v, e_k \\rangle$，一秒直出！',
    ja: '軸が斜めだと座標を求めるのに連立方程式が必要ですが、互いに直角で長さ1の軸（正規直交基底）なら、各軸への影 $\\langle v, e_k \\rangle$ を測るだけで一瞬で座標が求まります。',
  },
  'gram-schmidt': {
    en: 'Suppose someone hands you two slanted sticks $v_1, v_2$ and asks you to build a clean $90^\\circ$ coordinate frame. Step 1: shrink $v_1$ to length 1 ($e_1$). Step 2: take $v_2$, chop off the part that leans along $e_1$ (its shadow!), leaving a purely vertical stick, and shrink it to length 1 ($e_2$). Repeat for as many dimensions as you have!',
    zh: '假如有人递给你两根斜着靠在一起的木棍 $v_1, v_2$，让你改造成标准的直角坐标系：第一步，把 $v_1$ 缩放成长度 1 得到 $e_1$；第二步，把 $v_2$ 沿着 $e_1$ 方向倾斜的“影子分量”减掉，剩下的就严格垂直于 $e_1$ 了，再缩成长度 1 得到 $e_2$！高维空间照葫芦画瓢即可。',
    ja: '斜めに交わる2本の棒 $v_1, v_2$ から綺麗な直角座標を作る手順です。まず $v_1$ を長さ1にして $e_1$ を作り、次に $v_2$ から「$e_1$ 方向へ傾いている影の成分」を引き去ると純粋に垂直な棒が残るので、それを長さ1にして $e_2$ とします。',
  },
  'riesz-rep': {
    en: 'Earlier we saw that a linear functional $\\varphi$ is like a price-tag rule assigning a number to every vector. Riesz says: once your space has an inner product, you don’t need an abstract rulebook—there is ONE single hidden vector $u$ inside your space such that $\\varphi(v)$ is literally just taking the dot product $\\langle v, u \\rangle$!',
    zh: '前面把线性泛函比作给每个向量打分的规则。Riesz 定理告诉我们：只要空间里有了内积，所有抽象的打分规则其实都藏在空间内部——每条规则都唯一对应空间里的**某一个向量 $u$**，打分动作其实就是和 $u$ 做一次内积 $\\langle v, u \\rangle$！',
    ja: '内積がある空間では、どんな線形汎関数（スコア付けのルール）も外部の抽象規則ではなく、空間内のただ1つのベクトル $u$ との内積 $\\langle v, u \\rangle$ として完全に表現できるという美しい架け橋です。',
  },
  'ortho-complement': {
    en: 'Picture the flat floor of a room ($U$). Its orthogonal complement $U^\\perp$ is the straight vertical flagpole rising at $90^\\circ$ from the floor. Every point in the 3D room splits uniquely into "where it is above the floor" ($P_U v$) plus "how high up the pole it is" ($v - P_U v$).',
    zh: '想象房间的平坦地板是 $U$，那么它的正交补 $U^\\perp$ 就是垂直于地板竖起的旗杆。房间里任意一点的位置都可以唯一拆成两部分：“在地板上的垂直影子” ($P_U v$) + “离地面的垂直高度” ($v - P_U v$)。',
    ja: '部屋の床を $U$ とすると、床に対して90度垂直に立つ柱が直交補空間 $U^\\perp$ です。部屋のどの点も「床の上の影 ($P_U v$)」と「床からの高さ ($v - P_U v$)」に一意に分かれます。',
  },
  'minimization-approx': {
    en: 'If you are standing in a field and want to walk to a straight road ($U$) as fast as possible, which way do you walk? Straight perpendicular to the road! Any slanted path is the hypotenuse of a right triangle and is strictly longer. That is literally how least-squares regression fits the best line to noisy data!',
    zh: '你站在田野里，想用最短距离走到一条笔直的公路 ($U$) 上，该怎么走？当然是**垂直走向公路**！斜着走都是直角三角形的斜边，肯定更长。最小二乘法给散乱数据拟合最佳直线，背后的几何原理一模一样！',
    ja: '草原から真っ直ぐな道路 ($U$) へ最短距離で行くには、道路へ「垂直」に歩くしかありません。斜めの道は直角三角形の斜辺になり必ず遠回りです。最小二乗法によるデータ近似はまさにこの原理です！',
  },
  'pseudoinverse': {
    en: 'Suppose you want to solve $Tv = b$, but either $T$ crushed some directions to 0 (infinitely many solutions) or $b$ lies off the reachable plane (no exact solution). The pseudoinverse $T^\\dagger$ does the smartest possible compromise: first drop $b$ perpendicularly onto the closest reachable point, then pick the shortest possible vector $v$ that lands there!',
    zh: '解方程 $Tv = b$ 时经常遇到两种尴尬：要么 $b$ 根本够不着（无解），要么解有无穷多个。伪逆 $T^\\dagger$ 给出了最聪明的折中方案：先把 $b$ 垂直投影到最近的可达点，再在所有能到达那里的向量中挑出**最短**的那一个！',
    ja: '$Tv = b$ に解がない、あるいは無限にあるとき、擬似逆 $T^\\dagger$ は「まず $b$ を最も近い到達可能な点へ垂線で落とし、そこへ行く解の中で最も短いベクトルを選ぶ」という最良の妥協解を与えます。',
  },
};
