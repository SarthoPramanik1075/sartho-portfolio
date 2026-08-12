import { Trophy } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  icon: Trophy,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'issuer',
      title: 'Issuer / Event',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'date', type: 'date', validation: (rule) => rule.required() }),
    defineField({
      name: 'placement',
      type: 'string',
      description: 'e.g. "1st Place", "Finalist", "Winner"',
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'eventUrl', type: 'url' }),
    defineField({ name: 'teamSize', type: 'number' }),
    defineField({ name: 'relatedProject', type: 'reference', to: [{ type: 'project' }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'issuer' },
  },
})
