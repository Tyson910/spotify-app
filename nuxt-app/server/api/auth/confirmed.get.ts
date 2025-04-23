import { z } from 'zod';
import { defineErrorResponseHandler } from '~~/server/utils/error-event-handler';
import { requestSpotifyToken } from '~~/server/utils/spotify-token';

const queryParamValidator = z.union([
  z.object({
    state: z.string().uuid(),
    error: z.string().describe('The reason authorization failed, for example: "access_denied"'),
  }),
  z.object({
    state: z.string().uuid(),
    code: z.string().describe('An authorization code that can be exchanged for an access token.'),
  }),
]);

export default defineErrorResponseHandler(async (event) => {
  const validatedQuery = await getValidatedQuery(event, queryParamValidator.parse);

  if ('error' in validatedQuery) {
    throw createError({
      status: 401,
      statusText: validatedQuery.error,
      message: validatedQuery.error,
    });
  }

  deleteCookie(event, 'refresh_token');
  deleteCookie(event, 'access_token');

  const { REDIRECT_URI } = useRuntimeConfig(event);
  await requestSpotifyToken(event, {
    code: validatedQuery.code,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });
  return sendRedirect(event, '/');
},
);
