<template>
  <FadeTransitionMedium>
    <div
      class="fixed left-0 top-0 z-[1000] h-screen w-screen before:absolute before:z-50 before:h-full before:w-full before:bg-transparent before:content-['']">
      <TaskEditor
        ref="target"
        class="border-1 !fixed right-96 top-24 z-50 w-[480px] max-w-xl border-base-300 bg-base-100 shadow-[0_10px_45px_-20px] shadow-neutral"
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
