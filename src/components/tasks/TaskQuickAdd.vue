<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen before:content-[''] before:h-full before:w-full before:bg-transparent before:z-50 before:absolute">
    <TaskEditor
      ref="target"
      class="!fixed top-24 right-96 bg-base-100 w-[480px] max-w-xl border-none shadow-[0_10px_55px_-20px_rgba(0,0,0,0.3)] shadow-base-content z-50"
      @close-editor="handleCloseEditor" />
  </div>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref } from 'vue';

import TaskEditor from './TaskEditor.vue';

const target = ref();
const emit = defineEmits<{
  (e: 'closeEditor'): void;
}>();

function handleCloseEditor(): void {
  emit('closeEditor');
}

useFocusTrap(target, {
  immediate: true,
});
</script>
