import dagre from 'dagre';
import { Edge, Node } from '@xyflow/react';
import { KnowledgeEdge, KnowledgeNode, Lang } from '../data/types';

export interface LayoutResult {
  nodes: Node[];
  edges: Edge[];
}

export function computeDagreLayout(
  kNodes: KnowledgeNode[],
  kEdges: KnowledgeEdge[],
  activeLangs: Lang[]
): Map<string, { x: number; y: number }> {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));

  // Estimate node height based on number of enabled languages
  const langCount = Math.max(1, activeLangs.length);
  const nodeWidth = 252;
  const nodeHeight = 68 + langCount * 22;

  g.setGraph({
    rankdir: 'LR',
    nodesep: 28,
    ranksep: 88,
    marginx: 40,
    marginy: 40,
    acyclicer: 'greedy',
    ranker: 'network-simplex',
  });

  for (const n of kNodes) {
    g.setNode(n.id, {
      width: nodeWidth,
      height: n.kind === 'milestone' ? nodeHeight + 22 : nodeHeight,
    });
  }

  for (const e of kEdges) {
    g.setEdge(e.source, e.target);
  }

  dagre.layout(g);

  const positions = new Map<string, { x: number; y: number }>();
  for (const n of kNodes) {
    const pos = g.node(n.id);
    if (pos) {
      positions.set(n.id, {
        x: pos.x - pos.width / 2,
        y: pos.y - pos.height / 2,
      });
    }
  }

  return positions;
}
