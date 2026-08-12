import { GraduationCap } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const research = defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  icon: GraduationCap,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'abstract', type: 'text', rows: 4 }),
    defineField({ name: 'publicationVenue', type: 'string' }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: ['Published', 'Under Review', 'In Progress', 'Preprint'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Author names in publication order',
    }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'doiOrLink', type: 'url' }),
    defineField({ name: 'pdf', type: 'file' }),
    defineField({
      name: 'researchInterests',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'relatedProject', type: 'reference', to: [{ type: 'project' }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
