<template>
  <div class="dropdown-bottom dropdown">
    <BaseLabel>{{ labelName }}</BaseLabel>
    <label
      tabindex="0"
      class="btn mt-2 w-full justify-start bg-transparent text-base-content hover:bg-transparent text-left normal-case gap-2 outline-custom">
      <slot name="icon" />
      <slot name="content" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu rounded-box flex max-h-80 w-full cursor-pointer flex-col flex-nowrap overflow-y-auto bg-base-100 shadow [&>li:hover>*]:bg-base-200 [&>li:hover]:bg-base-200 [&>li>*]:transition [&>li>*]:hover:transition !fixed !-top-20 !left-0 md:!absolute md:!top-auto">
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
