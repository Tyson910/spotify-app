<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { useMutation } from '@tanstack/vue-query';
import { useGetCurrentUsersProfile } from '~~/generated/endpoints/users/users';

const accessToken = useCookie('access_token', { readonly: true });

const user = useGetCurrentUsersProfile({
  query: {
    enabled: !!accessToken.value,
  },
});

const colorMode = useColorMode();

const isDarkMode = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const navLinks = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
  },
]);

const logout = useMutation({
  mutationFn: async () => {
    await $fetch('/api/auth/logout');
    await navigateTo('/', {
      external: false,
    });
  },
});

const aviImage = computed(() => {
  if (!user.data.value) {
    return null;
  }
  const { images } = user.data.value;

  if (!images) {
    return null;
  }

  return images.at(0) ?? null;
});
</script>

<template>
  <div class="border-t md:border-b border-(--ui-border) bg-(--ui-bg) z-50 py-4 fixed left-0 right-0 bottom-0 md:sticky ">
    <UContainer class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-center">
        <UButton
          v-for="navLink in navLinks"
          :key="navLink.label"
          variant="link"
          :label="navLink.label"
          :icon="navLink.icon"
          :to="navLink.to"
          color="neutral"
          active-color="primary"
          active-variant="link"
        />
      </div>

      <div class="space-x-5 flex flex-row items-center">
        <ClientOnly v-if="!colorMode?.forced">
          <UButton
            :icon="isDarkMode ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            @click="isDarkMode = !isDarkMode"
          />
        </ClientOnly>
        <UAvatar
          v-if="user.data.value"
          size="md"
          :alt="user.data.value.display_name"
          :src="aviImage ? aviImage.url : undefined"
          :icon="aviImage ? undefined : 'i-lucide-user'"
        />
        <UButton
          v-if="user.data.value"
          variant="outline"
          label="Log Out"
          color="neutral"
          active-color="primary"
          active-variant="link"
          @click="logout.mutate()"
        />
      </div>
    </UContainer>
  </div>
</template>
