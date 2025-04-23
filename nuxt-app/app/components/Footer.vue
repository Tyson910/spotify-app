<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg)">
    <div class="my-8 text-center text-sm text-(--ui-text-dimmed)">
      <p>Not affiliated with Spotify</p>
      <p class="mt-1 text-center">
        &copy; {{ new Date().getFullYear() }} {{ appConfig.siteName }}. All rights reserved.
      </p>
    </div>
    <!-- <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav class="flex flex-wrap justify-center">
        <div class="px-5 py-2">
          <a
            href="#"
            class="text-base text-(--ui-text-dimmed) hover:text-(--ui-text)"
          >About</a>
        </div>
        <div class="px-5 py-2">
          <a
            href="#"
            class="text-base text-(--ui-text-dimmed) hover:text-(--ui-text)"
          >Blog</a>
        </div>
        <div class="px-5 py-2">
          <a
            href="#"
            class="text-base text-(--ui-text-dimmed) hover:text-(--ui-text)"
          >Pricing</a>
        </div>
        <div class="px-5 py-2">
          <a
            href="#"
            class="text-base text-(--ui-text-dimmed) hover:text-(--ui-text)"
          >Support</a>
        </div>
        <div class="px-5 py-2">
          <a
            href="#"
            class="text-base text-(--ui-text-dimmed) hover:text-(--ui-text)"
          >Privacy Policy</a>
        </div>
        <div class="px-5 py-2">
          <a
            href="#"
            class="text-base text-(--ui-text-dimmed) hover:text-(--ui-text)"
          >Terms of Service</a>
        </div>
      </nav>
    </div> -->
  </footer>
</template>
