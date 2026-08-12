import { UserRound } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserRound,
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      description: 'e.g. "CS Student · Researcher · Software Engineer"',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'shortBio',
      type: 'text',
      rows: 3,
      description: 'Used as fallback meta description on /about',
    }),
    defineField({ name: 'profilePhoto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'resumeFile', type: 'file', description: 'Downloadable PDF resume' }),
    defineField({
      name: 'personaHighlights',
      type: 'array',
      description: 'Short blurbs tailored per audience, e.g. "For Recruiters"',
      of: [
        {
          type: 'object',
          name: 'personaHighlight',
          fields: [
            { name: 'audience', type: 'string', title: 'Audience label' },
            { name: 'blurb', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'audience', subtitle: 'blurb' } },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            { name: 'platform', type: 'string' },
            { name: 'url', type: 'url' },
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'availabilityStatus',
      type: 'string',
      description: 'e.g. "Open to opportunities"',
    }),
  ],
})
