<template>
  <FadeTransitionMedium>
    <div
      class="modal modal-open modal-bottom sm:modal-middle"
      role="dialog">
      <div class="modal-box">
        <h3 class="pb-6 pt-2 text-center text-lg font-semibold">
          <slot />
        </h3>
        <slot name="content" />

        <div
          ref="target"
          class="modal-action gap-1">
          <BaseButton
            class="btn-sm btn rounded-md border-0 bg-base-200 font-semibold capitalize text-base-content hover:bg-base-300 focus:outline focus:outline-1"
            @click="$emit('cancel')">
            Cancel
          </BaseButton>
          <BaseButton
            class="btn-sm btn rounded-md font-semibold capitalize"
            :class="{
              'fill-base-content hover:fill-error hover:text-error focus:fill-error focus:text-error active:fill-error active:text-error':
                isDanger,
            }"
            @click="$emit('action')">
            Delete
          </BaseButton>
        </div>
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import type { Project } from '@/types/models/Projects';

defineProps<{
  isDanger?: boolean;
}>();

defineEmits<{
  (e: 'cancel'): void;
  (e: 'action', currentProject?: Project): void;
}>();

const target = ref();

useFocusTrap(target, {
  immediate: true,
});
</script>
