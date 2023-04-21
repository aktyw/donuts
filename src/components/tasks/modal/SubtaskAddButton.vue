<template>
  <BaseButton
    class="btn btn-sm btn-block btn-ghost p-0 text-left normal-case justify-start hover:bg-transparent [&:hover>svg]:fill-neutral-content [&:hover>svg]:bg-accent [&:hover]:text-accent font-normal py-2 no-animation"
    @click.prevent="showAddSubtaskEditor">
    <template #icon>
      <IconAdd class="mr-2 rounded-xl transition-all duration-150" />
    </template>
    Add subtask
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconAdd from '@/components/icons/IconAdd.vue';

function showAddSubtaskEditor(): void {}
</script>
