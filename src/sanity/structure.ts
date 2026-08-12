import { Settings, UserRound } from 'lucide-react'
import type { StructureResolver } from 'sanity/structure'

import { singletonTypes } from './schemaTypes'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About')
        .icon(UserRound)
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Site Settings')
        .icon(Settings)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !singletonTypes.has(item.getId()!)
      ),
    ])
