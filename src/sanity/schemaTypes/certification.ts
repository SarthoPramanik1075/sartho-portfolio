import { BadgeCheck } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  icon: BadgeCheck,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'issuingOrganization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({ name: 'issueDate', type: 'date' }),
    defineField({ name: 'expiryDate', type: 'date' }),
    defineField({ name: 'credentialId', type: 'string' }),
    defineField({ name: 'credentialUrl', type: 'url' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'issuingOrganization', media: 'logo' },
  },
})
