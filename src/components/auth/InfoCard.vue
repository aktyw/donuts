<template>
  <div class="flex flex-col items-center text-left">
    <div class="pointer-events-none flex flex-col items-center text-base">
      <slot name="image">
        <TheIllustration />
      </slot>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheIllustration from '@/components/illustrations/TheIllustration.vue';
</script>
