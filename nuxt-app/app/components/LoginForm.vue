<script setup lang="ts">
const appConfig = useAppConfig();

const features = [
  'Create playlists based on specific BPM ranges',
  'Discover new tracks that match your workout tempo',
  'Save custom playlists directly to your Spotify account',
] as const;

async function loginRequest() {
  try {
    await navigateTo('/api/auth/login', {
      external: true,
    });
  }
  catch {
    useToast().add({
      title: 'Error',
      description: 'Unable to sign in. Please try again',
      color: 'error',
      duration: 4000,
    });
  }
}
</script>

<template>
  <UCard>
    <div class="flex flex-col items-center mb-8">
      <UIcon
        name="i-lucide-music"
        class="text-(--ui-primary) size-14"
      />
      <h1 class="text-3xl font-bold text-center mb-2">
        {{ appConfig.siteName }}
      </h1>
      <p class="text-gray-500 text-center">
        Create perfect playlists based on tempo
      </p>
    </div>

    <div class="space-y-6">
      <div class="bg-(--ui-bg-muted) p-4 rounded-lg border border-(--ui-border)">
        <h2 class="font-medium mb-2">
          What you'll get:
        </h2>

        <ul class="space-y-2 text-sm text-(--ui-text-toned) list-disc pl-5">
          <li
            v-for="feature in features"
            :key="feature"
          >
            {{ feature }}
          </li>
        </ul>
      </div>

      <UButton
        :label="true ? 'Connect with Spotify' : 'Loading'"
        block
        loading-auto
        size="xl"
        class="rounded-full py-3 transition-colors duration-300"
        icon="i-simple-icons-spotify"
        @click="loginRequest"
      />
      <p class="text-xs text-center text-gray-400 mt-4">
        By continuing, you agree to allow {{ appConfig.siteName }} to access your Spotify account data in accordance with our <NuxtLink
          href="/terms-of-service"
          class="text-(--ui-primary) hover:text-(--ui-color-primary-800)"
        >Terms of Service</NuxtLink> and <NuxtLink
          href="/privacy-policy"
          class="text-(--ui-primary) hover:text-(--ui-color-primary-800)"
        >Privacy Policy</NuxtLink>.
      </p>
    </div>
  </UCard>
</template>
