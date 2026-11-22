import React, { useEffect, useState } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Check,
  ArrowLeft,
  ArrowRight,
  Link2,
  ScanSearch,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from 'lucide-react';
import { BookId, KnowledgeEdge, KnowledgeNode, Lang, TrilingualText } from '../data/types';
import { BOOKS, getBridgesForNode } from '../data/knowledgeGraph';
import { DEEP_INTUITIONS } from '../data/deepIntuitions';
import { MathTex } from './MathTex';
import { VisualizerStage } from './visualizers/VisualizerStage';
import { RichMathText } from './RichMathText';

interface DetailDrawerProps {
  bookId: BookId;
  node: KnowledgeNode;
  activeLangs: Lang[];
  showFurigana: boolean;
  activeEdges: KnowledgeEdge[];
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
  onSelectNode: (id: string) => void;
  onJumpCrossBook: (targetBook: BookId, targetNodeId: string) => void;
  onZoomOverview: () => void;
  onClose: () => void;
}

const StackedLangTitle: React.FC<{
  text: TrilingualText;
  activeLangs: Lang[];
  showFurigana: boolean;
}> = ({ text, activeLangs, showFurigana }) => (
  <span className="stacked-lang">
    {activeLangs.map((l, idx) => (
      <span
        key={l}
        className={`stacked-lang-line ${idx === 0 ? 'primary' : 'secondary'}`}
      >
        <RichMathText text={text[l]} isJa={l === 'ja'} furigana={showFurigana} />
      </span>
    ))}
  </span>
);

