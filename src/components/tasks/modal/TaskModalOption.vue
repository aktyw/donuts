<template>
  <div class="border-b border-base-300 px-2 py-3">
    <h3 class="font-medium text-sm py-2">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};
defineProps<Props>();
</script>
