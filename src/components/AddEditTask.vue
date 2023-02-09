<template>
  <div class="modal modal-bottom sm:modal-middle modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        {{ title }}
      </h3>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-focus
      />
      <slot name="text" />
      <div class="modal-action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { vFocus } from '@/directives/vAutoFocus.js';

const props = defineProps(['modelValue', 'title']);
const emits = defineEmits(['update:modelValue']);
</script>
