<template>
  <li class="px-4 py-1.5 text-sm font-semibold">
    <slot />
  </li>
</template>

<script setup lang="ts">
type Props = {
  isFirst?: boolean;
};

defineProps<Props>();
</script>
