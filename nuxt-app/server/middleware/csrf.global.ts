import { HTTP_SERVER_ERROR_CODES } from '~/utils/http-helpers';

export default defineEventHandler((event) => {
  if (event.method !== 'GET' && !import.meta.dev) {
    const origin = event.headers.get('Origin') ?? event.headers.get('Host');
    // You can also compare it against the Host or X-Forwarded-Host header.
    if (origin === null || origin !== useRuntimeConfig(event).site_url) {
      throw createError(HTTP_SERVER_ERROR_CODES.FORBIDDEN);
    }
  }
});
