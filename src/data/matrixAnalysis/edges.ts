import { KnowledgeEdge } from '../types';

export const MA_EDGES: KnowledgeEdge[] = [
  // Ch.1 -> Ch.2
  { source: 'ma-similarity', target: 'ma-svd' },
  { source: 'ma-similarity', target: 'ma-triangular-fact' },

  // Ch.2 internal
  { source: 'ma-svd', target: 'ma-moore-penrose' },
  { source: 'ma-svd', target: 'ma-spectral-polar' },
  { source: 'ma-spectral-polar', target: 'ma-triangular-fact' },
  { source: 'ma-triangular-fact', target: 'ma-simultaneous' },
  { source: 'ma-spectral-polar', target: 'ma-simultaneous' },

  // Ch.2 -> Ch.3
  { source: 'ma-spectral-polar', target: 'ma-rayleigh' },
  { source: 'ma-rayleigh', target: 'ma-courant-fischer' },
  { source: 'ma-courant-fischer', target: 'ma-weyl' },
  { source: 'ma-courant-fischer', target: 'ma-interlacing' },
  { source: 'ma-interlacing', target: 'ma-majorization' },
  { source: 'ma-majorization', target: 'ma-schur-horn' },
  { source: 'ma-courant-fischer', target: 'ma-schur-horn' },

  // Ch.2 -> Ch.4
  { source: 'ma-vec-norms', target: 'ma-dual-norms' },
  { source: 'ma-vec-norms', target: 'ma-mat-norms' },
  { source: 'ma-svd', target: 'ma-mat-norms' },
  { source: 'ma-mat-norms', target: 'ma-spectral-radius' },
  { source: 'ma-triangular-fact', target: 'ma-spectral-radius' },
  { source: 'ma-svd', target: 'ma-unitary-norms' },
  { source: 'ma-dual-norms', target: 'ma-unitary-norms' },
  { source: 'ma-mat-norms', target: 'ma-unitary-norms' },

  // Ch.4 -> Ch.5
  { source: 'ma-mat-norms', target: 'ma-cond-num' },
  { source: 'ma-svd', target: 'ma-cond-num' },
  { source: 'ma-moore-penrose', target: 'ma-cond-num' },
  { source: 'ma-dual-norms', target: 'ma-sparse-recovery' },
  { source: 'ma-vec-norms', target: 'ma-sparse-recovery' },
  { source: 'ma-cond-num', target: 'ma-sparse-recovery' },

  // Ch.2 & Ch.3 -> Ch.6
  { source: 'ma-spectral-polar', target: 'ma-psd-char' },
  { source: 'ma-rayleigh', target: 'ma-psd-char' },
  { source: 'ma-triangular-fact', target: 'ma-psd-char' },
  { source: 'ma-psd-char', target: 'ma-kronecker-hadamard' },
  { source: 'ma-interlacing', target: 'ma-kronecker-hadamard' },
  { source: 'ma-psd-char', target: 'ma-psd-ineq' },
  { source: 'ma-kronecker-hadamard', target: 'ma-psd-ineq' },

  // Ch.4 & Ch.3 -> Ch.7
  { source: 'ma-mat-norms', target: 'ma-gershgorin' },
  { source: 'ma-spectral-radius', target: 'ma-gershgorin' },
  { source: 'ma-cond-num', target: 'ma-bauer-fike' },
  { source: 'ma-weyl', target: 'ma-bauer-fike' },
  { source: 'ma-gershgorin', target: 'ma-bauer-fike' },

  // Ch.4 & Ch.7 -> Ch.8
  { source: 'ma-spectral-radius', target: 'ma-nonneg-spec' },
  { source: 'ma-gershgorin', target: 'ma-nonneg-spec' },
  { source: 'ma-nonneg-spec', target: 'ma-perron' },
  { source: 'ma-perron', target: 'ma-perron-frobenius' },
  { source: 'ma-perron-frobenius', target: 'ma-markov-chains' },
  { source: 'ma-markov-chains', target: 'ma-reversible-mixing' },
  { source: 'ma-spectral-polar', target: 'ma-reversible-mixing' },

  // Ch.3, 6, 8 -> Ch.9
  { source: 'ma-perron-frobenius', target: 'ma-adj-eigen' },
  { source: 'ma-rayleigh', target: 'ma-adj-eigen' },
  { source: 'ma-psd-char', target: 'ma-graph-laplacian' },
  { source: 'ma-adj-eigen', target: 'ma-graph-laplacian' },
  { source: 'ma-graph-laplacian', target: 'ma-fiedler' },
  { source: 'ma-courant-fischer', target: 'ma-fiedler' },
];
