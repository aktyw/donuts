<template>
  <BaseButton
    class="flex h-full items-center justify-center p-1 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
    <template #icon>
      <IconChevronDown
        class="transition fill-base-content"
        :class="{ 'rotate-90': !isOpen }" />
    </template>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';

type Props = {
  isOpen: boolean;
};

defineProps<Props>();
</script>
