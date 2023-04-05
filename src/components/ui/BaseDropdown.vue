<template>
  <div class="dropdown dropdown-bottom">
    <BaseLabel>Color</BaseLabel>
    <label
      tabindex="0"
      class="btn mt-2 w-full justify-start bg-transparent text-base-content hover:bg-transparent text-left normal-case gap-2">
      <slot name="content"></slot>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu flex flex-col flex-nowrap cursor-pointer [&>li:hover]:bg-base-200 [&>li:hover>*]:bg-base-200 [&>li>*]:transition [&>li>*]:hover:transition shadow bg-base-100 rounded-box overflow-y-auto max-h-80 w-full">
      <slot name="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24">
          <path
            d="M480.074 835.999q-108.612 0-184.342-75.657-75.731-75.657-75.731-184.268 0-108.612 75.657-184.342 75.657-75.731 184.268-75.731 108.612 0 184.342 75.657 75.731 75.657 75.731 184.268 0 108.612-75.657 184.342-75.657 75.731-184.268 75.731Z" />
        </svg>
      </slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseLabel from '@/components/ui/BaseLabel.vue';
</script>
