import type { IFetchError, FetchOptions } from 'ofetch';

export const spotifyFetch = async <T>(
  url: string,
  {
    method,
    params,
    body,
    ...options
  }: FetchOptions & {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  },
): Promise<T> => {
  const accessToken = useCookie('access_token', { readonly: true });

  const response = await $fetch(url, {
    baseURL: 'https://api.spotify.com/v1',
    method,
    body,
    params,
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
    retryStatusCodes: [401, 408, 409, 425, 429, 500, 502, 503, 504],
    async onResponseError({ response }) {
      if (response.status === 401) {
        await $fetch('/api/auth/refresh');
        refreshCookie('access_token');
      }
    },
    ...options,
  });

  return response as T;
};

export default spotifyFetch;

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = IFetchError<Error>;
