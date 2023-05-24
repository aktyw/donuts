<template>
  <FadeTransitionMedium>
    <div class="full-h hero w-full bg-base-200">
      <div class="hero-content flex-col md:w-[800px] md:gap-12">
        <slot />
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
</script>
