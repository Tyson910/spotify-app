import { useGetCurrentUsersProfile } from '~~/generated/endpoints/users/users';

export default defineNuxtRouteMiddleware(async (to) => {
  const { suspense } = useGetCurrentUsersProfile();

  const { error, data } = await suspense();

  if (error || !data) {
    return navigateTo(`/login?redirect_url=${to.fullPath}`);
  }
});
