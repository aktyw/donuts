<template>
  <TheTooltip
    class="z-[100]"
    data="Open menu">
    <BaseButton
      class="btn btn-sm border-transparent hover:border-transparent bg-base-300 hover:bg-base-200 text-neutral-focus normal-case text-lg p-1">
      <slot />
      <slot name="icon" />
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
</script>
