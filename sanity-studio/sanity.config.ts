import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { resolveDocumentActions } from './utilities/resolve-document-actions'
import { postWorkflowStructure } from './utilities/post-workflow-structure'

export default defineConfig({
  name: 'default',
  title: 'GRX',

  projectId: 'd8f0naws',
  dataset: 'production',

  plugins: [
    structureTool({
      // Set the custom structure here
      structure: postWorkflowStructure, 
    }),
    visionTool()
  ],

  document: {
    actions: resolveDocumentActions,
  },

  schema: {
    types: schemaTypes,
  },
})
