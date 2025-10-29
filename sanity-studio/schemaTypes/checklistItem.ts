import { defineType } from "sanity";

export default defineType({
  name: 'checklistItem',
  title: 'Checklist Item',
  type: 'object',
  fields: [
    {
      name: 'task',
      title: 'Task Description',
      type: 'string',
      description: 'The item to be completed (e.g., "Add meta description").',
      validation: Rule => Rule.required(),
    },
    {
      name: 'isComplete',
      title: 'Completed',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      task: 'task',
      isComplete: 'isComplete',
    },
    prepare({ task, isComplete }) {
      const icon = isComplete ? '✅' : '⏳'; // Use emojis for visual cue
      return {
        title: `${icon} ${task}`,
        subtitle: isComplete ? 'Complete' : 'Pending',
      };
    },
  },
});
