export type UpcomingBlog = {
  title: string;
  slug: string;
  hasBody: boolean;
  hasImage: boolean;
  onClick: () => unknown;
};

export type BlogProgressReport = {
  ideas: string;
  lastPublished: string;
  nextProjectedPublishDate: string;
  upcoming: UpcomingBlog;
};
