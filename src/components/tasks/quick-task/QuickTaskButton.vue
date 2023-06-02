<template>
  <TheTooltip data="Add task">
    <BaseButton
      class="btn-sm btn border-transparent bg-base-300 p-1 text-lg normal-case text-base-content hover:border-transparent hover:bg-base-200">
      <slot />
      <slot name="icon" />
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
</script>
