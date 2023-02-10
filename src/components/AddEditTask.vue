<template>
  <div class="modal modal-bottom sm:modal-middle modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-center py-2">
        {{ title }}
      </h3>
      <input
        type="text"
        class="input input-bordered md:w-full w-80  mt-4"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-focus
      />
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
