export type Lang = 'en' | 'zh' | 'ja';
export type BookId = 'ladr' | 'matrix-analysis';

export interface TrilingualText {
  en: string;
  zh: string;
  ja: string;
}

export type NodeTier = 'core' | 'detailed';
export type NodeKind = 'definition' | 'theorem' | 'milestone';
export type FieldScope = 'F' | 'C' | 'R';

export type VizType =
  | 'linear-map'
  | 'eigen'
  | 'inner-product'
  | 'spectral-svd'
  | 'determinant'
  | 'norm-ball'
  | 'condition-number'
  | 'markov-perron'
  | 'spectral-graph';

export interface VizConfig {
  type: VizType;
  preset: string;
  caption: TrilingualText;
}

export interface KnowledgeNode {
  id: string;
  ref: string;
  chapter: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  section: string;
  tier: NodeTier;
  kind: NodeKind;
  field?: FieldScope;
  title: TrilingualText;
  formula: string;
  statement: TrilingualText;
  intuition: TrilingualText;
  proofSketch?: TrilingualText;
  viz?: VizConfig;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  relation?: 'requires' | 'corollary' | 'generalizes';
}

export interface LearningPath {
  id: string;
  title: TrilingualText;
  description: TrilingualText;
  nodeIds: string[];
  accent: string;
}

export interface ChapterMeta {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  title: TrilingualText;
  shortTitle: TrilingualText;
  color: string;
}

export interface CrossBookBridge {
  ladrId: string;
  maId: string;
  note: TrilingualText;
}
