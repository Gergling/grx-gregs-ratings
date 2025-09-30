import { BlogSummaryProps } from "@gergling/ui-components";

export type BlogListItem = Omit<BlogSummaryProps, 'onClick'> & {
  slug: string;
};