<template>
  <div class="alert gap-0 shadow-lg p-3" role="dialog">
    <slot name="default" />
    <div class="flex gap-0">
      <BaseButton
        class="btn-ghost btn-sm text-accent capitalize md:btn-sm focus:outline focus:outline-1"
        @click="undoDelete"
        v-focus
        >Undo</BaseButton
      >
      <button @click="closeDeleteAlert">
        <svg
          class="fill-base-100 mx-2"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
        >
          <path
            d="M6.4 18.65 5.35 17.6l5.6-5.6-5.6-5.6L6.4 5.35l5.6 5.6 5.6-5.6 1.05 1.05-5.6 5.6 5.6 5.6-1.05 1.05-5.6-5.6Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import { vFocus } from '@/directives/vAutoFocus.js';
const emits = defineEmits(['undo', 'closeAlert']);

function undoDelete() {
  emits('undo');
}

function closeDeleteAlert() {
  emits('closeAlert', true);
}
</script>
