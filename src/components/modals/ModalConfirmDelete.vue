<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div class="modal-box">
      <h3 class="font-semibold text-lg text-center py-2">
        <slot />
      </h3>
      <slot name="content" />

      <div
        ref="target"
        class="modal-action gap-1">
        <BaseButton
          class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold focus:outline focus:outline-1"
          @cancel="$emit('cancel')">
          Cancel
        </BaseButton>
        <BaseButton
          class="btn btn-sm rounded-md capitalize font-semibold"
          :class="{
            'hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content active:fill-error active:text-error':
              isDanger,
          }"
          @click="$emit('action')">
          Delete
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';

defineProps<{
  isDanger?: boolean;
}>();

defineEmits<{
  (e: 'cancel'): void;
  (e: 'action'): void;
}>();

const target = ref();

useFocusTrap(target, {
  immediate: true,
});
</script>
