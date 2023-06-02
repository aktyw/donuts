<template>
  <BaseButton
    v-if="largerThanSm"
    class="btn-ghost no-animation btn-block btn-sm btn justify-start fill-base-content p-0 py-2 text-left font-normal normal-case hover:bg-transparent [&:hover>svg]:bg-primary [&:hover>svg]:fill-primary-content [&:hover]:text-primary print:hidden opacity-90 hover:opacity-100"
    @click.prevent="showAddTaskEditor">
    <template #icon>
      <IconAdd class="fill-primary mr-2 rounded-xl transition-all duration-150" />
    </template>
    Add task
  </BaseButton>

  <BaseButton
    v-else-if="smAndSmaller"
    class="btn-primary no-animation btn-circle btn-lg btn fixed bottom-8 right-8 z-30 fill-white print:hidden"
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
