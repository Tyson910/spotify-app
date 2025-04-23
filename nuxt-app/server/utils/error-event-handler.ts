import { type EventHandler, type EventHandlerRequest, H3Error } from 'h3';
import { FetchError } from 'ofetch';
import { HTTP_SERVER_ERROR_CODES } from '~/utils/http-helpers';
import { requestSpotifyToken } from '~~/server/utils/spotify-token';

export const defineErrorResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler
      const response = await handler(event);
      // do something after the route handler
      return response;
    }
    catch (err) {
      console.error(err);

      if (err instanceof H3Error) {
        throw err;
      }
      else if (err instanceof FetchError) {
        const refreshToken = getCookie(event, 'refresh_token');
        if (err.status == 401 && refreshToken) {
          await requestSpotifyToken(event, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          });
          // try again
          defineErrorResponseHandler(async () => await handler(event));
        }
      }
      throw createError({
        statusCode: HTTP_SERVER_ERROR_CODES.INTERNAL_SERVER_ERROR.statusCode,
        statusText: HTTP_SERVER_ERROR_CODES.INTERNAL_SERVER_ERROR.statusText,
        message: `An unexpected error has occured`,
      });
    }
  });
