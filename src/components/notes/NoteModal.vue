<template>
  <BaseModal
    ref="target"
    :modal-title="title"
    close-title="Close"
    class="overflow-y-auto"
    @close-editor="handleCloseModal">
    <div>
      <p
        class="break-all"
        v-html="content"></p>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseModal from '@/components/base/BaseModal.vue';

const target = ref();

type Props = {
  title: string;
  content: string;
};

defineProps<Props>();
const emit = defineEmits<{
  (e: 'closeEditor'): void;
}>();

function handleCloseModal(): void {
  emit('closeEditor');
}
</script>
