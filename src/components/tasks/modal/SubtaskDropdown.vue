<template>
  <div
    class="dropdown-bottom dropdown flex h-full w-full cursor-pointer items-center transition duration-300 hover:bg-base-200">
    <TheTooltip
      class="!tooltip-top h-full w-full"
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
      class="dropdown-content menu rounded-box flex max-h-80 w-full cursor-pointer flex-col flex-nowrap overflow-y-auto bg-base-100 shadow [&>li:hover>*]:bg-base-200 [&>li:hover]:bg-base-200 [&>li>*]:transition [&>li>*]:hover:transition">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
</script>
