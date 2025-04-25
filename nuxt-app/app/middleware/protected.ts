export default defineNuxtRouteMiddleware(async (to) => {
  const accessToken = useCookie('access_token', { readonly: true });

  if (!accessToken.value) {
    const { data, error } = await useFetch('/api/auth/refresh');

    if (error || !data.value?.success) {
      return navigateTo(`/login?redirect_url=${to.fullPath}`);
    }
  }
});
