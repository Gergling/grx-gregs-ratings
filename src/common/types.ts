export interface SeoProps {
  title: string;
  description: string;
  siteName?: string;
  url?: string;
  image?: string;
  twitterHandle?: string;
}

export type Seeder = () => number;
