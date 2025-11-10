import {defineField, defineType} from 'sanity'

// 1. Define the single parent type
export default defineType({
  name: 'microform',
  title: 'Microform',
  type: 'object',
  icon: () => 'M', // Generic Microform Icon

  fields: [
    // --- 1. THE DROPDOWN CONTROLLER (REQUIRED) ---
    defineField({
      name: 'formType',
      title: 'Microform Type',
      type: 'string',
      description: 'Select the specific interactive component to embed.',
      options: {
        list: [
          { title: 'No', value: 'no' },
        ],
        layout: 'dropdown',
      },
      validation: rule => rule.required(),
    }),

    // --- 2. ARGUMENTS FOR MicroformNo AND MicroformYes (CONDITIONAL) ---
    defineField({
      name: 'label',
      title: 'Prompt Text',
      description: 'The specific question or prompt (e.g., "Ready to proceed?").',
      type: 'string',
      validation: rule => rule.required(),
      
      // CRUCIAL: Use the 'hidden' property to conditionally show this field.
      // It is shown only if formType is 'MicroformNo' OR 'MicroformYes'.
      // hidden: ({ parent }) => 
      //   !['MicroformNo', 'MicroformYes'].includes(parent.formType),
    }),
    defineField({
      name: 'completionText',
      title: 'Completion Text',
      description: 'The response on completion of the microform.',
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],

  preview: {
    select: {
      type: 'formType',
      text: 'promptText',
    },
    prepare(selection) {
      const { type, text } = selection;
      let subtitle = 'No arguments required.';
      if (text) {
        subtitle = `Prompt: ${text}`;
      }
      // const { type, text, topic } = selection;
      // let subtitle = 'No arguments required.';
      // if (text) {
      //     subtitle = `Prompt: ${text}`;
      // } else if (topic) {
      //     subtitle = `Topic: ${topic}`;
      // }

      return {
        title: `MICROFORM: ${type || 'Select a Type'}`,
        subtitle: subtitle,
      };
    },
  },
});
