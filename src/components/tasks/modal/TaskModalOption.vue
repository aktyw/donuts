<template>
  <div class="border-b border-base-300 px-2 py-3">
    <h3 class="py-2 text-sm font-medium">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};
defineProps<Props>();
</script>
