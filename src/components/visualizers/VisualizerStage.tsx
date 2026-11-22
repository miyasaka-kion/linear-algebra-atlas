import React from 'react';
import { Lang, VizConfig } from '../../data/types';
import { LinearMapViz } from './LinearMapViz';
import { EigenViz } from './EigenViz';
import { InnerProductViz } from './InnerProductViz';
import { SpectralSvdViz } from './SpectralSvdViz';
import { DeterminantViz } from './DeterminantViz';
import { NormBallViz } from './NormBallViz';
import { ConditionNumberViz } from './ConditionNumberViz';
import { MarkovPerronViz } from './MarkovPerronViz';
import { SpectralGraphViz } from './SpectralGraphViz';
import { RichMathText } from '../RichMathText';

interface VisualizerStageProps {
  viz: VizConfig;
  activeLangs: Lang[];
  showFurigana: boolean;
}

export const VisualizerStage: React.FC<VisualizerStageProps> = ({
  viz,
  activeLangs,
  showFurigana,
}) => {
  return (
    <div className="viz-panel">
      {viz.type === 'linear-map' && <LinearMapViz preset={viz.preset} />}
      {viz.type === 'eigen' && <EigenViz preset={viz.preset} />}
      {viz.type === 'inner-product' && <InnerProductViz preset={viz.preset} />}
      {viz.type === 'spectral-svd' && <SpectralSvdViz preset={viz.preset} />}
      {viz.type === 'determinant' && <DeterminantViz preset={viz.preset} />}
      {viz.type === 'norm-ball' && <NormBallViz preset={viz.preset} />}
      {viz.type === 'condition-number' && <ConditionNumberViz preset={viz.preset} />}
      {viz.type === 'markov-perron' && <MarkovPerronViz preset={viz.preset} />}
      {viz.type === 'spectral-graph' && <SpectralGraphViz preset={viz.preset} />}

      <div className="viz-caption">
        {activeLangs.map((lang) => (
          <div key={lang} style={{ marginBottom: activeLangs.length > 1 ? 4 : 0 }}>
            {activeLangs.length > 1 && (
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 9,
                  color: 'var(--dim)',
                  marginRight: 6,
                  textTransform: 'uppercase',
                }}
              >
                {lang}
              </span>
            )}
            <RichMathText
              text={viz.caption[lang]}
              isJa={lang === 'ja'}
              furigana={showFurigana}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
