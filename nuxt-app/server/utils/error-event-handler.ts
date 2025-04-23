import { type EventHandler, type EventHandlerRequest, H3Error } from 'h3';
import { HTTP_SERVER_ERROR_CODES } from '~/utils/http-helpers';

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
      throw createError({
        statusCode: HTTP_SERVER_ERROR_CODES.INTERNAL_SERVER_ERROR.statusCode,
        statusText: HTTP_SERVER_ERROR_CODES.INTERNAL_SERVER_ERROR.statusText,
        message: `An unexpected error has occured`,
      });
    }
  });
