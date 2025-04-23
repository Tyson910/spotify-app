import { defineErrorResponseHandler } from '~~/server/utils/error-event-handler';

export default defineErrorResponseHandler(async (event) => {
  const state = crypto.randomUUID();

  const scopes = [
    'user-read-recently-played',
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-top-read',
    'user-follow-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
  ] as const;

  const { CLIENT_ID, REDIRECT_URI } = useRuntimeConfig(event);

  const spotifyCredOptions = {
    response_type: 'code',
    client_id: CLIENT_ID,
    show_dialog: 'true',
    scope: scopes.join(' '),
    redirect_uri: REDIRECT_URI,
    state,
  };

  const cookieExpirationDateTime = new Date();
  cookieExpirationDateTime.setTime(cookieExpirationDateTime.getTime() + (60 * 60 * 1000)); // expire in an hour
  setCookie(event, 'state', state, {
    // HttpOnly: Cookies are only accessible server-side
    httpOnly: true,
    // SameSite=Lax: Use Strict for critical websites
    sameSite: 'lax',
    // Secure: Cookies can only be sent over HTTPS
    secure: !import.meta.dev,
    // Path=/: Cookies can be accessed from all routes
    path: '/',
    // Max-Age or Expires: Must be defined to persist cookies
    expires: cookieExpirationDateTime,
  });

  const queryParams = new URLSearchParams(spotifyCredOptions).toString();

  return sendRedirect(event, 'https://accounts.spotify.com/authorize?'
    + queryParams, 302);
});
