import { type SchemaTypeDefinition } from 'sanity'

import { about } from './about'
import { achievement } from './achievement'
import { certification } from './certification'
import { experience } from './experience'
import { project } from './project'
import { research } from './research'
import { siteSettings } from './siteSettings'
import { skill } from './skill'
import { testimonial } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    about,
    siteSettings,
    // Documents
    project,
    experience,
    research,
    certification,
    achievement,
    skill,
    testimonial,
  ],
}

export const singletonTypes = new Set(['about', 'siteSettings'])
