<template>
  <TheTooltip
    class="!tooltip-top"
    data="Add project">
    <BaseButton
      aria-label="Add project"
      v-bind="$attrs"
      class="btn-ghost btn-xs p-0 border border-base-300 rounded-md hover:delay-150 outline-custom">
      <template #icon>
        <IconAdd class="fill-base-content" />
        <slot />
      </template>
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
</script>
