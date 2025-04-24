<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

const appConfig = useAppConfig();

useHead({
  htmlAttrs: { lang: 'en' },
  // link: [{ rel: "icon", href: "/icon.png" }],
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: `${appConfig.siteName} | %s`,
});
</script>

<template>
  <Body>
    <DevOnly>
      <VueQueryDevtools />
    </DevOnly>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <UApp>
      <div
        class="min-h-screen flex flex-col scroll-smooth bg-(--ui-bg-muted) text-(--ui-text) selection:bg-(--ui-primary) selection:text-(--ui-color-primary-50)"
      >
        <NavBar />
        <main
          class="flex-grow"
        >
          <NuxtPage />
        </main>
        <Footer />
      </div>
    </UApp>
  </Body>
</template>
