import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default createConfigForNuxt({
  features: {
    stylistic: {
      semi: true,
    },
  },
}).append(pluginQuery.configs['flat/recommended']);
