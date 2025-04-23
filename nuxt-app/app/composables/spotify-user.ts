import type { OnePrivateUserResponse } from '~~/generated/models/onePrivateUserResponse';

export const useSpotifyUser = () => {
  const user = useState<OnePrivateUserResponse | null>('user', () => null);
  return user;
};

export const useAuthenticatedSpotifyUser = () => {
  const user = useSpotifyUser();
  return computed(() => {
    const userValue = unref(user);
    if (!userValue) {
      throw createError(
        'useAuthenticatedSpotifyUser() can only be used in protected pages',
      );
    }
    return userValue;
  });
};
