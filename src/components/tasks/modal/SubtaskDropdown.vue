<template>
  <div
    class="cursor-pointer dropdown dropdown-bottom flex items-center w-full h-full hover:bg-base-200 transition duration-300">
    <TheTooltip
      class="!tooltip-top w-full h-full"
      data="Open sub-tasks">
      <label
        v-bind="$attrs"
        tabindex="0"
        class="flex w-full h-full justify-center items-center bg-transparent text-base-content hover:bg-transparent text-left normal-case gap-1 outline-custom cursor-pointer">
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
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
</script>
