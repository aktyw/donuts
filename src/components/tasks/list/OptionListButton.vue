<template>
  <li>
    <BaseButton
      class="btn-md md:btn-sm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent active:fill-error active:text-error"
      :class="{
        'fill-base-content hover:fill-error hover:text-error focus:fill-error focus:text-error active:fill-error active:text-error [&>svg]:hover:fill-error':
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
