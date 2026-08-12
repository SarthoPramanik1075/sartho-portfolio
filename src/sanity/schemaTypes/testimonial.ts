import { Quote } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: Quote,
  fields: [
    defineField({ name: 'quote', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'authorName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'authorRole', type: 'string' }),
    defineField({ name: 'authorOrg', type: 'string' }),
    defineField({ name: 'authorPhoto', type: 'image' }),
    defineField({ name: 'linkedInUrl', type: 'url' }),
    defineField({ name: 'relatedProject', type: 'reference', to: [{ type: 'project' }] }),
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'authorOrg', media: 'authorPhoto' },
  },
})
