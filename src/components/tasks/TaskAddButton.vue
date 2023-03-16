<template>
  <BaseButton
    v-if="largerThanSm"
    class="btn btn-sm btn-block btn-ghost p-0 text-left normal-case justify-start hover:bg-transparent [&:hover>svg]:fill-neutral-content [&:hover>svg]:bg-accent [&:hover]:text-accent transition-all duration-150"
    @click.prevent="showAddTaskEditor">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        class="mr-2 rounded-xl transition-all duration-150">
        <path d="M11.5 18.5v-6h-6v-1h6v-6h1v6h6v1h-6v6Z" />
      </svg>
    </template>
    <template #default>Add task</template>
  </BaseButton>

  <BaseButton
    v-else-if="smAndSmaller"
    class="btn btn-accent btn-circle btn-lg fixed bottom-8 right-8 fill-white z-50"
    @click.prevent="showAddTaskEditor">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="40"
        width="40">
        <path
          d="M20 30.833q-.292 0-.5-.208-.208-.208-.208-.5v-9.417H9.875q-.292 0-.5-.208-.208-.208-.208-.5 0-.292.208-.5.208-.208.5-.208h9.417V9.875q0-.292.208-.5.208-.208.5-.208.292 0 .5.208.208.208.208.5v9.417h9.417q.292 0 .5.208.208.208.208.5 0 .292-.208.5-.208.208-.5.208h-9.417v9.417q0 .292-.208.5-.208.208-.5.208Z" />
      </svg>
    </template>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';

const { smAndSmaller, largerThanSm } = getBreakpoints();

function showAddTaskEditor(): void {}
</script>
