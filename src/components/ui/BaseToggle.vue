import { onUpdated } from 'vue';
<template>
  <div class="form-control flex flex-row items-center gap-2 py-4">
    <input
      :checked="modelValue"
      type="checkbox"
      class="toggle toggle-success"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
    <label class="label cursor-pointer">
      <span class="label-text">
        <slot name="title"></slot>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits(['update:modelValue']);
</script>
