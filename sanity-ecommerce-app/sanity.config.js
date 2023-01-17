import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas/schema'

export default defineConfig({
  name: 'default',
  title: 'sanity-ecommerce-app',

  projectId: 'htdpd5xo',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes
  },
})
