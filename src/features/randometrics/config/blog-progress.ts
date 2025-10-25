export const BLOG_PROGRESS_METRICS = {
  blogIdeas: {
    priority: 1,
    label: 'Blog Ideas',
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
      },
      {
        size: { width: 1, height: 1 },
      },
    ],
  },
  blogPublishProjected: {
    priority: 1,
    label: 'Next Projected Publishing Date',
    configs: [
      {
        grow: { value: 0 },
        size: { width: 2, height: 1 },
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
        textMaskFaded: true,
        size: { width: 5 },
      },
      {
        textMaskFaded: true,
        size: { width: 6 },
      },
    ]
  },
};
