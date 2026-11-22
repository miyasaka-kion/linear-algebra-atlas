import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTexProps {
  tex: string;
  display?: boolean;
  className?: string;
}

export const MathTex: React.FC<MathTexProps> = ({
  tex,
  display = false,
  className,
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return tex;
    }
  }, [tex, display]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
