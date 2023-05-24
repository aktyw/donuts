<template>
  <BaseButton
    class="btn-ghost btn-xs btn rounded border border-base-300 font-normal hover:bg-base-200"
    :class="{ 'border-primary bg-base-300': isToggle }">
    <slot name="icon" />
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';

type Props = {
  isToggle?: boolean;
};

defineProps<Props>();
</script>
