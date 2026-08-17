import { Settings } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({ name: 'siteTitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'defaultSeoDescription', type: 'text', rows: 3 }),
    defineField({ name: 'defaultOgImage', type: 'image' }),
    defineField({ name: 'favicon', type: 'image' }),
    defineField({ name: 'contactEmail', type: 'string' }),
    defineField({ name: 'contactPhone', type: 'string', description: 'Optional. Shown on the Contact page if set.' }),
    defineField({
      name: 'navLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navLink',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({ name: 'footerText', type: 'string' }),
    defineField({ name: 'googleSiteVerification', type: 'string' }),
  ],
})
