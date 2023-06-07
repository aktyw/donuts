<template>
  <BaseInput
    id="title"
    :placeholder="title"
    input-name="title"
    name="title"
    class="px-0.5 text-md font-bold border-0 text-base-content bg-base-100 focus-within:bg-base-300 transition p-0 !mb-2 h-8" />
</template>

<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue';

type Props = {
  title: string;
};

defineProps<Props>();
</script>
