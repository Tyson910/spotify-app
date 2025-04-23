import type { H3Event } from 'h3';
import { z } from 'zod';
import { defineErrorResponseHandler } from '~~/server/utils/error-event-handler';

async function requestAccessToken({ authCode, event }: { authCode: string; event: H3Event }) {
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const { CLIENT_SECRET, CLIENT_ID, REDIRECT_URI } = useRuntimeConfig(event);

  const response = await $fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    body: new URLSearchParams({
      code: authCode,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }).toString(),
    headers: {
      'Authorization': 'Basic '
        + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
      'content-type': 'application/x-www-form-urlencoded',
    },
    onResponseError({ response }) {
      console.error(response);
      console.error(response._data);
      throw createError({ status: 400, statusText: 'Unable to log in' });
    },
  });

  const responseValidator = z.object({
    access_token: z.string().describe('An access token that can be provided in subsequent calls, for example to Spotify Web API services.'),
    token_type: z.literal('Bearer').describe('How the access token may be used: always "Bearer".'),
    scope: z.string().describe('An access token that can be provided in subsequent calls, for example to Spotify Web API services.'),
    expires_in: z.number().describe('The time period (in seconds) for which the access token is valid.'),
    refresh_token: z.string(),
  });

  const validatedReponseResult = responseValidator.safeParse(response);

  if (validatedReponseResult.success) {
    return validatedReponseResult.data;
  }

  throw createError({ status: 400, statusText: 'Invalid Spotify Response', message: 'Unable to log in' });
}

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

  const response = await requestAccessToken({ authCode: validatedQuery.code, event });

  const cookieSettings = {
    // HttpOnly: Cookies are only accessible server-side
    httpOnly: true,
    // SameSite=Lax: Use Strict for critical websites
    sameSite: 'lax',
    // Secure: Cookies can only be sent over HTTPS
    secure: !import.meta.dev,
    // Max-Age or Expires: Must be defined to persist cookies
    maxAge: response.expires_in,
    // Path=/: Cookies can be accessed from all routes
    path: '/',
  } as const;

  const { refresh_token, access_token } = response;
  setCookie(event, 'refresh_token', refresh_token, cookieSettings);
  setCookie(event, 'access_token', access_token, cookieSettings);

  return sendRedirect(event, '/');
},
);
