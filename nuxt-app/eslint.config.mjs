import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}).append(pluginQuery.configs['flat/recommended'])
