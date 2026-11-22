# Linear Algebra Atlas

Interactive knowledge-dependency graph and geometric intuition labs covering:

- **Linear Algebra Done Right (4th ed.)** — Sheldon Axler (structure & chapter references inspired by the Open Access [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) edition at [linear.axler.net](https://linear.axler.net))
- **Lecture Notes on Matrix Analysis (2019)** — Mark W. Meckes

## Features

- Dual-granularity graph (**Core** skeleton with automatic transitive bridge edges vs **Full** comprehensive view)
- Cross-book bidirectional bridges linking foundational theorems in LADR 4e to analytic advancements in Matrix Analysis
- Non-mutually-exclusive **EN / 中文 / 日本語** switches with optional Japanese Furigana (`かな`)
- 9 interactive Canvas geometric visualizers (Linear Maps, Eigenvalues, Inner Product & Gram–Schmidt, 3-stage SVD & Spectral, Determinant Area, $\ell_p$ / Dual Norm Balls & Sparse Recovery, Condition Number, Markov Chains & Perron–Frobenius, Spectral Graph Laplacian & Fiedler Vector)
- Custom 2×2 matrix input & random matrix generator
- Plain-language **Explain Simply** deep intuition guides for all 102 topics
- Fuzzy search across both books, inline theorem cross-references with hover previews, and browser Back/Forward (mouse side button) history

## Development & Cloudflare Pages Deployment

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build to dist/
```

**Cloudflare Pages Settings:**
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Custom domain: `linalg.declspec.cloud`
