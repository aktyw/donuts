<template>
  <TheTooltip
    class="!tooltip-top rounded-sm hover:bg-base-200"
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
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';

type Props = {
  tooltipData: string;
};
defineProps<Props>();
</script>
