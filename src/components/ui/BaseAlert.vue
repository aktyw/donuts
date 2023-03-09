<template>
  <div
    v-focus
    class="alert shadow-lg gap-0 p-3"
    role="dialog">
    <div>
      <slot name="content" />
      <BaseButton @click="closeAlert">
        <template #icon>
          <svg
            class="fill-base-100 mx-2"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M6.4 18.65 5.35 17.6l5.6-5.6-5.6-5.6L6.4 5.35l5.6 5.6 5.6-5.6 1.05 1.05-5.6 5.6 5.6 5.6-1.05 1.05-5.6-5.6Z" />
          </svg>
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import { vFocus } from '@/directives/vAutoFocus.js';

const emit = defineEmits<{
  (e: 'closeAlert'): void;
}>();

function closeAlert(): void {
  emit('closeAlert');
}
</script>
