import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'accordion',
  title: 'Interactive Toggle Block',
  type: 'object',
  icon: () => 'A', // Icon for Accordion

  fields: [
    defineField({
      name: 'headerText',
      title: 'Visible Toggle Header Text',
      type: 'string',
      description: 'The text that encourages the user to click and open the hidden content (e.g., "Take a quick poll," or "What did you think?").',
      validation: rule => rule.required().max(100),
    }),
    
    // IMPORTANT: This field holds the 'Microform' that will be the "surprise" content.
    defineField({
      name: 'hiddenContent',
      title: 'Hidden Content (The Surprise)',
      type: 'blockContent', // Reference your existing microform schema here
      description: 'The content block that is hidden until the user clicks the header.',
      validation: rule => rule.required(),
    }),
    
    defineField({
      name: 'initialState',
      title: 'Initial State',
      type: 'string',
      options: {
        list: [
          { title: 'Closed (Recommended for surprise)', value: 'closed' },
          { title: 'Open', value: 'open' },
        ],
        layout: 'radio',
      },
      initialValue: 'closed',
    }),
  ],

  preview: {
    select: {
      header: 'headerText',
      content: 'hiddenContent.formType',
      state: 'initialState',
    },
    prepare(selection) {
      const { header, content, state } = selection;
      return {
        title: `TOGGLE BLOCK: ${header}`,
        subtitle: `Hides: ${content || 'Not Selected'} (Initial State: ${state})`,
      };
    },
  },
});
