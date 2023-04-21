<template>
  <input
    ref="input"
    :value="modelValue"
    type="text"
    class="input input-ghost input-sm rounded px-1 md:w-full border-b-1 !outline-1 !outline-offset-0 border-t-0 border-l-0 border-r-0 focus:border-b-1 focus:border-b-content-focus"
    @input="updateModelValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref();

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

function updateModelValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

function focus() {
  input.value?.focus();
}

defineExpose({ focus });
</script>
