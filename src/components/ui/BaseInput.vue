<template>
  <label
    class="text-xl font-semibold mb-2"
    :for="inputName"
    >{{ label }}</label
  >
  <input
    ref="input"
    :name="inputName"
    :value="modelValue"
    class="input input-bordered mb-8"
    @input="updateModelValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref();

defineProps<{
  modelValue: string;
  inputName: string;
  label: string;
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
