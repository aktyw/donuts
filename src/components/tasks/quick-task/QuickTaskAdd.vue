<template>
  <FadeTransitionMedium>
    <div
      class="fixed top-0 left-0 w-screen h-screen before:content-[''] before:h-full before:w-full before:bg-transparent before:z-50 before:absolute z-[1000]">
      <TaskEditor
        ref="target"
        class="!fixed top-24 right-96 bg-base-100 w-[480px] max-w-xl border-1 border-base-300 shadow-[0_10px_45px_-20px] shadow-neutral z-50"
        :quick-task="true"
        @close-editor="handleCloseEditor"
        @add-task="handleCloseEditor" />
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref } from 'vue';

import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';

const target = ref(null);

const emit = defineEmits<{
  (e: 'closeEditor'): void;
}>();

onClickOutside(target, () => handleCloseEditor());

function handleCloseEditor(): void {
  emit('closeEditor');
}

useFocusTrap(target, {
  immediate: true,
});
</script>
