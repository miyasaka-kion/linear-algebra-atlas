import React, { createContext, useContext, useState } from 'react';
import { BookId, KnowledgeNode, Lang } from '../data/types';
import { BOOKS, resolveRefToNode } from '../data/knowledgeGraph';
import { MathTex } from './MathTex';

export interface RefLinkContextValue {
  bookId: BookId;
  currentNodeId: string | null;
  activeLangs: Lang[];
  onJumpNode: (nodeId: string) => void;
}

export const RefLinkContext = createContext<RefLinkContextValue | null>(null);

interface TheoremRefLinkProps {
  refNum: string;
}

export const TheoremRefLink: React.FC<TheoremRefLinkProps> = ({ refNum }) => {
  const ctx = useContext(RefLinkContext);
  const [hovered, setHovered] = useState(false);

  if (!ctx) return <>{refNum}</>;

  const target: KnowledgeNode | null = resolveRefToNode(ctx.bookId, refNum);
  if (!target) return <>{refNum}</>;

  const book = BOOKS[ctx.bookId];
  const color = book.chapterMap[target.chapter].color;
  const isSelf = ctx.currentNodeId === target.id;

  return (
    <span
      className="ref-link-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className={`ref-link-btn ${isSelf ? 'is-self' : ''}`}
        style={{ '--ref-color': color } as React.CSSProperties}
        onClick={(e) => {
          e.stopPropagation();
          if (!isSelf) {
            setHovered(false);
            ctx.onJumpNode(target.id);
          }
        }}
      >
        {refNum}
      </button>

      {hovered && (
        <span
          className="ref-popover"
          style={{ borderLeftColor: color }}
          role="tooltip"
        >
          <span className="ref-pop-head">
            <span style={{ color }}>
              Ch.{target.chapter} · {target.section} · {target.ref}
            </span>
            <span className="ref-pop-hint">
              {isSelf ? 'Current' : 'Click to jump →'}
            </span>
          </span>
          <span className="ref-pop-titles">
            {ctx.activeLangs.map((l, idx) => (
              <span
                key={l}
                className={`ref-pop-title ${idx === 0 ? 'primary' : 'secondary'}`}
              >
                {target.title[l]}
              </span>
            ))}
          </span>
          <span className="ref-pop-formula">
            <MathTex tex={target.formula} />
          </span>
        </span>
      )}
    </span>
  );
};
