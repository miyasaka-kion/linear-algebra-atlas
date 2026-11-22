import { BookId, KnowledgeNode } from '../data/types';
import { BOOKS } from '../data/knowledgeGraph';

export interface SearchHit {
  bookId: BookId;
  node: KnowledgeNode;
  score: number;
}

// Lightweight Levenshtein distance capped at maxDist for fast typo tolerance
function levenshtein(a: string, b: string, maxDist = 2): number {
  if (Math.abs(a.length - b.length) > maxDist) return maxDist + 1;
  const m = a.length;
  const n = b.length;
  let prev = new Array<number>(n + 1);
  let curr = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > maxDist) return maxDist + 1;
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

// Check ordered subsequence match (e.g. "svd" in "singular value decomposition", "gs" in "gram-schmidt")
function isSubsequence(needle: string, haystack: string): boolean {
  if (needle.length < 2 || needle.length > 16) return false;
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j++) {
    if (haystack[j] === needle[i]) i++;
  }
  return i === needle.length;
}

// Normalize text for forgiving search (lowercase, strip diacritics & punctuation)
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[–—−\-_·.,:;()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreTokenAgainstText(token: string, titleStr: string, bodyStr: string): number {
  if (!token) return 0;
  // 1. Direct substring in title
  if (titleStr.includes(token)) return 100;
  // 2. Direct substring in statement / intuition / formula
  if (bodyStr.includes(token)) return 45;

  // 3. Word-level prefix / typo tolerance against title words
  const titleWords = titleStr.split(' ').filter((w) => w.length >= 2);
  if (token.length >= 3) {
    const maxDist = token.length >= 6 ? 2 : 1;
    for (const w of titleWords) {
      if (w.startsWith(token)) return 80;
      if (levenshtein(token, w, maxDist) <= maxDist) return 65;
      if (w.length > token.length && levenshtein(token, w.slice(0, token.length), 1) <= 1) {
        return 55;
      }
    }
  }

  // 4. Acronym / initialism match (e.g. "gs" -> "gram schmidt", "cf" -> "courant fischer")
  if (token.length >= 2 && token.length <= 6 && /^[a-z0-9]+$/.test(token)) {
    const initials = titleWords.map((w) => w[0]).join('');
    if (initials.includes(token)) return 75;
    if (isSubsequence(token, titleStr.replace(/\s+/g, ''))) return 32;
  }

  // 5. Typo tolerance against body words for longer queries
  if (token.length >= 4) {
    const bodyWords = bodyStr.split(' ');
    for (const w of bodyWords) {
      if (w.length >= 4 && Math.abs(w.length - token.length) <= 1) {
        if (levenshtein(token, w, 1) <= 1) return 28;
      }
    }
  }

  return 0;
}

export function fuzzySearchAllBooks(
  rawQuery: string,
  currentBook: BookId,
  limit = 14
): SearchHit[] {
  const q = norm(rawQuery);
  if (!q) return [];
  const tokens = q.split(' ').filter(Boolean);

  const hits: SearchHit[] = [];

  for (const bId of ['ladr', 'matrix-analysis'] as BookId[]) {
    const book = BOOKS[bId];
    for (const node of book.nodes) {
      const titleStr = norm(
        `${node.ref} ${node.section} ${node.title.en} ${node.title.zh} ${node.title.ja}`
      );
      const bodyStr = norm(
        `${node.statement.en} ${node.statement.zh} ${node.statement.ja} ${node.intuition.en} ${node.intuition.zh} ${node.intuition.ja} ${node.formula}`
      );

      let total = 0;
      let matchedTokens = 0;

      for (const tok of tokens) {
        const s = scoreTokenAgainstText(tok, titleStr, bodyStr);
        if (s > 0) {
          total += s;
          matchedTokens++;
        }
      }

      // Require all tokens to match if <=2 tokens, or at least half for longer queries
      const minRequired = tokens.length <= 2 ? tokens.length : Math.ceil(tokens.length * 0.6);
      if (matchedTokens >= minRequired && total > 0) {
        // Small boost for current book & milestones
        if (bId === currentBook) total += 12;
        if (node.kind === 'milestone') total += 6;
        if (node.ref.toLowerCase().includes(rawQuery.trim().toLowerCase())) total += 120;
        hits.push({ bookId: bId, node, score: total });
      }
    }
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}
