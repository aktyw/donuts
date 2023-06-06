<template>
  <div class="flex gap-4 pb-4">
    <BaseButton
      class="btn btn-sm"
      @click="handleSaveNote">
      Save note
    </BaseButton>
    <BaseButton
      class="btn btn-sm"
      @click="handleCopyToClipboard">
      Copy content
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';

const emit = defineEmits<{
  (e: 'saveNote'): void;
  (e: 'copyToClipboard'): void;
}>();

function handleSaveNote(): void {
  emit('saveNote');
}

function handleCopyToClipboard(): void {
  emit('copyToClipboard');
}
</script>
