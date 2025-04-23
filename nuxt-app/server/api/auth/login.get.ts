export default defineEventHandler(async (event) => {
  const state = crypto.randomUUID();
  const scope = `user-read-recently-played 
  user-read-private 
  user-read-email 
  user-library-read 
  user-top-read 
  user-follow-read 
  playlist-read-private 
  playlist-read-collaborative 
  playlist-modify-public 
  playlist-modify-private`;

  const { CLIENT_ID, REDIRECT_URI } = useRuntimeConfig(event);

  const spotifyCredOptions = {
    response_type: 'code',
    client_id: CLIENT_ID,
    show_dialog: 'true',
    scope,
    redirect_uri: REDIRECT_URI,
    state,
  };
  const didHandleCors = handleCors(event, {
    origin: '*', // You can restrict to 'http://localhost:3000' if you want
    methods: ['GET', 'POST'],
    preflight: {
      statusCode: 204,
    },
  });

  if (didHandleCors) return;

  setCookie(event, 'state', state, { path: '/' });
  const queryParams = new URLSearchParams(spotifyCredOptions).toString();

  return sendRedirect(event, 'https://accounts.spotify.com/authorize?'
    + queryParams, 302);
});
