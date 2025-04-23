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

  setCookie(event, 'state', state, { path: '/' });
  const queryParams = new URLSearchParams(spotifyCredOptions).toString();

  return sendRedirect(event, 'https://accounts.spotify.com/authorize?'
    + queryParams, 302);
});
