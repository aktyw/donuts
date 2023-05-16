<template>
  <div class="flex flex-col items-center text-left">
    <div class="flex flex-col items-center text-base pointer-events-none">
      <slot name="image">
        <img
          class="max-w-[240px] md:max-w-[260px] w-full pointer-events-none"
          :src="pathToRandomIllustration || '/src/assets/illustrations/donut-bench.svg'"
          alt="Illustration of happy donut" />
      </slot>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIllustration } from '@/composables/useIllustration';

const pathToRandomIllustration = useIllustration();
</script>
