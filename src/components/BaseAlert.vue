<template>
  <div class="alert gap-0 lg:w-fit w-10/12 md:w-6/12 shadow-lg bg-neutral-focus text-neutral-content ">
    <slot name="default"  />
    <BaseButton class="btn-accent md:btn-sm mx-4 " @click="undoDelete"
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
