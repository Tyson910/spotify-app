<script setup lang="ts">
import drumSfx from '~~/public/sounds/909-drums.mp3';

const currentBPM = useState('current-bpm', () => 100);

const { play } = useSound(drumSfx, {
  sprite: {
    kick: [0, 350],
    // hihat: [374, 160],
    // snare: [666, 290],
    // cowbell: [968, 200],
  },
});

const interval = computed(() => (60000 / currentBPM.value));

const { pause, resume, isActive } = useIntervalFn(() => {
  // @ts-expect-error idk why they want this to be a number
  play({ id: 'kick' });
}, interval, { immediate: false });
</script>

<template>
  <div>
    <UCard>
      <h2 class="text-xl font-bold mb-4 flex items-center">
        <UIcon
          name="i-lucide-volume-2"
          class="mr-2"
          :size="20"
        />

        BPM Preview
      </h2>
      <div class="text-center space-y-4">
        <div class="text-4xl font-mono font-bold">
          {{ currentBPM }} BPM
        </div>

        <USlider
          v-model="currentBPM"
          :min="60"
          :max="200"
        />
        <UButton
          block
          class="py-4"
          :label="isActive ? 'Stop Preview' : 'Play Tempo'"
          :icon="isActive ? 'i-lucide-pause' : 'i-lucide-play'"
          @click="isActive ? pause() : resume() "
        />
        <p class="text-xs text-(--ui-text-muted)">
          Hear what {{ currentBPM }} BPM sounds like to better understand the tempo
        </p>
      </div>
    </UCard>
  </div>
</template>
