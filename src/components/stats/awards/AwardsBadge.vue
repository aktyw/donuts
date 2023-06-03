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
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

type Props = {
  progressValue: number;
};
const props = defineProps<Props>();

watch(
  () => props.progressValue,
  () => {
    animateProgress();
  }
);

const EASING_VALUE = 0.1;
const THRESHOLD = 0.03;
const MAX_VALUE = 100;
const value = ref(0);

function animateProgress() {
  const remainingDifference = Math.min(props.progressValue, MAX_VALUE) - value.value;
  const change = remainingDifference * EASING_VALUE;

  if (Math.abs(change) < THRESHOLD) {
    value.value = Math.min(props.progressValue, MAX_VALUE);
  } else {
    value.value += change;
    requestAnimationFrame(animateProgress);
  }
}

onMounted(() => {
  animateProgress();
});
</script>
