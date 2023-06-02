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
import { onMounted, ref } from 'vue';

type Props = {
  progressValue: number;
};

const props = defineProps<Props>();

const EASING_VALUE = 0.05;
const value = ref(0);

function animateProgress() {
  if (value.value >= props.progressValue) return;

  value.value += (props.progressValue - value.value) * EASING_VALUE;
  requestAnimationFrame(animateProgress);
}

onMounted(() => {
  animateProgress();
});
</script>
