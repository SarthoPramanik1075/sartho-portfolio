import { Briefcase } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'role', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'employmentType',
      type: 'string',
      options: {
        list: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      },
    }),
    defineField({ name: 'startDate', type: 'date', validation: (rule) => rule.required() }),
    defineField({
      name: 'endDate',
      type: 'date',
      description: 'Leave empty if this is your current role',
    }),
    defineField({ name: 'summary', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'relatedProjects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'skillsUsed',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
    }),
  ],
  preview: {
    select: { title: 'role', subtitle: 'organization', media: 'logo' },
  },
})
