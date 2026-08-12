import { CircuitBoard } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill / Technology',
  type: 'document',
  icon: CircuitBoard,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'image',
      description: 'Optional logo/icon shown next to this skill',
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['Language', 'Framework', 'Tool', 'Soft Skill', 'Research Method'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'icon' },
  },
})
