<template>
  <div
    class="modal modal-open modal-bottom sm:modal-middle"
    role="dialog">
    <div
      ref="target"
      v-bind="$attrs"
      class="modal-box overflow-visible">
      <h2
        v-if="modalTitle"
        class="flex justify-center font-bold text-2xl pt-2 pb-8">
        {{ modalTitle }}
      </h2>
      <div class="flex justify-center">
        <slot />
      </div>
      <div class="flex justify-end gap-4 text-lg mt-8">
        <ModalButton @click.prevent="closeEditor">{{ closeTitle }}</ModalButton>
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref } from 'vue';

import ModalButton from '@/components/modals/ModalButton.vue';

type Props = {
  modalTitle?: string;
  closeTitle: string;
};

defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
  (event: 'closeEditor'): void;
}>();

const target = ref();

function closeEditor(): void {
  emit('closeEditor');
}

useFocusTrap(target, {
  immediate: true,
});
</script>
