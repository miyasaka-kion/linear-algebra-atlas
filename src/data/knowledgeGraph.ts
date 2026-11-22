import {
  BookId,
  ChapterMeta,
  CrossBookBridge,
  KnowledgeEdge,
  KnowledgeNode,
  LearningPath,
  NodeTier,
  TrilingualText,
} from './types';
import { CHAPTERS, CHAPTER_MAP, LEARNING_PATHS } from './chapters';
import { NODES_PART_1 } from './nodesPart1';
import { NODES_PART_2 } from './nodesPart2';
import { NODES_PART_3 } from './nodesPart3';
import { RAW_EDGES } from './edges';
import { MA_CHAPTERS, MA_CHAPTER_MAP, MA_LEARNING_PATHS } from './matrixAnalysis/chapters';
import { MA_NODES } from './matrixAnalysis/nodes';
import { MA_EDGES } from './matrixAnalysis/edges';
import { CROSS_BOOK_BRIDGES } from './bridges';

export interface BookDataset {
  id: BookId;
  code: string;
  tabLabel: TrilingualText;
  title: string;
  author: string;
  chapters: ChapterMeta[];
  chapterMap: Record<number, ChapterMeta>;
  nodes: KnowledgeNode[];
  nodeMap: Record<string, KnowledgeNode>;
  edges: KnowledgeEdge[];
  paths: LearningPath[];
  coreCount: number;
  totalCount: number;
}

const LADR_NODES: KnowledgeNode[] = [
  ...NODES_PART_1,
  ...NODES_PART_2,
  ...NODES_PART_3,
];

export const BOOKS: Record<BookId, BookDataset> = {
  ladr: {
    id: 'ladr',
    code: 'LADR · 4E',
    tabLabel: {
      en: 'LADR 4e',
      zh: 'LADR 4e · 线性代数应该这样学',
      ja: 'LADR 4e · 線形代数',
    },
    title: 'Linear Algebra Done Right',
    author: 'Sheldon Axler',
    chapters: CHAPTERS,
    chapterMap: CHAPTER_MAP,
    nodes: LADR_NODES,
    nodeMap: Object.fromEntries(LADR_NODES.map((n) => [n.id, n])),
    edges: RAW_EDGES,
    paths: LEARNING_PATHS,
    coreCount: LADR_NODES.filter((n) => n.tier === 'core').length,
    totalCount: LADR_NODES.length,
  },
  'matrix-analysis': {
    id: 'matrix-analysis',
    code: 'MAT · ANAL',
    tabLabel: {
      en: 'Matrix Analysis',
      zh: 'Matrix Analysis · 矩阵分析',
      ja: 'Matrix Analysis · 行列解析',
    },
    title: 'Lecture Notes on Matrix Analysis',
    author: 'Mark W. Meckes',
    chapters: MA_CHAPTERS,
    chapterMap: MA_CHAPTER_MAP,
    nodes: MA_NODES,
    nodeMap: Object.fromEntries(MA_NODES.map((n) => [n.id, n])),
    edges: MA_EDGES,
    paths: MA_LEARNING_PATHS,
    coreCount: MA_NODES.filter((n) => n.tier === 'core').length,
    totalCount: MA_NODES.length,
  },
};

export const ALL_NODES_COMBINED_MAP: Record<string, KnowledgeNode> = {
  ...BOOKS.ladr.nodeMap,
  ...BOOKS['matrix-analysis'].nodeMap,
};

/**
 * Computes visible nodes & edges for a given book and granularity tier.
 * In 'core' (skeleton) mode, automatically bridges edges across hidden 'detailed' nodes
 * so no logical derivation chains are ever broken!
 */
