<template>
  <BaseButton
    class="btn-ghost no-animation btn-sm btn-block btn justify-start p-0 py-2 text-left font-normal normal-case hover:bg-transparent [&:hover>svg]:bg-accent [&:hover>svg]:fill-neutral-content [&:hover]:text-accent"
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
