<template>
  <div class="alert md:w-7/12 w-10/12 shadow-lg flex justify-center bg-neutral-focus">
    <slot name="default" class="text-xl text-center" />
    <BaseButton class="btn-warning btn-sm mx-4" @click="undoDelete"
      >Undo</BaseButton
    >
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';

const emits = defineEmits(['undo'])

function undoDelete() {
  emits('undo')
}
</script>
