import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BookId, KnowledgeEdge, KnowledgeNode, Lang } from '../data/types';
import { BOOKS } from '../data/knowledgeGraph';
import { RichMathText } from './RichMathText';

interface FocusNeighborhoodHUDProps {
  bookId: BookId;
  node: KnowledgeNode;
  activeEdges: KnowledgeEdge[];
  activeLangs: Lang[];
  showFurigana: boolean;
  onSelectNode: (id: string) => void;
}

export const FocusNeighborhoodHUD: React.FC<FocusNeighborhoodHUDProps> = ({
  bookId,
  node,
  activeEdges,
  activeLangs,
  showFurigana,
  onSelectNode,
}) => {
  const book = BOOKS[bookId];

  const parents = activeEdges
    .filter((e) => e.target === node.id)
    .map((e) => book.nodeMap[e.source])
    .filter(Boolean);

  const children = activeEdges
    .filter((e) => e.source === node.id)
    .map((e) => book.nodeMap[e.target])
    .filter(Boolean);

  if (parents.length === 0 && children.length === 0) return null;

  return (
    <div className="focus-hud" key={node.id}>
      {/* Left Floating Column: Direct Prerequisites */}
      {parents.length > 0 && (
        <div className="focus-hud-col focus-hud-left">
          <div className="focus-hud-kicker">
            <ArrowLeft size={10} />
            Direct Prerequisites ({parents.length})
          </div>
          <div className="focus-hud-stack">
            {parents.map((p) => {
              const color = book.chapterMap[p.chapter].color;
              return (
                <button
                  key={p.id}
                  className="ghost-pill"
                  style={{ '--ghost-color': color } as React.CSSProperties}
                  onClick={() => onSelectNode(p.id)}
                >
                  <span className="ghost-pill-ref">{p.ref}</span>
                  <span className="stacked-lang">
                    {activeLangs.map((l, idx) => (
                      <span
                        key={l}
                        className={`stacked-lang-line ${idx === 0 ? 'primary' : 'secondary'}`}
                      >
                        <RichMathText
                          text={p.title[l]}
                          isJa={l === 'ja'}
                          furigana={showFurigana}
                        />
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Right Floating Column: Direct Consequences */}
      {children.length > 0 && (
        <div className="focus-hud-col focus-hud-right">
          <div className="focus-hud-kicker">
            Directly Leads To ({children.length})
            <ArrowRight size={10} />
          </div>
          <div className="focus-hud-stack">
            {children.map((c) => {
              const color = book.chapterMap[c.chapter].color;
              return (
                <button
                  key={c.id}
                  className="ghost-pill"
                  style={{ '--ghost-color': color } as React.CSSProperties}
                  onClick={() => onSelectNode(c.id)}
                >
                  <span className="ghost-pill-ref">{c.ref}</span>
                  <span className="stacked-lang">
                    {activeLangs.map((l, idx) => (
                      <span
                        key={l}
                        className={`stacked-lang-line ${idx === 0 ? 'primary' : 'secondary'}`}
                      >
                        <RichMathText
                          text={c.title[l]}
                          isJa={l === 'ja'}
                          furigana={showFurigana}
                        />
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
