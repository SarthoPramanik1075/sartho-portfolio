import { FolderGit2 } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import { PROJECT_CATEGORIES, PROJECT_STATUSES } from '@/lib/project-constants'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FolderGit2,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on project cards',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'role',
      type: 'string',
      description: 'e.g. "Solo Developer", "Team Lead", "Contractor"',
    }),
    defineField({
      name: 'category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [...PROJECT_CATEGORIES],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'status',
      type: 'string',
      description: 'Current state of the project',
      options: {
        list: [...PROJECT_STATUSES],
        layout: 'radio',
      },
      initialValue: 'Completed',
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
    }),
    defineField({
      name: 'outcomes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Won 1st place among 300 teams"',
    }),
    defineField({
      name: 'links',
      type: 'object',
      fields: [
        { name: 'live', type: 'url', title: 'Live URL' },
        { name: 'repo', type: 'url', title: 'Repository' },
        { name: 'demo', type: 'url', title: 'Demo Video' },
        { name: 'press', type: 'url', title: 'Press Mention' },
      ],
    }),
    defineField({ name: 'startDate', type: 'date' }),
    defineField({ name: 'endDate', type: 'date' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers sort first',
    }),
    defineField({ name: 'relatedExperience', type: 'reference', to: [{ type: 'experience' }] }),
    defineField({ name: 'relatedResearch', type: 'reference', to: [{ type: 'research' }] }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Start date, newest first',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'role', media: 'coverImage' },
  },
})
