<template>
  <BaseButton
    v-if="largerThanSm"
    class="btn-ghost no-animation btn-block btn-sm btn justify-start fill-base-content p-0 py-2 text-left font-normal normal-case hover:bg-transparent [&:hover>svg]:bg-primary [&:hover>svg]:fill-neutral-content [&:hover]:text-primary"
    @click.prevent="showAddTaskEditor">
    <template #icon>
      <IconAdd class="mr-2 rounded-xl transition-all duration-150" />
    </template>
    Add task
  </BaseButton>

  <BaseButton
    v-else-if="smAndSmaller"
    class="btn-accent no-animation btn-circle btn-lg btn fixed bottom-8 right-8 z-30 fill-white"
    @click.prevent="showAddTaskEditor">
    <template #icon>
      <IconAddBig />
    </template>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconAddBig from '@/components/icons/IconAddBig.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';

const { smAndSmaller, largerThanSm } = getBreakpoints();

function showAddTaskEditor(): void {}
</script>
