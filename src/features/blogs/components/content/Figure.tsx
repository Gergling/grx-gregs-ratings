import { SanityImageSource } from '@sanity/asset-utils';
import { useMemo } from 'react';
import { useBlog } from '../../hooks';
import { Typography, useTheme } from '@gergling/ui-components';

export const BlogRendererFigure = ({ value }: { value: SanityImageSource }) => {
  const { getBlogImageData } = useBlog();
  const { caption, src, width, height } = useMemo(() => getBlogImageData(value), [getBlogImageData, value]);
  const { theme: { typography } } = useTheme();

  return (
    <div>
      <img
        src={src}
        loading="lazy"
        style={{
          aspectRatio: width / height,
        }}
      />
      <Typography variant='caption' sx={{
        fontFamily: typography.body1.fontFamily,
        margin: 'auto',
        display: 'block',
        textAlign: 'center',
      }}>{caption}</Typography>
    </div>
  )
}