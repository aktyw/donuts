<template>
  <div class="flex flex-col items-center text-left">
    <div class="pointer-events-none flex flex-col items-center text-base">
      <slot name="image">
        <img
          class="pointer-events-none w-full max-w-[240px] md:max-w-[260px]"
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
