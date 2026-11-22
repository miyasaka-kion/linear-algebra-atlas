import { TrilingualText } from '../types';

export const DEEP_LADR_1: Record<string, TrilingualText> = {
  'field-fn': {
    en: 'Think of a list in $\\mathbb{F}^n$ like a shopping receipt with $n$ slots: $(3, 5, 2)$ means 3 apples, 5 bananas, 2 oranges. Adding two receipts just adds each item separately, and doubling a receipt multiplies every slot by 2. Using complex numbers $\\mathbb{C}$ instead of real numbers $\\mathbb{R}$ is like upgrading from a 1D ruler to a 2D compass that can also rotate.',
    zh: '把 $\\mathbb{F}^n$ 想象成一张有 $n$ 个格子的购物清单：$(3, 5, 2)$ 代表 3 个苹果、5 根香蕉、2 个橘子。两张清单相加就是逐项相加，买两份就是每个数字乘 2。允许使用复数 $\\mathbb{C}$，就像把只能伸缩的直尺升级成还能旋转的罗盘。',
    ja: '$\\mathbb{F}^n$ の組は $n$ 項目ある買い物リストのようなものです。足し算は項目ごとの合計、スカラー倍は全体を何倍かにする操作。実数 $\\mathbb{R}$ から複素数 $\\mathbb{C}$ へ広げると、伸縮だけでなく「回転」も数として扱えるようになります。',
  },
  'vs-def': {
    en: 'Why define a "vector space" with 8 rules instead of just talking about arrows? Because sound waves, images, polynomials, and financial portfolios can ALL be added together and scaled up or down! By proving a theorem once from those 8 simple rules, it automatically works for arrows, audio signals, and quantum states all at once.',
    zh: '为什么不直接讲“几何箭头”，而要定 8 条公理？因为音频波形、图片像素、多项式甚至投资组合，全都可以“相加”和“按比例缩放”！只要从这 8 条规则出发证明一个定理，它就同时对箭头、信号处理和量子态全都成立，不用重复发明轮子。',
    ja: 'なぜ矢印だけでなく 8 つの公理で定義するのか？音波・画像・多項式・関数もすべて「足して何倍かする」ことができるからです。公理から一度証明すれば、矢印にも信号処理にも量子力学にもそのまま使えるのです。',
  },
  'vs-props': {
    en: 'These are the sanity checks you expect from everyday numbers: zero times any vector gives the zero vector, and multiplying by $-1$ flips a vector to its exact opposite. Proving them from the 8 axioms guarantees our abstract sandbox has no weird loopholes.',
    zh: '这些就像日常算术的“防呆检查”：任何东西乘以 0 都是 0，乘以 $-1$ 就是刚好反向抵消。从公理把它们推出来，能确保这套抽象游戏规则里没有任何奇怪的漏洞。',
    ja: '日常の算数と同じ「0 を掛ければ 0、$-1$ を掛ければ逆向き」という常識が、抽象的な空間でも例外なく成り立つことを公理だけで保証する安全確認です。',
  },
  'subspace-def': {
    en: 'Imagine living in a 3D room where the origin $(0,0,0)$ is the corner of the floor. A flat sheet of paper passing through that corner is a subspace: if you add two arrows lying on the paper or stretch them, they stay trapped on the paper. A floating sheet that misses the corner is NOT a subspace, because scaling an arrow by 0 sends it to the corner—off the sheet!',
    zh: '想象你在一个三维房间里，原点 $(0,0,0)$ 是墙角。一张穿过这个墙角的无限大平纸就是一个子空间：纸上任意两个箭头相加或伸缩，结果永远跑不出这张纸。但如果纸悬在半空没经过墙角，它就不是子空间——因为把箭头乘以 0 会掉回墙角，跑出纸面了！',
    ja: '3次元の部屋の隅を原点とします。その隅を通る平坦なシートが部分空間です。シート上の矢印を足しても伸ばしても外に出ません。しかし原点を通らない浮いたシートは、0倍すると原点に落ちてシートから外れるため部分空間になりません。',
  },
  'sum-subspaces': {
    en: 'Suppose you have two sticks pointing in different directions from the origin. The union of just the two sticks is shaped like an "X"—you cannot add a point on stick 1 to a point on stick 2 and stay on the X. The "sum" $U_1 + U_2$ fills in the entire flat sheet spanned by both sticks.',
    zh: '假设原点伸出两根不同方向的棍子。两根棍子的并集只是一个“X”形，你把棍子 1 和棍子 2 上的点相加就会跑到 X 外面去。子空间的“和” $U_1 + U_2$ 就是把这两根棍子之间的空白填满，变成一整张平面。',
    ja: '原点から伸びる2本の棒を合わせただけでは「X」字型で、足し算すると外にはみ出します。部分空間の「和」は、2本の棒から到達できる隙間をすべて埋めて1枚の平面にする操作です。',
  },
  'direct-sum': {
    en: 'Think of giving street directions in Manhattan: "3 blocks East, 4 blocks North." There is ONLY ONE way to reach that corner using East and North! That uniqueness is a direct sum ($U \\oplus W$). If you added a third diagonal street "Northeast," you could reach the same spot in many different ways—so it would NOT be a direct sum.',
    zh: '就像在网格状城市里指路：“向东走 3 个街区，再向北走 4 个街区”。只用东、北两个方向，到达任意路口的方法都**唯一**，这就是直和 $U \\oplus W$！如果再多给一条斜着的“东北大街”，同一个点就有无数种走法，那就不叫直和了。',
    ja: '碁盤の目の街で「東へ3ブロック、北へ4ブロック」と道案内するとき、目的地への表し方はただ1通りです。この重複のない一意な分解が直和 $U \\oplus W$ です。斜め通りを追加すると表し方が何通りも出てしまい、直和ではなくなります。',
  },
  'span-def': {
    en: 'Imagine a robot that can only move along a fixed set of thrust vectors (forward/backward by any amount). The "span" is the map of every single spot in the universe that the robot can possibly reach. If it only has one thruster, its span is a 1D line; with two non-parallel thrusters, it can reach an entire 2D plane.',
    zh: '想象一架只能沿固定几个推进器方向前进或后退的无人机。“张成空间 (Span)”就是这架无人机能到达的所有位置的地图。只有一个推进器，它只能走一条直线；有两个不平行的推进器，它就能飞遍整个平面。',
    ja: '決まった方向の推進器だけを持つドローンが、任意の距離だけ前後に動いて到達できる場所全体の地図が「張る空間 (Span)」です。推進器が1本なら直線上だけ、平行でない2本があれば平面全体を自由に動けます。',
  },
  'lin-indep': {
    en: 'Linear independence simply means "no dead weight." Suppose you have 3 thrusters on a spaceship, but thruster #3 pushes in the exact same direction as firing #1 and #2 together. Then #3 is redundant—removing it doesn’t shrink where you can go at all! A linearly independent list has zero redundant thrusters.',
    zh: '线性无关就是“团队里没有划水的多余成员”。假如飞船有 3 个推进器，但 3 号推进器的方向恰好等于 1 号和 2 号合力，那 3 号就是多余的——拆掉它，飞船能去的地方一点没少！线性无关意味着拆掉任何一个都会少掉一块可达区域。',
    ja: '線形独立とは「無駄なメンバーが1人もいない状態」です。3つ目の推進器が1つ目と2つ目の組み合わせで代用できるなら冗長（線形従属）。誰か1人でも抜けると到達できる世界が狭まるのが線形独立です。',
  },
  'len-indep-span': {
    en: 'Suppose 3 basic paint colors (Red, Green, Blue) are enough to mix EVERY color on your screen (a spanning list of length 3). Can you invent 4 completely independent colors where none can be mixed from the others? Impossible! You can never have more independent ingredients than a complete spanning set.',
    zh: '假如红、绿、蓝 3 种基色就已经能调出屏幕上的**所有**颜色（长度为 3 的张成组）。你有可能再找出 4 种彼此完全独立、谁也不能由其他三种调出来的颜色吗？绝不可能！“互不冗余的独立原料数”永远不可能超过“能配出一切的原料数”。',
    ja: '赤・緑・青の3原色ですべての色が作れる（長さ3の生成系）のに、互いに混ぜて作れない「完全に独立な4色」を見つけることは不可能です。独立な組の個数は生成系の個数を決して超えられません。',
  },
  'basis-def': {
    en: 'A basis is the sweet spot: enough directions to reach EVERY point (spanning), with ZERO wasted directions (linearly independent). Just like GPS uses exactly 3 numbers (latitude, longitude, altitude), a basis gives every vector a unique, unambiguous ID card of coordinates.',
    zh: '基就是“刚刚好”的黄金配置：不多不少——方向够多，能到达空间的每个角落（张成）；又没有任何冗余（线性无关）。就像 GPS 用经度、纬度、高度三个数唯一锁定地球上的每个位置一样，一组基给每个向量发了一张唯一的坐标身份证。',
    ja: '基底とは「過不足のない完璧な座標軸」です。空間のどこへでも行けて（生成）、しかも無駄な軸が1本もない（線形独立）。すべてのベクトルに一意の座標（住所）を与えてくれます。',
  },
  'subspace-complement': {
    en: 'Suppose you already have the $x$-axis inside a 3D room ($U$), and you want to split the whole room cleanly into "$U$ plus everything else." Just pick any flat plane ($W$, like the $yz$-plane) that only meets the $x$-axis at the origin. Together they reconstruct the entire 3D room with zero overlap.',
    zh: '假如你在三维房间里先选定了一条 $x$ 轴作为 $U$，想把剩下的空间干干净净地补全。只要随便找一张只和 $x$ 轴在原点相交的平面（比如 $yz$ 平面）作为 $W$，两者合起来就能无重叠地拼出整个三维房间。',
    ja: '3次元空間に $x$ 軸 ($U$) があるとき、原点だけで交わる平面（例えば $yz$ 平面）を $W$ として選べば、重複なく空間全体を $U \\oplus W$ に分割できます。',
  },
  'dim-def': {
    en: 'Whether you measure a room with North-East-Up rulers or tilted diagonal rulers, you ALWAYS need exactly 3 rulers—never 2, never 4. That fixed number (3) is the dimension: it measures the true "degrees of freedom" of the space, regardless of how you tilt your head.',
    zh: '不管你是用“东-北-上”三把尺子量房间，还是用三把斜着放的尺子，你**永远**恰好需要 3 把尺子——绝不会是 2 把，也不会是 4 把。这个死死的数字就是维数：空间真正的自由度个数，和你歪不歪头看它毫无关系。',
    ja: '部屋を測る物差しを斜めに傾けても、必要な本数は必ず3本（2本でも4本でもない）です。座標の取り方に依らないこの不変の自由度の数こそが「次元」です。',
  },
  'dim-sum': {
    en: 'It is just counting friends at a party! If Group A has 2 people and Group B has 2 people, but 1 person is in BOTH groups, the total number of unique people is $2 + 2 - 1 = 3$. For subspaces: two 2D planes in 3D space share a 1D line, so $2 + 2 - 1 = 3$.',
    zh: '就像数派对人数：A 群有 2 个人，B 群有 2 个人，其中有 1 个人两个群都在，那么总人数就是 $2 + 2 - 1 = 3$。三维空间里两个二维平面相交于一条一维直线，总维数正是 $2 + 2 - 1 = 3$！',
    ja: '人数を数えるのと同じです。2次元の平面が2枚あって1次元の直線で交わっていれば、重複を引いて $2 + 2 - 1 = 3$ 次元になります。',
  },
  'lin-map-def': {
    en: 'Picture drawing a square grid on a rubber sheet pinned at the origin. A linear map is any smooth stretch, rotation, shear, or squish that keeps the pin fixed and keeps all grid lines straight, parallel, and evenly spaced—no bending, no curling! Because the grid stays uniform, once you know where the two unit arrows $\\hat{\\imath}, \\hat{\\jmath}$ land, you instantly know where EVERY point on the sheet lands.',
    zh: '想象一张钉死在原点的橡胶方格纸。线性映射就是不弯曲、不折皱的拉伸、旋转、剪切或压扁：钉子不动，所有网格线依然笔直、平行且等距！正因为形变极其均匀，你只要告诉我 $(1,0)$ 和 $(0,1)$ 两个基箭头落到了哪里，整张纸上所有点的去向就瞬间全知道了。',
    ja: '原点に画鋲で留めたゴムの方眼紙を想像してください。格子線を曲げずに平行かつ等間隔のまま伸ばしたり回転させたりする変形が線形写像です。基本の2本の矢印の行き先だけで全体の変形が完全に決まります。',
  },
  'null-range-def': {
    en: 'Think of shining a flashlight straight down on a 3D wireframe onto a flat table (the 2D shadow). Everything along a vertical pole gets squished onto the SAME single dot at the origin—that vertical direction is the Null Space (lost information). The flat shadow left on the table is the Range (surviving output). If nothing is lost (Null Space $= \\{0\\}$), no two points collide, so the map is injective!',
    zh: '想象用手电筒从正上方把三维物体投影到桌面上：沿着竖直方向的所有点都被压扁成了原点这一个点——这就是**零空间**（丢失掉的信息）；桌面上留下的二维影子就是**值域**（存活下来的输出）。如果没有任何信息被压丢（零空间只有零点），就不会有两个点撞在一起，映射就是单射！',
    ja: '3次元物体に真上から光を当てて机に影を落とす状況を想像してください。真下に潰れて原点に消える方向が「零空間（失われた情報）」、机に残る影が「値域（残った出力）」です。消える情報がゼロなら衝突が起きない（単射）！',
  },
  'fund-thm-lin-maps': {
    en: 'This is the "Conservation of Dimensions" law. Suppose you start with a 3D object (3 degrees of freedom) and project it onto a 2D table. Since 1 dimension (height) got crushed into the Null Space, the surviving shadow on the table MUST have $3 - 1 = 2$ dimensions. You can never create dimensions out of thin air: $\\text{Input Dim} = \\text{Crushed Dim} + \\text{Surviving Dim}$.',
    zh: '这就是线性代数的**维数守恒定律**：输入的总自由度 = 被压扁消失的自由度（零空间）+ 存活下来的自由度（值域）。把三维物体压到二维桌面上，高度这 1 维被压扁进了零空间，那么桌面上存活的影子就必然是 $3 - 1 = 2$ 维——维度既不会凭空产生，也不会无故消失！',
    ja: '「次元の保存則」です。3次元の物体を机に射影すると、高さの1次元が零空間に潰れるため、残る影は必ず $3 - 1 = 2$ 次元になります。「入力の次元 ＝ 潰れた次元 ＋ 生き残った次元」という極めて明快な収支計算です。',
  },
  'matrix-rep': {
    en: 'A matrix is NOT a mysterious box of random numbers! Its columns are literally just the GPS coordinates of where the unit arrows $\\hat{\\imath}$ and $\\hat{\\jmath}$ land after the transformation. And multiplying two matrices $AB$ simply means: first do transformation $B$, then do transformation $A$ to the result!',
    zh: '矩阵绝对不是一堆凭空冒出来的神秘数字！它的每一列，其实就是基向量 $\\hat{\\imath}, \\hat{\\jmath}$ 变换之后的落点坐标。而两个矩阵相乘 $AB$，意思极其简单：先对空间做一次变换 $B$，再紧接着做一次变换 $A$！',
    ja: '行列は謎の数字の表ではありません！各列は単に「基底ベクトルが変換後にどこへ着地したか」の座標メモであり、行列の積 $AB$ は「まず変換 $B$ をして、次に変換 $A$ をする」という連続操作そのものです。',
  },
  'col-row-rank': {
    en: 'Imagine a spreadsheet of 1000 movies rated by 500 users, where every user’s taste is really just a mix of 3 hidden genres (Action, Comedy, Drama). Then every column AND every row is built from those same 3 hidden factors—so the number of independent columns ALWAYS equals the number of independent rows!',
    zh: '想象一张 1000 部电影 × 500 位用户的评分表，假设所有人打分背后其实只由 3 种隐藏偏好（动作、喜剧、剧情）决定。那么不管是按列看还是按行看，真正独立的自由度都是这 3 个——这就是为什么列秩永远等于行秩！',
    ja: '1000本の映画×500人の評価表が、実は3つの隠れジャンル（アクション・喜劇・ドラマ）の組み合わせで決まっているなら、列の独立数も行の独立数もどちらも同じ3になります。それが「列階数＝行階数」の本質です。',
  },
  'invertible-map': {
    en: 'An invertible map is one that has a perfect "Undo" button. On a finite-dimensional room (say 3D $\\to$ 3D), if you don’t squish anything flat (injective), you automatically fill the whole room (surjective)—just like seating 10 people in 10 chairs: if no two people share a chair, every chair MUST be occupied!',
    zh: '可逆映射就是拥有完美“撤销键 (Ctrl+Z)”的变换。在同维空间（比如 10 个人坐 10 把椅子）里，只要没有两个人挤在同一把椅子上（单射），那这 10 把椅子必然全部坐满（满射）！更换基就像用中文或英文描述同一个动作，动作本身没变，只是换了翻译词典 $P^{-1}AP$。',
    ja: '可逆とは完璧な「元に戻す (Undo)」ボタンがあること。同じ次元（10人が10脚の椅子に座る）なら、誰とも席が被らなければ（単射）必ず全席埋まります（全射）。基底変換 $P^{-1}AP$ は同じ変換を別の座標言語で言い換える翻訳です。',
  },
  'quotient-space': {
    en: 'Imagine a 3D building where you ONLY care about which floor you are on, not where you stand on that floor. Every point on the 2nd floor gets treated as ONE single object ("Floor 2"). You just collapsed each 2D horizontal floor ($U$) into a single point, leaving a 1D elevator shaft ($V/U$) of floor numbers!',
    zh: '想象一栋大楼，你只关心自己“在第几层”，完全不在乎站在这一层的哪个角落。把每一层的整个二维平面 ($U$) 都“捏成一个点”，整栋三维大楼就坍缩成了一条一维的电梯楼层轴 ($V/U$)！商空间就是“忽略某些你不在乎的差异”后剩下的精简空间。',
    ja: 'ビルの「何階にいるか」だけを気にして、各階のどの位置にいるかを無視する状況です。2次元の各フロア ($U$) をまるごと1点に同一視すると、3次元のビルが1次元の「階数（エレベーター軸）」($V/U$) になります。',
  },
  'dual-space': {
    en: 'Think of a vector as a basket of fruit $(3\\text{ apples}, 2\\text{ bananas})$, and a "dual functional" as a price tag list: "$\\$2$ per apple, $\\$1$ per banana." Feeding the basket into the price tag outputs one single number (the total bill: $\\$8$). Geometrically, a dual functional draws evenly spaced contour lines (like a topographic map)—wherever your arrow tip lands, you read off its altitude!',
    zh: '把向量想象成一篮水果（3 个苹果、2 根香蕉），而“对偶泛函”就是一张价目表（苹果 2 元、香蕉 1 元）。把水果篮放进价目表，就吐出一个标量总价（8 元）。几何上，它就像地形图上等距平行的等高线：向量箭头落到哪条线上，就读出对应的海拔数值！',
    ja: 'ベクトルを「果物カゴ（リンゴ3個、バナナ2本）」、双対汎関数を「値札リスト（リンゴ200円、バナナ100円）」と思うと、カゴを値札に通せば合計金額という1つの数が返ります。幾何学的には空間に引かれた等高線です。',
  },
  'dual-map': {
    en: 'Suppose map $T$ converts raw ingredients into baked cakes, and a dual functional $\\varphi$ prices finished cakes into dollars. The dual map $T\'$ works backward: it tells you the dollar value of the raw ingredients by first baking them ($T$) and then pricing them ($\\varphi$)! In matrix form, reversing the arrow like this literally flips rows and columns—that is WHY matrix transpose exists!',
    zh: '假设映射 $T$ 把面粉变成蛋糕，泛函 $\\varphi$ 给蛋糕定价。对偶映射 $T\'$ 就是“反向定价”：想知道面粉值多少钱？先用 $T$ 烤成蛋糕，再用 $\\varphi$ 标价！写成矩阵时，这种方向反转恰好就是把行和列互换——这就是“矩阵转置”的真正来历！',
    ja: '写像 $T$ が材料をケーキに変え、汎関数 $\\varphi$ がケーキに値段をつけるとき、双対写像 $T\'$ は「材料をケーキにしてから値段を見る」ことで材料の価値を逆算します。行列で書くとちょうど行と列の入れ替え（転置）になります！',
  },
  'annihilator': {
    en: 'Suppose you have a subspace $U$ (say, the $x$-axis), and you look for all price-tag functionals that assign $\\$0$ to every vector on $U$ (so they only charge for the $y$ and $z$ components). That set of "blind to $U$" functionals is the annihilator $U^0$. In a 3D space, ignoring 1 direction leaves $3 - 1 = 2$ free dimensions of functionals.',
    zh: '假如有一条 $x$ 轴子空间 $U$，你收集所有“对 $U$ 上一切向量都打 0 分（只看 $y, z$ 分量）”的评价标准，这些标准合起来就是零化子 $U^0$。在 3 维空间里，屏蔽掉 1 维，剩下的自由评价维度正好是 $3 - 1 = 2$ 维。',
    ja: '部分空間 $U$ 上のどのベクトルに対しても「0円」と評価する値札（汎関数）の集まりが零化空間 $U^0$ です。3次元空間で1次元分を無視すると、自由に選べる評価軸は $3 - 1 = 2$ 次元残ります。',
  },
};
