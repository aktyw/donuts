<template>
  <BaseButton
    class="flex items-center justify-center text-center h-9 w-48 border rounded-md border-red-600 text-red-600 hover:border-red-800 my-2 hover:text-red-800 transition cursor-pointer font-medium text-sm">
    {{ title }}
  </BaseButton>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>
