<template>
  <li>
    <BaseButton
      class="btn-md md:btn-sm focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent active:fill-error active:text-error"
      :class="{
        'hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content [&>svg]:hover:fill-error active:fill-error active:text-error':
          isDanger,
      }">
      <template #icon>
        <slot name="icon" />
      </template>
      <slot />
    </BaseButton>
  </li>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';

type Props = {
  isDanger?: boolean;
};
defineProps<Props>();
</script>