const MultiLangBlock: React.FC<{
  text: TrilingualText;
  activeLangs: Lang[];
  showFurigana: boolean;
}> = ({ text, activeLangs, showFurigana }) => (
  <div className="lang-block">
    {activeLangs.map((lang, idx) => (
      <div className="lang-row" key={lang}>
        <span className="lang-tag">{lang}</span>
        <p className={`lang-text ${idx === 0 ? 'primary' : ''}`}>
          <RichMathText
            text={text[lang]}
            isJa={lang === 'ja'}
            furigana={showFurigana}
          />
        </p>
      </div>
    ))}
  </div>
);

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  bookId,
  node,
  activeLangs,
  showFurigana,
  activeEdges,
  isMastered,
  onToggleMastered,
  onSelectNode,
  onJumpCrossBook,
  onZoomOverview,
  onClose,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showDeepIntuition, setShowDeepIntuition] = useState(false);
  const book = BOOKS[bookId];
  const chapter = book.chapterMap[node.chapter];
  const deepIntuition = DEEP_INTUITIONS[node.id];

  // Collapse deep intuition when switching to another node so drawer stays clean
  useEffect(() => {
    setShowDeepIntuition(false);
  }, [node.id]);

  const directParents = activeEdges
    .filter((e) => e.target === node.id)
    .map((e) => book.nodeMap[e.source])
    .filter(Boolean);

  const directChildren = activeEdges
    .filter((e) => e.source === node.id)
    .map((e) => book.nodeMap[e.target])
    .filter(Boolean);

  const bridges = getBridgesForNode(bookId, node.id);

  return (
    <aside className={`detail-drawer ${expanded ? 'expanded' : ''}`}>
      <div className="drawer-header">
        <div className="drawer-meta">
          <span className="ch-dot" style={{ background: chapter.color }} />
          <span>
            Ch.{node.chapter} · {node.section} · {node.ref}
          </span>
          {node.field && node.field !== 'F' && (
            <span className="k-kind-tag">over {node.field}</span>
          )}
        </div>

        <div className="drawer-actions">
          <button
            className="icon-btn"
            onClick={onZoomOverview}
            title="Zoom out to full graph overview"
          >
            <ScanSearch size={12} />
          </button>
          <button
            className={`icon-btn ${isMastered ? 'mastered' : ''}`}
            onClick={() => onToggleMastered(node.id)}
            title="Mark as understood"
          >
            <Check size={12} />
            {isMastered ? 'Mastered' : 'Mark'}
          </button>
          {node.viz && (
            <button
              className="icon-btn"
              onClick={() => setExpanded((e) => !e)}
              title="Expand visualization panel"
            >
              {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
          )}
          <button className="icon-btn" onClick={onClose} title="Close & Zoom Out">
            <X size={13} />
          </button>
        </div>
      </div>

      <div className="drawer-body">
        {/* Trilingual Titles */}
        <div className="drawer-titles">
          {activeLangs.includes('en') && (
            <h2 className="drawer-title-en">
              <RichMathText text={node.title.en} />
            </h2>
          )}
          {activeLangs.includes('zh') && (
            <div className="drawer-title-zh">
              <RichMathText text={node.title.zh} />
            </div>
          )}
          {activeLangs.includes('ja') && (
            <div className="drawer-title-ja">
              <RichMathText
                text={node.title.ja}
                isJa
                furigana={showFurigana}
              />
            </div>
          )}
        </div>

        {/* Formula Block */}
        <div className="formula-box" style={{ borderLeftColor: chapter.color }}>
          <MathTex tex={node.formula} display />
        </div>

        {/* 3b1b Interactive Visualizer */}
        {node.viz && (
          <VisualizerStage
            viz={node.viz}
            activeLangs={activeLangs}
            showFurigana={showFurigana}
          />
        )}

        {/* Cross-Book Bridges */}
        {bridges.length > 0 && (
          <section className="drawer-section">
            <div className="section-kicker" style={{ color: '#76A695' }}>
              <Link2 size={11} />
              {bookId === 'ladr'
                ? 'Extended in Matrix Analysis'
                : 'Foundation in LADR 4e'}
            </div>
            <div className="bridge-list">
              {bridges.map(({ targetBook, targetNode, bridge }) => (
                <button
                  key={`${targetBook}-${targetNode.id}`}
                  className="bridge-card"
                  onClick={() => onJumpCrossBook(targetBook, targetNode.id)}
                >
                  <div className="bridge-card-top">
                    <span className="bridge-book-tag">
                      {BOOKS[targetBook].code} · {targetNode.ref}
                    </span>
                    <ArrowRight size={12} />
                  </div>
                  <div className="bridge-card-title">
                    <StackedLangTitle
                      text={targetNode.title}
                      activeLangs={activeLangs}
                      showFurigana={showFurigana}
                    />
                  </div>
                  <div className="bridge-card-note">
                    <StackedLangTitle
                      text={bridge.note}
                      activeLangs={activeLangs}
                      showFurigana={showFurigana}
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Formal Statement */}
        <section className="drawer-section">
          <div className="section-kicker">Statement</div>
          <MultiLangBlock
            text={node.statement}
            activeLangs={activeLangs}
            showFurigana={showFurigana}
          />
        </section>

        {/* Intuition */}
        <section className="drawer-section">
          <div className="section-kicker-row">
            <div className="section-kicker" style={{ marginBottom: 0 }}>
              Intuition
            </div>
            {deepIntuition && (
              <button
                type="button"
                className={`deep-toggle-btn ${showDeepIntuition ? 'open' : ''}`}
                onClick={() => setShowDeepIntuition((v) => !v)}
              >
                <Lightbulb size={11} />
                {showDeepIntuition ? 'Hide Plain Guide' : 'Explain Simply'}
                {showDeepIntuition ? (
                  <ChevronUp size={11} />
                ) : (
                  <ChevronDown size={11} />
                )}
              </button>
            )}
          </div>
          <MultiLangBlock
            text={node.intuition}
            activeLangs={activeLangs}
            showFurigana={showFurigana}
          />
          {deepIntuition && showDeepIntuition && (
            <div className="deep-intuition-box">
              <MultiLangBlock
                text={deepIntuition}
                activeLangs={activeLangs}
                showFurigana={showFurigana}
              />
            </div>
          )}
        </section>

        {/* Proof Sketch */}
        {node.proofSketch && (
          <section className="drawer-section">
            <div className="section-kicker">Proof Sketch</div>
            <MultiLangBlock
              text={node.proofSketch}
              activeLangs={activeLangs}
              showFurigana={showFurigana}
            />
          </section>
        )}

        {/* Upstream Prerequisites */}
        {directParents.length > 0 && (
          <section className="drawer-section">
            <div className="section-kicker section-kicker-muted">
              <ArrowLeft size={11} />
              Depends On ({directParents.length})
            </div>
            <div className="dep-grid">
              {directParents.map((p) => (
                <button
                  key={p.id}
                  className="dep-chip"
                  onClick={() => onSelectNode(p.id)}
                >
                  <span
                    className="dep-chip-ref"
                    style={{ color: book.chapterMap[p.chapter].color }}
                  >
                    {p.ref}
                  </span>
                  <StackedLangTitle
                    text={p.title}
                    activeLangs={activeLangs}
                    showFurigana={showFurigana}
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Downstream Consequences */}
        {directChildren.length > 0 && (
          <section className="drawer-section">
            <div className="section-kicker section-kicker-muted">
              <ArrowRight size={11} />
              Leads To ({directChildren.length})
            </div>
            <div className="dep-grid">
              {directChildren.map((c) => (
                <button
                  key={c.id}
                  className="dep-chip"
                  onClick={() => onSelectNode(c.id)}
                >
                  <span
                    className="dep-chip-ref"
                    style={{ color: book.chapterMap[c.chapter].color }}
                  >
                    {c.ref}
                  </span>
                  <StackedLangTitle
                    text={c.title}
                    activeLangs={activeLangs}
                    showFurigana={showFurigana}
                  />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
};
