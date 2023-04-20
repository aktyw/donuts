<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div
      ref="target"
      class="modal-box overflow-visible">
      <div class="flex justify-between items-center bg-base-200 border-b">
        <div>current project</div>
        <nav class="flex">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <ModalButton
            class=""
            @click.prevent="closeEditor">
            <template #icon>
              <IconClose />
            </template>
          </ModalButton>
        </nav>
      </div>
      <section class="flex justify-between h-96">
        <main>CONTENT LEFT</main>
        <aside>SIDEBAR RIGHT</aside>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref } from 'vue';

import IconClose from '@/components/icons/IconClose.vue';
import ModalButton from '@/components/modals/ModalButton.vue';
import type { Task } from '@/types/models/Task';

type Props = {
  task: Task;
};
const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
  (event: 'closeEditor'): void;
}>();

const target = ref();

useFocusTrap(target, {
  immediate: true,
});

onClickOutside(target, () => closeEditor());

function closeEditor(): void {
  emit('closeEditor');
}
</script>
