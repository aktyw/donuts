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
          class="hover:bg-base-content [&>svg]:hover:!fill-base-200 rounded btn-sm"
          @click="handleCloseAlert(notificationId)">
          <template #icon>
            <IconClose class="mx-2 fill-base-content" />
          </template>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconClose from '@/components/icons/IconClose.vue';
import { vFocus } from '@/directives/vAutoFocus.js';

defineProps<{ notificationId: string }>();

const emit = defineEmits<{
  (e: 'closeAlert', id: string): void;
}>();

function handleCloseAlert(id: string): void {
  emit('closeAlert', id);
}
</script>
