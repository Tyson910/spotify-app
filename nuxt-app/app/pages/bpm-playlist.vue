<script setup lang="ts">
import BPMPreview from '~/components/BPMPreview.vue';

definePageMeta({
  middleware: 'protected',
});
</script>

<template>
  <div>
    <UContainer>
      <BPMPreview />
      <UCard>
        <h2 class="text-xl font-bold mb-2">
          Stats
        </h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-400">Total tracks:</span>
            <!-- <span>{tracks.length}</span> -->
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Matching current filter:</span>
            <!-- <span>{filteredTracks.length}</span> -->
          </div>
          <!-- {selectedRangeId && ( -->
          <div class="flex justify-between">
            <span class="text-gray-400">Current BPM range:</span>
            <span>
              <!-- {bpmRanges.find(r => r.id === selectedRangeId)?.min} - -->
              <!-- {bpmRanges.find(r => r.id === selectedRangeId)?.max} -->
            </span>
          </div>
          <!-- )} -->
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
