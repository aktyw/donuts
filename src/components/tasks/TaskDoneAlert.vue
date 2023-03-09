<template>
  <BaseAlertVue />
</template>

<script setup lang="ts">
import type BaseAlertVue from '@/components/ui/BaseAlert.vue';

const emits = defineEmits(['undo', 'closeAlert']);

function undoDeleteTask(): void {
  emits('undo');
}

function closeDeleteAlert(): void {
  emits('closeAlert', true);
}
</script>