export function getBookGraphForTier(
  bookId: BookId,
  tier: NodeTier
): {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
} {
  const book = BOOKS[bookId];
  if (tier === 'detailed') {
    return { nodes: book.nodes, edges: book.edges };
  }

  const visibleIds = new Set(
    book.nodes.filter((n) => n.tier === 'core').map((n) => n.id)
  );

  const adj = new Map<string, string[]>();
  for (const e of book.edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);
    adj.get(e.source)!.push(e.target);
  }

  const edgeSet = new Set<string>();
  const bridgedEdges: KnowledgeEdge[] = [];

  for (const start of visibleIds) {
    const visitedHidden = new Set<string>();
    const queue: string[] = [...(adj.get(start) || [])];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr === start) continue;

      if (visibleIds.has(curr)) {
        const key = `${start}->${curr}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          bridgedEdges.push({ source: start, target: curr });
        }
      } else if (!visitedHidden.has(curr)) {
        visitedHidden.add(curr);
        const nexts = adj.get(curr) || [];
        for (const nxt of nexts) queue.push(nxt);
      }
    }
  }

  return {
    nodes: book.nodes.filter((n) => visibleIds.has(n.id)),
    edges: bridgedEdges,
  };
}

/**
 * Given a selected node ID and active edge list, returns all transitive upstream
 * (prerequisites) and downstream (consequences) node IDs.
 */
export function getLineage(
  nodeId: string,
  edges: KnowledgeEdge[]
): { upstream: Set<string>; downstream: Set<string> } {
  const parents = new Map<string, string[]>();
  const children = new Map<string, string[]>();

  for (const e of edges) {
    if (!children.has(e.source)) children.set(e.source, []);
    children.get(e.source)!.push(e.target);
    if (!parents.has(e.target)) parents.set(e.target, []);
    parents.get(e.target)!.push(e.source);
  }

  const walk = (map: Map<string, string[]>) => {
    const result = new Set<string>();
    const stack = [...(map.get(nodeId) || [])];
    while (stack.length > 0) {
      const id = stack.pop()!;
      if (!result.has(id) && id !== nodeId) {
        result.add(id);
        for (const next of map.get(id) || []) stack.push(next);
      }
    }
    return result;
  };

  return {
    upstream: walk(parents),
    downstream: walk(children),
  };
}

/**
 * Returns cross-book bridge connections for a node in the current book.
 */
export function getBridgesForNode(
  bookId: BookId,
  nodeId: string
): { targetBook: BookId; targetNode: KnowledgeNode; bridge: CrossBookBridge }[] {
  if (bookId === 'ladr') {
    return CROSS_BOOK_BRIDGES.filter((b) => b.ladrId === nodeId)
      .map((bridge) => ({
        targetBook: 'matrix-analysis' as BookId,
        targetNode: BOOKS['matrix-analysis'].nodeMap[bridge.maId],
        bridge,
      }))
      .filter((x) => Boolean(x.targetNode));
  }
  return CROSS_BOOK_BRIDGES.filter((b) => b.maId === nodeId)
    .map((bridge) => ({
      targetBook: 'ladr' as BookId,
      targetNode: BOOKS.ladr.nodeMap[bridge.ladrId],
      bridge,
    }))
    .filter((x) => Boolean(x.targetNode));
}

/**
 * Resolves a theorem reference number (e.g. "3.21", "3.59", "6.38", "2.1")
 * to its matching node in the specified book, supporting both exact refs and ranges like "3.53–3.69".
 */
export function resolveRefToNode(
  bookId: BookId,
  refNum: string
): KnowledgeNode | null {
  const book = BOOKS[bookId];
  const m = refNum.match(/^(\d+)\.(\d+)$/);
  if (!m) return null;
  const ch = parseInt(m[1], 10);
  const num = parseInt(m[2], 10);

  // 1. Exact match first
  for (const n of book.nodes) {
    if (n.ref.trim() === refNum) return n;
  }

  // 2. Range match (e.g. "3.53–3.69" or "1.26-1.31")
  for (const n of book.nodes) {
    const rm = n.ref.match(/^(\d+)\.(\d+)[–-](\d+)\.(\d+)$/);
    if (rm) {
      const c1 = parseInt(rm[1], 10);
      const n1 = parseInt(rm[2], 10);
      const c2 = parseInt(rm[3], 10);
      const n2 = parseInt(rm[4], 10);
      if (ch === c1 && ch === c2 && num >= n1 && num <= n2) {
        return n;
      }
    }
  }
  return null;
}
