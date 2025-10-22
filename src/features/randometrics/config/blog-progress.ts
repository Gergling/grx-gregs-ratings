export const BLOG_PROGRESS_METRICS = {
  blogIdeas: {
    priority: 1,
    label: 'Blog Ideas',
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
      },
    ],
  },
  blogPublishProjected: {
    priority: 1,
    label: 'Next Projected Publishing Date',
    configs: [
      {
        grow: { value: 0 },
        size: { height: 4 },
      },
    ],
  },
  blogPublishedLast: {
    priority: 1,
    label: 'Last Blog Published',
    configs: [
      {
        size: { width: 2 },
      }
    ],
  },
  blogUpcoming: {
    priority: 1,
    label: 'Upcoming Blog Title',
    configs: [
      {
        size: { width: 5 },
      }
    ]
  },
};
