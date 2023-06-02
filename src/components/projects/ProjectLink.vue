<template>
  <RouterLink
    class="outline-custom flex items-center py-2 hover:bg-base-300"
    :to="to"
    v-bind="$attrs"
    @click="useHideMenu()">
    <TheTooltip
      v-if="!customTooltip"
      :data="name || ''"
      class="w-full">
      <div class="flex gap-2 relative">
        <slot name="icon">
          <IconColor v-bind="$attrs" />
        </slot>
        <slot name="name">{{ calcName }}</slot>
      </div>
    </TheTooltip>

    <div
      v-else
      class="flex gap-2 relative">
      <slot name="icon">
        <IconColor v-bind="$attrs" />
      </slot>

      <slot name="name">{{ calcName }}</slot>
    </div>
    <span class="absolute right-12 md:relative md:right-auto">
      <slot name="amount" />
    </span>
  </RouterLink>

  <slot name="options" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

import IconColor from '@/components/icons/IconColor.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
import { useHideMenu } from '@/composables/useHideMenu';

type Props = {
  to: RouteLocationRaw;
  name?: string;
  customTooltip?: boolean;
};

const props = defineProps<Props>();

const calcName = computed(() => {
  if (!props.name) return '';
  if (props.name.length >= 22) {
    return props.name?.slice(0, 20).concat('...');
  }

  return props.name;
});
</script>
