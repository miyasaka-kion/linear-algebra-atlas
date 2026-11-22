import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  Edge,
  Node,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import {
  Search,
  X,
  Layers,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { BookId, Lang, NodeTier } from './data/types';
import {
  BOOKS,
  getBookGraphForTier,
  getBridgesForNode,
  getLineage,
} from './data/knowledgeGraph';
import { computeDagreLayout } from './utils/layoutGraph';
import { fuzzySearchAllBooks } from './utils/fuzzySearch';
import { KnowledgeNodeCard, KnowledgeNodeData } from './components/KnowledgeNodeCard';
import { DetailDrawer } from './components/DetailDrawer';
import { FocusNeighborhoodHUD } from './components/FocusNeighborhoodHUD';
import { RefLinkContext } from './components/RefLinkContext';
import { JaText } from './components/JaText';
import { RichMathText } from './components/RichMathText';

const nodeTypes = { knowledge: KnowledgeNodeCard };
const STORAGE_KEY = 'ladr4e_mastered_nodes_v1';

interface HistoryEntry {
  bookId: BookId;
  nodeId: string | null;
}

const joinLang = (
  obj: Record<Lang, string>,
  activeLangs: Lang[],
  sep = ' · '
) => activeLangs.map((l) => obj[l]).join(sep);

const AtlasCanvas: React.FC = () => {
  const { fitView, setCenter } = useReactFlow();

  // Active Book Tab: 'ladr' | 'matrix-analysis'
  const [bookId, setBookId] = useState<BookId>('ladr');
  const book = BOOKS[bookId];

  // Granularity: 'core' (Skeleton) vs 'detailed' (Comprehensive)
  const [tier, setTier] = useState<NodeTier>('core');

  // Non-mutually-exclusive trilingual toggles + Furigana switch
  const [langs, setLangs] = useState<Record<Lang, boolean>>({
    en: true,
    zh: true,
    ja: false,
  });
  const [showFurigana, setShowFurigana] = useState<boolean>(true);

  const activeLangs = useMemo<Lang[]>(() => {
    const order: Lang[] = ['en', 'zh', 'ja'];
    return order.filter((l) => langs[l]);
  }, [langs]);

  const toggleLang = (lang: Lang) => {
    setLangs((prev) => {
      const next = { ...prev, [lang]: !prev[lang] };
      if (!next.en && !next.zh && !next.ja) return prev;
      return next;
    });
  };

  // Filters & Selection
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchCursor, setSearchCursor] = useState<number>(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);

  // Navigation History Stack (for UI Back/Forward + Mouse Side Buttons + Browser popstate)
  const [history, setHistory] = useState<HistoryEntry[]>([
    { bookId: 'ladr', nodeId: null },
  ]);
  const [histIdx, setHistIdx] = useState<number>(0);
  const pendingFocusRef = useRef<string | null>(null);
  const skipNextFitRef = useRef<boolean>(false);

  // Mastery state persisted in localStorage
  const [mastered, setMastered] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleMastered = useCallback((id: string) => {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore storage quota errors
      }
      return next;
    });
  }, []);

  // Active graph for current book & tier
  const { nodes: kNodes, edges: kEdges } = useMemo(
    () => getBookGraphForTier(bookId, tier),
    [bookId, tier]
  );

  // Compute Dagre layout when book, tier, or active language count changes
  const positions = useMemo(
    () => computeDagreLayout(kNodes, kEdges, activeLangs),
    [kNodes, kEdges, activeLangs]
  );

  // Zoom smoothly onto a node, offset slightly right so it's centered in the left canvas next to the 470px drawer
  const zoomToNode = useCallback(
    (id: string, posMap?: Map<string, { x: number; y: number }>) => {
      const map = posMap || positions;
      const pos = map.get(id);
      if (!pos) return;
      setIsZoomedIn(true);
      const drawerOffset = window.innerWidth > 960 ? 210 : 0;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCenter(pos.x + 125 + drawerOffset, pos.y + 48, {
            zoom: 1.06,
            duration: 520,
          });
        });
      });
    },
    [positions, setCenter]
  );

  const zoomToOverview = useCallback(() => {
    setIsZoomedIn(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fitView({ padding: 0.16, duration: 620 });
      });
    });
  }, [fitView]);

  // Record a navigation step into both React history stack & browser history (for mouse side buttons)
  const navigateTo = useCallback(
    (nextBook: BookId, nextNodeId: string | null, pushBrowser = true) => {
      const targetBookData = BOOKS[nextBook];
      if (nextNodeId) {
        const targetNode = targetBookData.nodeMap[nextNodeId];
        if (targetNode && targetNode.tier === 'detailed' && tier === 'core') {
          setTier('detailed');
        }
      }

      if (nextBook !== bookId) {
        setSelectedChapter(null);
        setSelectedPathId('');
        setSearchQuery('');
        setBookId(nextBook);
        if (nextNodeId) {
          skipNextFitRef.current = true;
          pendingFocusRef.current = nextNodeId;
        }
      } else if (nextNodeId) {
        if (positions.has(nextNodeId)) {
          zoomToNode(nextNodeId);
        } else {
          skipNextFitRef.current = true;
          pendingFocusRef.current = nextNodeId;
        }
      } else {
        zoomToOverview();
      }

      setSelectedNodeId(nextNodeId);

      setHistory((prev) => {
        const current = prev[histIdx];
        if (current && current.bookId === nextBook && current.nodeId === nextNodeId) {
          return prev;
        }
        const trimmed = prev.slice(0, histIdx + 1);
        const updated = [...trimmed, { bookId: nextBook, nodeId: nextNodeId }];
        setHistIdx(updated.length - 1);
        if (pushBrowser) {
          try {
            window.history.pushState(
              { idx: updated.length - 1, bookId: nextBook, nodeId: nextNodeId },
              ''
            );
          } catch {
            // ignore history API errors in restricted contexts
          }
        }
        return updated;
      });
    },
    [bookId, histIdx, positions, tier, zoomToNode, zoomToOverview]
  );

  const applyHistoryEntry = useCallback(
    (entry: HistoryEntry) => {
      const targetBookData = BOOKS[entry.bookId];
      if (entry.nodeId) {
        const targetNode = targetBookData.nodeMap[entry.nodeId];
        if (targetNode && targetNode.tier === 'detailed' && tier === 'core') {
          setTier('detailed');
        }
      }
      if (entry.bookId !== bookId) {
        setSelectedChapter(null);
        setSelectedPathId('');
        setBookId(entry.bookId);
        if (entry.nodeId) {
          skipNextFitRef.current = true;
          pendingFocusRef.current = entry.nodeId;
        }
      } else if (entry.nodeId) {
        if (positions.has(entry.nodeId)) {
          zoomToNode(entry.nodeId);
        } else {
          skipNextFitRef.current = true;
          pendingFocusRef.current = entry.nodeId;
        }
      } else {
        zoomToOverview();
      }
      setSelectedNodeId(entry.nodeId);
    },
    [bookId, positions, tier, zoomToNode, zoomToOverview]
  );

  const goBack = useCallback(() => {
    if (histIdx <= 0) return;
    const nextIdx = histIdx - 1;
    setHistIdx(nextIdx);
    applyHistoryEntry(history[nextIdx]);
  }, [histIdx, history, applyHistoryEntry]);

  const goForward = useCallback(() => {
    if (histIdx >= history.length - 1) return;
    const nextIdx = histIdx + 1;
    setHistIdx(nextIdx);
    applyHistoryEntry(history[nextIdx]);
  }, [histIdx, history, applyHistoryEntry]);

  // Listen to Browser popstate (triggered by mouse side buttons / swipe back)
  useEffect(() => {
    // Seed initial state
    try {
      window.history.replaceState({ idx: 0, bookId: 'ladr', nodeId: null }, '');
    } catch {
      // ignore
    }
    const onPopState = (e: PopStateEvent) => {
      const st = e.state as { idx?: number; bookId?: BookId; nodeId?: string | null } | null;
      if (st && typeof st.idx === 'number' && history[st.idx]) {
        setHistIdx(st.idx);
        applyHistoryEntry(history[st.idx]);
      } else if (st && st.bookId) {
        applyHistoryEntry({ bookId: st.bookId, nodeId: st.nodeId ?? null });
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [history, applyHistoryEntry]);

  // Direct mouse side-button handler (button 3 = Back, button 4 = Forward)
  useEffect(() => {
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 3) {
        e.preventDefault();
        goBack();
      } else if (e.button === 4) {
        e.preventDefault();
        goForward();
      }
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, [goBack, goForward]);

  // Execute pending zoom after layout recalculates (e.g. after switching books or tiers)
  useEffect(() => {
    if (pendingFocusRef.current && positions.has(pendingFocusRef.current)) {
      const targetId = pendingFocusRef.current;
      pendingFocusRef.current = null;
      const timer = setTimeout(() => zoomToNode(targetId, positions), 80);
      return () => clearTimeout(timer);
    }
  }, [positions, zoomToNode]);

  // Refit overview when book or tier changes (unless jumping directly to a specific node)
  useEffect(() => {
    if (skipNextFitRef.current) {
      skipNextFitRef.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fitView({ padding: 0.14, duration: 480 });
    }, 60);
    return () => clearTimeout(timer);
  }, [bookId, tier, fitView]);

  // Selected learning path
  const activePath = useMemo(
    () => book.paths.find((p) => p.id === selectedPathId) || null,
    [book.paths, selectedPathId]
  );

  // Lineage (upstream prerequisites & downstream consequences) of selected node
  const lineage = useMemo(() => {
    if (!selectedNodeId) return null;
    return getLineage(selectedNodeId, kEdges);
  }, [selectedNodeId, kEdges]);

  // Fuzzy search across both books & all fields (title, statement, intuition, formula, typos)
  const searchHits = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return fuzzySearchAllBooks(searchQuery, bookId, 14);
  }, [searchQuery, bookId]);

  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const matched = new Set<string>();
    for (const h of searchHits) {
      if (h.bookId === bookId) matched.add(h.node.id);
    }
    return matched;
  }, [searchQuery, searchHits, bookId]);

  useEffect(() => {
    setSearchCursor(0);
  }, [searchQuery]);

  // Build React Flow Nodes
  const rfNodes = useMemo<Node<KnowledgeNodeData>[]>(() => {
    const pathSet = activePath ? new Set(activePath.nodeIds) : null;

    return kNodes.map((n) => {
      let highlightState: KnowledgeNodeData['highlightState'] = 'normal';

      if (selectedNodeId) {
        if (n.id === selectedNodeId) highlightState = 'selected';
        else if (lineage?.upstream.has(n.id)) highlightState = 'upstream';
        else if (lineage?.downstream.has(n.id)) highlightState = 'downstream';
        else highlightState = 'dimmed';
      } else if (searchMatches) {
        highlightState = searchMatches.has(n.id) ? 'selected' : 'dimmed';
      } else if (pathSet) {
        highlightState = pathSet.has(n.id) ? 'normal' : 'dimmed';
      } else if (selectedChapter !== null) {
        highlightState = n.chapter === selectedChapter ? 'normal' : 'dimmed';
      }

      return {
        id: n.id,
        type: 'knowledge',
        position: positions.get(n.id) || { x: 0, y: 0 },
        data: {
          node: n,
          chapterColor: book.chapterMap[n.chapter].color,
          activeLangs,
          showFurigana,
          hasBridge: getBridgesForNode(bookId, n.id).length > 0,
          isOverviewBeacon: !isZoomedIn,
          highlightState,
          isMastered: mastered.has(n.id),
        },
      };
    });
  }, [
    kNodes,
    positions,
    book.chapterMap,
    bookId,
    activeLangs,
    showFurigana,
    isZoomedIn,
    selectedNodeId,
    lineage,
    searchMatches,
    activePath,
    selectedChapter,
    mastered,
  ]);

  // Build React Flow Edges
  const rfEdges = useMemo<Edge[]>(() => {
    const pathSet = activePath ? new Set(activePath.nodeIds) : null;

    return kEdges.map((e) => {
      const targetNode = book.nodeMap[e.target];
      const chColor = targetNode ? book.chapterMap[targetNode.chapter].color : '#9F9B92';

      let stroke = 'rgba(239, 236, 228, 0.14)';
      let strokeWidth = 1.15;
      let animated = false;
      let opacity = 1;

      if (selectedNodeId && lineage) {
        const isUp =
          (e.target === selectedNodeId || lineage.upstream.has(e.target)) &&
          lineage.upstream.has(e.source);
        const isDown =
          (e.source === selectedNodeId || lineage.downstream.has(e.source)) &&
          lineage.downstream.has(e.target);

        if (isUp) {
          stroke = '#EFECE4';
          strokeWidth = 1.9;
          animated = true;
        } else if (isDown) {
          stroke = chColor;
          strokeWidth = 1.9;
          animated = true;
        } else {
          opacity = 0.08;
        }
      } else if (pathSet) {
        if (pathSet.has(e.source) && pathSet.has(e.target)) {
          stroke = activePath!.accent;
          strokeWidth = 2.0;
          animated = true;
        } else {
          opacity = 0.08;
        }
      } else if (selectedChapter !== null) {
        const sCh = book.nodeMap[e.source]?.chapter;
        const tCh = book.nodeMap[e.target]?.chapter;
        if (sCh === selectedChapter || tCh === selectedChapter) {
          stroke = chColor;
          strokeWidth = 1.5;
        } else {
          opacity = 0.1;
        }
      }

      return {
        id: `${e.source}->${e.target}`,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated,
        style: {
          stroke,
          strokeWidth,
          opacity,
          transition: 'opacity 0.25s ease, stroke 0.25s ease',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 12,
          height: 12,
          color: opacity < 0.2 ? 'rgba(239,236,228,0.08)' : stroke,
        },
      };
    });
  }, [kEdges, book.nodeMap, book.chapterMap, selectedNodeId, lineage, activePath, selectedChapter]);

  // Node click:
  // - Clicking a new node -> select & smoothly zoom IN
  // - Clicking the SAME selected node -> toggle smoothly between Zoom Out (keeping it highlighted with a pulsing beacon!) and Zoom In!
  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (selectedNodeId === node.id) {
        if (isZoomedIn) {
          zoomToOverview();
        } else {
          zoomToNode(node.id);
        }
      } else {
        navigateTo(bookId, node.id);
      }
    },
    [selectedNodeId, isZoomedIn, bookId, navigateTo, zoomToOverview, zoomToNode]
  );

  const selectedNode = selectedNodeId ? book.nodeMap[selectedNodeId] : null;
  const primaryLang = activeLangs[0] || 'en';

  const masteredInBook = useMemo(
    () => book.nodes.filter((n) => mastered.has(n.id)).length,
    [book.nodes, mastered]
  );

  const refLinkValue = useMemo(
    () => ({
      bookId,
      currentNodeId: selectedNodeId,
      activeLangs,
      onJumpNode: (id: string) => navigateTo(bookId, id),
    }),
    [bookId, selectedNodeId, activeLangs, navigateTo]
  );

  return (
    <RefLinkContext.Provider value={refLinkValue}>
    <div className="app-shell">
      <div className="grain-overlay" />

      {/* Top Navigation Bar */}
      <header className="top-bar">
        <div className="brand-group">
          {/* Back / Forward Navigation History Buttons */}
          <div className="nav-history-group" title="Back / Forward (Mouse Side Buttons supported)">
            <button
              className="nav-hist-btn"
              onClick={goBack}
              disabled={histIdx <= 0}
              title="Back (Mouse Side Button 4)"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className="nav-hist-btn"
              onClick={goForward}
              disabled={histIdx >= history.length - 1}
              title="Forward (Mouse Side Button 5)"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Book Switcher Tabs */}
          <div className="book-tabs">
            {(['ladr', 'matrix-analysis'] as BookId[]).map((id) => (
              <button
                key={id}
                className={`book-tab ${bookId === id ? 'active' : ''}`}
                onClick={() => {
                  if (id !== bookId) navigateTo(id, null);
                }}
              >
                {id === 'ladr' ? 'LADR 4e' : 'Matrix Analysis'}
              </button>
            ))}
          </div>

          <span className="brand-sub">
            {book.title} · {book.author}
          </span>
        </div>

        <div className="toolbar-controls">
          {/* Granularity Toggle: Core vs Full (Clean English UI Chrome) */}
          <div className="seg-group" title="Switch between global skeleton and comprehensive graph">
            <button
              className={`seg-btn ${tier === 'core' ? 'active' : ''}`}
              onClick={() => setTier('core')}
            >
              <Layers size={11} />
              Core
              <span className="count-pill">{book.coreCount}</span>
            </button>
            <button
              className={`seg-btn ${tier === 'detailed' ? 'active' : ''}`}
              onClick={() => setTier('detailed')}
            >
              <GitBranch size={11} />
              Full
              <span className="count-pill">{book.totalCount}</span>
            </button>
          </div>

          {/* Non-Mutually-Exclusive Trilingual Switches + Japanese Furigana Toggle */}
          <div
            className="seg-group"
            title="Toggle any combination of EN / 中文 / 日本語 simultaneously"
          >
            <button
              className={`seg-btn ${langs.en ? 'lang-active' : ''}`}
              onClick={() => toggleLang('en')}
            >
              EN
            </button>
            <button
              className={`seg-btn ${langs.zh ? 'lang-active' : ''}`}
              onClick={() => toggleLang('zh')}
            >
              中
            </button>
            <button
              className={`seg-btn ${langs.ja ? 'lang-active' : ''}`}
              onClick={() => toggleLang('ja')}
            >
              日
            </button>
            {langs.ja && (
              <button
                className={`seg-btn ${showFurigana ? 'lang-active' : ''}`}
                onClick={() => setShowFurigana((f) => !f)}
                title="Toggle Japanese Furigana (ふりがな)"
                style={{ fontSize: 9.5, letterSpacing: '0.04em' }}
              >
                かな
              </button>
            )}
          </div>

          {/* Fuzzy Search with Instant Dropdown */}
          <div className="search-wrap">
            <Search size={12} />
            <input
              type="text"
              className="search-input"
              placeholder="Search theorems, concepts…"
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 160)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onKeyDown={(e) => {
                if (!searchHits.length) return;
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setSearchCursor((c) => (c + 1) % searchHits.length);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setSearchCursor((c) => (c - 1 + searchHits.length) % searchHits.length);
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  const hit = searchHits[searchCursor] || searchHits[0];
                  if (hit) {
                    navigateTo(hit.bookId, hit.node.id);
                    setSearchQuery('');
                    setSearchOpen(false);
                  }
                } else if (e.key === 'Escape') {
                  setSearchOpen(false);
                }
              }}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                }}
              >
                <X size={12} />
              </button>
            )}

            {searchOpen && searchQuery.trim().length > 0 && (
              <div className="search-dropdown">
                {searchHits.length === 0 ? (
                  <div className="search-empty">No matching theorems found</div>
                ) : (
                  searchHits.map((hit, idx) => (
                    <button
                      key={`${hit.bookId}-${hit.node.id}`}
                      className={`search-hit ${idx === searchCursor ? 'active' : ''}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        navigateTo(hit.bookId, hit.node.id);
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                    >
                      <div className="search-hit-meta">
                        <span className="search-hit-book">
                          {BOOKS[hit.bookId].code} · {hit.node.ref}
                        </span>
                        <span>Ch.{hit.node.chapter}</span>
                      </div>
                      <div className="search-hit-title stacked-lang">
                        {activeLangs.map((l, lIdx) => (
                          <span
                            key={l}
                            className={`stacked-lang-line ${lIdx === 0 ? 'primary' : 'secondary'}`}
                          >
                            <RichMathText
                              text={hit.node.title[l]}
                              isJa={l === 'ja'}
                              furigana={showFurigana}
                            />
                          </span>
                        ))}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Secondary Bar: Chapter Filter Strip & Classic Proof Paths */}
      <div className="sub-bar">
        <div className="chapter-strip">
          <button
            className={`ch-pill ${selectedChapter === null ? 'active' : ''}`}
            onClick={() => setSelectedChapter(null)}
          >
            ALL ({book.chapters.length})
          </button>
          {book.chapters.map((ch) => (
            <button
              key={ch.id}
              className={`ch-pill ${selectedChapter === ch.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedPathId('');
                setSelectedNodeId(null);
                setSelectedChapter((prev) => (prev === ch.id ? null : ch.id));
              }}
            >
              <span className="ch-dot" style={{ background: ch.color }} />
              {primaryLang === 'ja' ? (
                <JaText text={ch.shortTitle.ja} furigana={showFurigana} />
              ) : (
                ch.shortTitle[primaryLang]
              )}
            </button>
          ))}
        </div>

        <div className="path-strip">
          <span className="path-label">Proof Arc</span>
          <select
            className="path-select"
            value={selectedPathId}
            onChange={(e) => {
              setSelectedNodeId(null);
              setSelectedChapter(null);
              setSelectedPathId(e.target.value);
            }}
          >
            <option value="">All Dependencies</option>
            {book.paths.map((p) => (
              <option key={p.id} value={p.id}>
                {joinLang(p.title, activeLangs)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Graph Workspace */}
      <main className="graph-workspace">
        <div className="vignette-overlay" />

        {activePath && (
          <div
            className="path-banner"
            style={{ borderLeftColor: activePath.accent }}
          >
            <div className="path-banner-head">
              <span
                className="path-banner-kicker"
                style={{ color: activePath.accent }}
              >
                {joinLang(activePath.title, activeLangs)}
              </span>
              <button
                className="path-banner-close"
                onClick={() => setSelectedPathId('')}
              >
                <X size={13} />
              </button>
            </div>
            <div className="path-banner-desc">
              {activeLangs.map((l) => (
                <p key={l} style={{ marginBottom: activeLangs.length > 1 ? 4 : 0 }}>
                  <RichMathText
                    text={activePath.description[l]}
                    isJa={l === 'ja'}
                    furigana={showFurigana}
                  />
                </p>
              ))}
            </div>
          </div>
        )}

        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          onPaneClick={() => {
            if (selectedNodeId) navigateTo(bookId, null);
          }}
          fitView
          fitViewOptions={{ padding: 0.14 }}
          minZoom={0.18}
          maxZoom={1.75}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={26}
            size={1}
            color="rgba(239, 236, 228, 0.085)"
          />
          <Controls position="bottom-left" style={{ bottom: 52, left: 18 }} />
          {!selectedNode && (
            <MiniMap
              position="bottom-right"
              pannable
              zoomable
              nodeColor={(n) => {
                const kn = book.nodeMap[n.id];
                return kn ? book.chapterMap[kn.chapter].color : '#9F9B92';
              }}
              nodeStrokeWidth={2}
              maskColor="rgba(11, 11, 13, 0.55)"
              maskStrokeColor="rgba(200, 131, 107, 0.65)"
              maskStrokeWidth={1.5}
              style={{
                right: 18,
                bottom: 16,
                width: 196,
                height: 110,
              }}
            />
          )}
        </ReactFlow>

        {/* Bottom Legend */}
        <div className="graph-legend">
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: '#EFECE4' }} />
            Prerequisites
          </span>
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: 'var(--accent)' }} />
            Consequences
          </span>
          <span className="legend-item">✦ Interactive</span>
          <span className="legend-item" style={{ color: '#76A695' }}>
            ⛓ Bridge
          </span>
          <span className="legend-item">
            Mastered: {masteredInBook}/{book.totalCount}
          </span>
          <button
            type="button"
            className="legend-info-btn"
            onClick={() => setShowAbout((v) => !v)}
            title="References & Attribution"
          >
            <Info size={11} />
          </button>
        </div>

        {showAbout && (
          <div className="about-popover">
            <div className="about-pop-head">
              <span>References & Attribution</span>
              <button
                type="button"
                className="path-banner-close"
                onClick={() => setShowAbout(false)}
              >
                <X size={12} />
              </button>
            </div>
            <p className="about-pop-text">
              Original interactive study notes & geometric labs. Structure and
              theorem numbering inspired by{' '}
              <a
                href="https://linear.axler.net"
                target="_blank"
                rel="noreferrer"
              >
                Linear Algebra Done Right (4e)
              </a>{' '}
              by Sheldon Axler (CC BY-NC 4.0) and{' '}
              <em>Lecture Notes on Matrix Analysis</em> by Mark W. Meckes.
            </p>
            <div className="about-pop-foot">
              <a href="https://declspec.cloud" target="_blank" rel="noreferrer">
                ← declspec.cloud
              </a>
              <span>Non-commercial educational use</span>
            </div>
          </div>
        )}

        {/* Ephemeral Floating Neighborhood HUD when zoomed in on a node */}
        {selectedNode && isZoomedIn && (
          <FocusNeighborhoodHUD
            bookId={bookId}
            node={selectedNode}
            activeEdges={kEdges}
            activeLangs={activeLangs}
            showFurigana={showFurigana}
            onSelectNode={(id) => navigateTo(bookId, id)}
          />
        )}

        {/* Slide-over Detail Drawer */}
        {selectedNode && (
          <DetailDrawer
            bookId={bookId}
            node={selectedNode}
            activeLangs={activeLangs}
            showFurigana={showFurigana}
            activeEdges={kEdges}
            isMastered={mastered.has(selectedNode.id)}
            onToggleMastered={toggleMastered}
            onSelectNode={(id) => navigateTo(bookId, id)}
            onJumpCrossBook={(targetBook, targetNodeId) =>
              navigateTo(targetBook, targetNodeId)
            }
            onZoomOverview={zoomToOverview}
            onClose={() => navigateTo(bookId, null)}
          />
        )}
      </main>
    </div>
    </RefLinkContext.Provider>
  );
};

export const App: React.FC = () => (
  <ReactFlowProvider>
    <AtlasCanvas />
  </ReactFlowProvider>
);

export default App;
