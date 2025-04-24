import { HTTP_SERVER_ERROR_CODES } from '~/utils/http-helpers';
import { defineErrorResponseHandler } from '~~/server/utils/error-event-handler';

export default defineErrorResponseHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token');
  if (!refreshToken) {
    throw createError(HTTP_SERVER_ERROR_CODES.UNAUTHORIZED);
  }
  await requestSpotifyToken(event, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return { success: true };
});
