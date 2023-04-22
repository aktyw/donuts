<template>
  <BaseButton
    class="btn btn-xs btn-ghost rounded border border-base-300 hover:bg-base-200 font-normal"
    :class="{ 'bg-base-300 border-primary': isToggle }">
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
