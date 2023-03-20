<template>
  <div
    id="notification"
    v-focus
    class="alert flex bg-neutral-focus text-neutral-content lg:w-fit shadow-lg p-2"
    role="dialog">
    <div>
      <slot name="content" />
      <div class="flex gap-0">
        <slot name="action" />
        <BaseButton
          class="hover:bg-base-content rounded btn-sm"
          @click="handleCloseAlert(notificationId)">
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
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import { vFocus } from '@/directives/vAutoFocus.js';

defineProps<{ notificationId: string }>();

const emit = defineEmits<{
  (e: 'closeAlert', id: string): void;
}>();

function handleCloseAlert(id: string): void {
  emit('closeAlert', id);
}
</script>
