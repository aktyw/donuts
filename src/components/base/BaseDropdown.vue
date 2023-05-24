<template>
  <div class="dropdown dropdown-bottom">
    <BaseLabel>{{ labelName }}</BaseLabel>
    <label
      tabindex="0"
      class="btn mt-2 w-full justify-start bg-transparent text-base-content hover:bg-transparent text-left normal-case gap-2 outline-custom">
      <slot name="icon" />
      <slot name="content"></slot>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu flex flex-col flex-nowrap cursor-pointer [&>li:hover]:bg-base-200 [&>li:hover>*]:bg-base-200 [&>li>*]:transition [&>li>*]:hover:transition shadow bg-base-100 rounded-box overflow-y-auto max-h-80 w-full">
      <slot name="list">
        <IconColor />
      </slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseLabel from '@/components/base/BaseLabel.vue';
import IconColor from '@/components/icons/IconColor.vue';

type Props = {
  labelName?: string;
};

defineProps<Props>();
</script>
