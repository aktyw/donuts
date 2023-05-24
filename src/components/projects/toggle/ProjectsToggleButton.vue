<template>
  <TheTooltip
    class="!tooltip-top"
    data="Toggle list of projects">
    <BaseButton class="flex h-full items-center justify-center p-1 outline-custom">
      <template #icon>
        <IconChevronDown
          class="transition fill-base-content"
          :class="{ 'rotate-90': !isOpen }" />
      </template>
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

type Props = {
  isOpen: boolean;
};

defineProps<Props>();
</script>
