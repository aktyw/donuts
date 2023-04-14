<template>
  <BaseLabel :for="inputName">{{ label }}</BaseLabel>
  <input
    ref="input"
    :name="inputName"
    :value="modelValue"
    class="input input-bordered mb-8 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
    v-bind="$attrs"
    @input="updateModelValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseLabel from '@/components/ui/BaseLabel.vue';

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
