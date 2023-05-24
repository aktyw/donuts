<template>
  <input
    class="input input-bordered h-9 text-base bg-base-200 border-1 border-base-300 text-base-content outline-custom"
    :placeholder="placeholder || ''" />
</template>

<script setup lang="ts">
type Props = {
  placeholder?: string;
};

defineProps<Props>();
</script>
