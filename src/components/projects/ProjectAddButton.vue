<template>
  <TheTooltip
    class="!tooltip-top"
    data="Add project">
    <BaseButton
      aria-label="Add project"
      v-bind="$attrs"
      class="btn-ghost btn-xs p-0 border border-base-300 rounded-md hover:delay-150 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
      <template #icon>
        <IconAdd />
      </template>
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import IconAdd from '@/components/icons/IconAdd.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
</script>
