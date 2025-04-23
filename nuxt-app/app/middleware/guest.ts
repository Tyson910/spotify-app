export default defineNuxtRouteMiddleware(() => {
  const user = useSpotifyUser();
  if (user.value != null) return navigateTo('/');
});
