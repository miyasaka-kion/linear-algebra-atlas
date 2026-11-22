import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Sparkles, Link2 } from 'lucide-react';
import { KnowledgeNode, Lang } from '../data/types';
import { MathTex } from './MathTex';
import { RichMathText } from './RichMathText';

export interface KnowledgeNodeData extends Record<string, unknown> {
  node: KnowledgeNode;
  chapterColor: string;
  activeLangs: Lang[];
  showFurigana: boolean;
  hasBridge: boolean;
  isOverviewBeacon?: boolean;
  highlightState: 'normal' | 'selected' | 'upstream' | 'downstream' | 'dimmed';
  isMastered: boolean;
}

export const KnowledgeNodeCard: React.FC<NodeProps> = memo(({ data }) => {
  const {
    node,
    chapterColor,
    activeLangs,
    showFurigana,
    hasBridge,
    isOverviewBeacon,
    highlightState,
    isMastered,
  } = data as KnowledgeNodeData;

  const classes = [
    'k-node',
    node.kind === 'milestone' ? 'is-milestone' : '',
    highlightState === 'selected' ? 'is-selected' : '',
    highlightState === 'selected' && isOverviewBeacon ? 'is-beacon' : '',
    highlightState === 'upstream' ? 'is-upstream' : '',
    highlightState === 'downstream' ? 'is-downstream' : '',
    highlightState === 'dimmed' ? 'is-dimmed' : '',
    isMastered ? 'is-mastered' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{ '--node-color': chapterColor } as React.CSSProperties}
    >
      <Handle type="target" position={Position.Left} className="k-handle" />

      <div className="k-node-head">
        <span className="k-node-ref">
          <strong>{node.section}</strong>
          <span>· {node.ref}</span>
        </span>
        <span className="k-node-badges">
          {node.field && node.field !== 'F' && (
            <span className="k-kind-tag">{node.field}</span>
          )}
          <span className="k-kind-tag">
            {node.kind === 'milestone'
              ? '★'
              : node.kind === 'definition'
              ? 'DEF'
              : 'THM'}
          </span>
          {hasBridge && (
            <span className="k-bridge-dot" title="Cross-book bridge">
              <Link2 size={10} />
            </span>
          )}
          {node.viz && (
            <span className="k-viz-dot" title="Interactive Visualization">
              <Sparkles size={10} />
            </span>
          )}
        </span>
      </div>

      <div className="k-node-titles">
        {activeLangs.includes('en') && (
          <div className="k-title-en">
            <RichMathText text={node.title.en} />
          </div>
        )}
        {activeLangs.includes('zh') && (
          <div className="k-title-zh">
            <RichMathText text={node.title.zh} />
          </div>
        )}
        {activeLangs.includes('ja') && (
          <div className="k-title-ja">
            <RichMathText
              text={node.title.ja}
              isJa
              furigana={showFurigana}
            />
          </div>
        )}
      </div>

      {node.kind === 'milestone' && (
        <div className="k-node-formula">
          <MathTex tex={node.formula} />
        </div>
      )}

      <Handle type="source" position={Position.Right} className="k-handle" />
    </div>
  );
});
