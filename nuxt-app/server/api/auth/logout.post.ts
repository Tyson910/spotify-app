import { defineErrorResponseHandler } from '~~/server/utils/error-event-handler';

export default defineErrorResponseHandler(async (event) => {
  deleteCookie(event, 'refresh_token');
  deleteCookie(event, 'access_token');
  return { success: true };
});
