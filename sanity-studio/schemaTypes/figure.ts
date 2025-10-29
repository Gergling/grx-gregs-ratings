import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'figure',
  title: 'Figure',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'A brief, descriptive summary of the image content for visually impaired users. Keep it short and accurate.',
      validation: Rule => Rule.required(), 
    }),
    defineField({
      name: 'caption',
      title: 'Caption Text',
      type: 'string',
      description: 'A hilarious take on the image.',
    }),
  ],
})
