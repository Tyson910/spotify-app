export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie('access_token');
  if (!accessToken) {
    return navigateTo(`/login`);
  }

  const user = useSpotifyUser();
  if (!user.value) return navigateTo(`/login?redirect_url=${to.fullPath}`);
});
