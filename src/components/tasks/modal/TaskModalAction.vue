<template>
  <TheTooltip
    class="!tooltip-top hover:bg-base-200 rounded-sm"
    :data="tooltipData">
    <BaseButton
      v-bind="$attrs"
      class="flex items-center p-0.5">
      <slot />
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

type Props = {
  tooltipData: string;
};
defineProps<Props>();
</script>
