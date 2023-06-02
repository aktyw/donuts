<template>
  <router-link :to="{ name: 'account' }">
    <TheTooltip
      class="!tooltip-top btn-xs h-full items-center flex"
      data="Open settings">
      <BaseButton
        aria-label="Open settings"
        v-bind="$attrs"
        class="btn-ghost h-full btn-xs p-0 border border-base-300 hover:delay-150 outline-custom mx-2 flex items-center gap-2 rounded-md border-none py-1 px-2 text-sm font-semibold hover:bg-base-200">
        <template #icon>
          <IconSettingsAlt class="fill-base-content" />
          <slot />
        </template>
      </BaseButton>
    </TheTooltip>
  </router-link>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconSettingsAlt from '@/components/icons/IconSettingsAlt.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
</script>
