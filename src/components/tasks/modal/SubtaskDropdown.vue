<template>
  <div class="cursor-pointer dropdown dropdown-bottom flex items-center w-full h-full hover:bg-base-200">
    <BaseLabel>{{ labelName }}</BaseLabel>
    <TheTooltip
      class="!tooltip-top w-full h-full flex items-center"
      data="Open sub-tasks">
      <label
        v-bind="$attrs"
        tabindex="0"
        class="flex w-full justify-center bg-transparent text-base-content hover:bg-transparent text-left normal-case gap-1 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent cursor-pointer">
        <slot name="icon" />
        <slot name="content"></slot>
      </label>
    </TheTooltip>
    <ul
      tabindex="0"
      class="w-full dropdown-content menu flex flex-col flex-nowrap cursor-pointer [&>li:hover]:bg-base-200 [&>li:hover>*]:bg-base-200 [&>li>*]:transition [&>li>*]:hover:transition shadow bg-base-100 rounded-box overflow-y-auto max-h-80">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseLabel from '@/components/base/BaseLabel.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

type Props = {
  labelName?: string;
};

defineProps<Props>();
</script>
