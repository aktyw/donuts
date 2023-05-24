<template>
  <span class="label-text text-red-500">
    {{ message }}
  </span>
</template>

<script setup lang="ts">
type Props = {
  message: string;
};

defineProps<Props>();
</script>
