import urlBuilder from '@sanity/image-url';
import { useCallback, useEffect, useRef } from "react";
import { useBlogContext } from "../context";
import { client } from "../../../libs/sanity";
import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils';
import { useElementSize } from '../../../common/hooks/use-element-dimension';

export const useBlog = () => {
  const { width: blogElementWidth } = useBlogContext();
  const getBlogImageData = useCallback((value: SanityImageSource) => {
    const src = urlBuilder(client).image(value).width(blogElementWidth).fit('max').auto('format').url();
    const { width, height } = getImageDimensions(value);
    const hasCaption = typeof value !== 'string' && 'caption' in value;
    return { src, width, height, caption: (hasCaption ? value.caption : '') as string };
  }, [blogElementWidth]);
  const blogContainerRef = useRef(null);
  const imgWidth = useElementSize(blogContainerRef, (element) => element.offsetWidth);
  const { setWidth } = useBlogContext();

  useEffect(() => {
    setWidth(imgWidth);
  }, [imgWidth, setWidth]);

  return {
    blogContainerRef,
    getBlogImageData,
  };
};
