<template>
  <component
    :is="componentIllustration"
    class="!fill-base-content max-w-[200px] md:max-w-[260px] w-full pointer-events-none" />
</template>

<script setup lang="ts">
import { useIllustration } from '@/composables/useIllustration';

const componentIllustration: unknown = useIllustration();
</script>
