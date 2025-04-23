import type { H3Event } from 'h3';
import { z } from 'zod';
import { HTTP_SERVER_ERROR_CODES } from '~/utils/http-helpers';

type BodyParamOptions =
  { grant_type: 'refresh_token'; refresh_token: string }
  | {
    code: string;
    redirect_uri: string;
    grant_type: 'authorization_code';
  };

export async function requestSpotifyToken(event: H3Event, bodyParams: BodyParamOptions) {
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const { CLIENT_SECRET, CLIENT_ID } = useRuntimeConfig(event);

  const response = await $fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    body: new URLSearchParams(bodyParams).toString(),
    headers: {
      'Authorization': 'Basic '
        + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
      'content-type': 'application/x-www-form-urlencoded',
    },
    onResponseError({ response }) {
      console.error(response);
      console.error(response._data);
      deleteCookie(event, 'refresh_token');
      deleteCookie(event, 'access_token');
      throw createError({ ...HTTP_SERVER_ERROR_CODES.BAD_REQUEST, message: 'Unable to log in' });
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

  if (!validatedReponseResult.success) {
    throw createError({ ...HTTP_SERVER_ERROR_CODES.BAD_REQUEST, message: 'Invalid Spotify Response. Unable to log in' });
  }

  const { refresh_token, access_token, expires_in } = validatedReponseResult.data;

  const cookieSettings = {
    // HttpOnly: Cookies are only accessible server-side
    httpOnly: true,
    // SameSite=Lax: Use Strict for critical websites
    sameSite: 'lax',
    // Secure: Cookies can only be sent over HTTPS
    secure: !import.meta.dev,
    // Max-Age or Expires: Must be defined to persist cookies
    maxAge: expires_in,
    // Path=/: Cookies can be accessed from all routes
    path: '/',
  } as const;

  setCookie(event, 'refresh_token', refresh_token, cookieSettings);
  setCookie(event, 'access_token', access_token, cookieSettings);

  return validatedReponseResult.data;
}
