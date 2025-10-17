import { defineQuery } from 'groq';
import { sanityClientFetch } from '../../libs/sanity/utilities';

const baseArticleFields = `
  title,
  "slug": slug.current,
  "image": mainImage.asset->url,
  categories[]->{description, title},
  publishedAt,
`;

const featuredArticlesQuery = defineQuery(`
  *[_type == "post"]
  | order(publishedAt desc)
  [0...3]
  {
    ${baseArticleFields}
  }
`);

export const fetchFeaturedArticles = () =>
  sanityClientFetch(featuredArticlesQuery);

const singleArticleBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug]
  | order(publishedAt desc)
  [0]
  {
    ${baseArticleFields}
    body
  }
`);

export const fetchSingleArticleBySlug = (slug: string) =>
  sanityClientFetch(singleArticleBySlugQuery, { slug });

const listArticlesQuery = defineQuery(`
  *[_type == "post"]
  | order(publishedAt desc)
  {
    ${baseArticleFields}
  }
`);

export const fetchListArticles = () =>
  sanityClientFetch(listArticlesQuery);

const articleProgressStatusQuery = defineQuery(`
  {
    "ideaCount": count(*[_type == "post" && status == "idea"]),
    "upcomingList": *[
      _type == "post" &&
      status == "upcoming"
    ] | order(_createdAt asc) {
      title,
      "url": slug.current,
    },
    "readyList": *[
      _type == "post" &&
      status == "ready" &&
      string::startsWith(_id, "drafts.")
    ] | order(publishedAt desc) {
      title,
      "url": slug.current
    },
    "latestPublishedList": *[
      _type == "post" &&
      status == "ready" &&
      !string::startsWith(_id, "drafts.")
    ] | order(publishedAt desc)[0...3] {
      title,
      "url": slug.current
    }
  }
`);

export const fetchArticleProgressStatus = () =>
  sanityClientFetch(articleProgressStatusQuery);
