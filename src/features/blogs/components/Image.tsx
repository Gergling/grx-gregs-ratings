import { SanityImageSource } from '@sanity/asset-utils';
import { useMemo } from 'react';
import { useBlog } from '../hooks';

export const BlogImage = ({ value }: { value: SanityImageSource }) => {
  const { getBlogImageData } = useBlog();
  const { src, width, height } = useMemo(() => getBlogImageData(value), [getBlogImageData, value]);

  return (
    <img
      src={src}
      loading="lazy"
      style={{
        aspectRatio: width / height,
      }}
    />
  )
}