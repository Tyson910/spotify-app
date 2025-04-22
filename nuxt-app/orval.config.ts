import { defineConfig } from 'orval';

export default defineConfig({
  'spotify-vue-query': {
    input: {
      // TODO: fetch & download yaml from https://github.com/sonallux/spotify-web-api/blob/main/fixed-spotify-open-api.yml
      target: './fixed-spotify-open-api.yaml',
    },
    output: {
      client: 'vue-query',
      httpClient: 'fetch',
      workspace: 'generated/',
      target: './endpoints',
      schemas: './models',
      mode: 'tags-split',
      indexFiles: false,
      clean: true,
      mock: {
        type: 'msw',
        delay: 100,
        useExamples: true,
        generateEachHttpStatus: true,
      },
    },
  },
  'spotify-zod': {
    input: {
      // TODO: fetch & download yaml from https://github.com/sonallux/spotify-web-api/blob/main/fixed-spotify-open-api.yml
      target: './fixed-spotify-open-api.yaml',
    },
    output: {
      client: 'zod',
      workspace: 'generated/',
      target: './endpoints',
      fileExtension: '.zod.ts',
      mode: 'tags-split',
      indexFiles: false,
    },
  },
});
