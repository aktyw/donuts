<template>
  <div class="flex flex-col items-center text-center lg:text-left">
    <div class="flex flex-col items-center md:text-lg pointer-events-none">
      <slot>
        <img
          class="max-w-[260px] w-full pointer-events-none"
          :src="pathToRandomIllustration || '/src/assets/illustrations/donut-bench.svg'"
          alt="Illustration of happy donut" />
      </slot>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIllustration } from '@/composables/useIllustration';

const pathToRandomIllustration = useIllustration();
</script>
