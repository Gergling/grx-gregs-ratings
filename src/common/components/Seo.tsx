import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, URL_ROOT } from '../constants';
import { SeoProps } from '../types';
import smilingManPointLeftImage from "../../assets/images/smiling-man-pointing-left.jpg";

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  siteName = SITE_NAME,
  url: urlProp,
  image = smilingManPointLeftImage,
  twitterHandle,
}) => {
  const { pathname } = useLocation();

  const canonicalUrl = useMemo(
    () => urlProp || new URL(pathname, URL_ROOT).href,
    [pathname, urlProp]
  );

  return (
    <>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};
