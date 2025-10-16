import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { resolveDocumentActions } from './utilities/resolve-document-actions'

export default defineConfig({
  name: 'default',
  title: 'GRX',

  projectId: 'd8f0naws',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  document: {
    actions: resolveDocumentActions,
  },

  schema: {
    types: schemaTypes,
  },
})
