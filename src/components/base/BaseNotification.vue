<template>
  <div
    id="notification"
    v-focus
    class="alert flex bg-neutral-focus p-2 text-neutral-content shadow-lg lg:w-fit"
    role="dialog">
    <div>
      <slot name="content" />
      <div class="flex gap-0">
        <slot name="action" />
        <BaseButton
          class="btn-sm rounded-md hover:bg-neutral [&>svg]:hover:!fill-base-300"
          @click="handleCloseAlert(notificationId)">
          <template #icon>
            <IconClose class="mx-2 fill-neutral-content" />
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
