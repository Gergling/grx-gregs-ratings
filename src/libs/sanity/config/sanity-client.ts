import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'd8f0naws',
  dataset: 'production',
  // useCdn: true, // `false` if you want to fetch draft content
  // apiVersion: '2023-01-01', // Use a dated API version
});
