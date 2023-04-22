<template>
  <li
    v-if="!isFirst"
    class="border-1 m-1"
    aria-hidden="true" />
  <li class="px-4 py-1.5 font-semibold text-sm">
    <slot />
  </li>
</template>

<script setup lang="ts">
type Props = {
  isFirst?: boolean;
};

defineProps<Props>();
</script>
