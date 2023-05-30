<template>
  <BaseButton
    class="my-2 flex h-9 w-48 cursor-pointer items-center justify-center rounded-md border border-red-600 text-center text-sm font-medium text-red-600 transition hover:border-red-800 hover:text-red-800">
    {{ title }}
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';

type Props = {
  title: string;
};

defineProps<Props>();
</script>
