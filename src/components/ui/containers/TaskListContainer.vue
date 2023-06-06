<template>
  <FadeTasksList tag="ul">
    <slot />
  </FadeTasksList>
</template>

<script setup lang="ts">
import FadeTasksList from '@/components/ui/transitions/FadeTasksLIst.vue';
</script>
