import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'd8f0naws',
  dataset: 'production',
  perspective: 'raw',
  useCdn: true, // `false` if you want to fetch draft content
  apiVersion: 'v2025-10-18',
});
