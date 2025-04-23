<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

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
      <div class="flex flex-row items-center">
        <UButton
          variant="outline"
          label="Log Out"
          color="neutral"
          active-color="primary"
          active-variant="link"
          class="mr-5"
        />
        <div class="space-x-4 md:flex md:flex-row md:items-center">
          <ClientOnly v-if="!colorMode?.forced">
            <UButton
              :icon="isDarkMode ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="neutral"
              variant="ghost"
              @click="isDarkMode = !isDarkMode"
            />
            <template #fallback>
              <UButton
                icon="i-lucide-sun"
                color="neutral"
                variant="ghost"
              />
            </template>
          </ClientOnly>
        </div>
      </div>
    </UContainer>
  </div>
</template>
