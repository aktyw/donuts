<template>
  <TheTooltip
    tabindex="1"
    class="!tooltip-top !tooltip-left"
    data="Toggle list of projects">
    <BaseButton
      tabindex="0"
      class="flex h-full items-center justify-center p-1 outline-custom">
      <template #icon>
        <IconChevronDown
          class="fill-base-content transition"
          :class="{ 'rotate-90': !isOpen }" />
      </template>
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';

type Props = {
  isOpen: boolean;
};

defineProps<Props>();
</script>
