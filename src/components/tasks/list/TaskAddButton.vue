<template>
  <BaseButton
    v-if="largerThanSm"
    class="btn btn-sm btn-block btn-ghost p-0 text-left normal-case justify-start fill-base-content hover:bg-transparent [&:hover>svg]:fill-neutral-content [&:hover>svg]:bg-primary [&:hover]:text-primary font-normal py-2 no-animation"
    @click.prevent="showAddTaskEditor">
    <template #icon>
      <IconAdd class="mr-2 rounded-xl transition-all duration-150" />
    </template>
    Add task
  </BaseButton>

  <BaseButton
    v-else-if="smAndSmaller"
    class="btn btn-accent btn-circle btn-lg fixed no-animation bottom-8 right-8 fill-white z-50"
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
