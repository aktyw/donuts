<template>
  <div class="relative w-24 h-24">
    <div
      class="absolute radial-progress text-base-200"
      style="--value: 100; --size: 6rem; --thickness: 5px">
      <slot />
    </div>
    <div
      v-show="value > 0"
      class="absolute radial-progress text-primary"
      :style="{ '--value': value }"
      style="--size: 6rem; --thickness: 5px"></div>
  </div>

  <teleport to="body">
    <TheAchievement
      v-if="hasEarnAchievement && isModalOpen"
      :type="type"></TheAchievement>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import TheAchievement from '@/components/layouts/TheAchievement.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { TargetType } from '@/stores/StatsStore';

const settingsStore = useSettingsStore();
const hasEarnAchievement = ref(false);
const isModalOpen = computed(() => settingsStore.getModalStatus('achievement'));

type Props = {
  progressValue: number;
  type: TargetType;
};
const props = defineProps<Props>();

watch(
  () => props.progressValue,
  (val, old) => {
    animateProgress();
    console.log(old, val);
    if (val >= 100 && old < 100) {
      showAchievement();
    }
  }
);

const EASING_VALUE = 0.1;
const THRESHOLD = 0.03;
const value = ref(0);

function animateProgress() {
  const remainingDifference = props.progressValue - value.value;
  const change = remainingDifference * EASING_VALUE;

  if (Math.abs(change) < THRESHOLD) {
    value.value = props.progressValue;
  } else {
    value.value += change;
    requestAnimationFrame(animateProgress);
  }
}

function showAchievement() {
  hasEarnAchievement.value = true;
  settingsStore.setModal({ modal: 'achievement', value: true });
}

onMounted(() => {
  animateProgress();
});
</script>
