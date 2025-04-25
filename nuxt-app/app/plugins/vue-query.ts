import type {
  DehydratedState,
  VueQueryPluginOptions,
} from '@tanstack/vue-query';
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from '@tanstack/vue-query';
import { FetchError } from 'ofetch';

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');
  const toast = useToast();

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5000 },
      mutations: {
        onError(error, _variables, _context) {
          if (error instanceof FetchError && 'message' in error.data) {
            toast.add({
              title: `Error: ${error.statusText}`,
              description: error.data.message,
              color: 'error',
              duration: 4000,
            });
          }
          else {
            toast.add({
              title: 'Error',
              description: error.message,
              color: 'error',
              duration: 4000,
            });
          }
        },
      },
    },
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
