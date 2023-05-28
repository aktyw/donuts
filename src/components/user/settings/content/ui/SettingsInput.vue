<template>
  <input
    :modelValue="data"
    class="input input-bordered h-9 text-base bg-base-200 border-1 border-base-300 text-base-content outline-custom"
    :placeholder="placeholder || ''"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Props = {
  placeholder?: string;
};

defineEmits(['update:modelValue']);
defineProps<Props>();

const data = ref();
</script>
