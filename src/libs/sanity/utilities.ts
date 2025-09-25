import { SanityQueries } from "@sanity/client";
import { client } from "./config";
import { QueryParams } from "sanity";

export const sanityClientFetch = <
  SanityQuery extends keyof SanityQueries,
  SanityQueryProps = SanityQueries[SanityQuery]
>(
  query: SanityQuery,
  params?: QueryParams
) => {
  if (params) {
    return client.fetch<SanityQueryProps>(query, params);
  }

  return client.fetch<SanityQueryProps>(query);
};

