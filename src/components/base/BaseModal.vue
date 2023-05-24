<template>
  <div
    class="modal modal-open modal-bottom sm:modal-middle"
    role="dialog">
    <div
      ref="target"
      class="modal-box overflow-visible">
      <h2
        v-if="modalTitle"
        class="pb-8 pt-2 text-2xl font-bold">
        {{ modalTitle }}
      </h2>
      <slot />
      <div class="mt-8 flex justify-end gap-4 text-lg">
        <ModalButton @click.prevent="closeEditor"> {{ closeTitle }} </ModalButton>
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
