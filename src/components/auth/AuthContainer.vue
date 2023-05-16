<template>
  <FadeTransitionMedium>
    <div class="hero full-h bg-base-200 w-full">
      <div class="hero-content flex-col md:gap-12 md:w-[800px]">
        <slot />
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
</script>
