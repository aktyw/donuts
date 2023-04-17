<template>
  <TheTooltip
    class="!tooltip-top"
    data="Toggle list of projects">
    <BaseButton
      class="flex h-full items-center justify-center p-1 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
      <template #icon>
        <IconChevronDown
          class="transition fill-base-content"
          :class="{ 'rotate-90': !isOpen }" />
      </template>
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

type Props = {
  isOpen: boolean;
};

defineProps<Props>();
</script>
