<template>
  <RouterLink
    class="flex items-center py-2 hover:bg-base-300 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
    :to="to"
    v-bind="$attrs">
    <TheTooltip
      v-if="!customTooltip"
      :data="name || ''">
      <div class="flex gap-2">
        <slot name="icon">
          <IconColor v-bind="$attrs" />
        </slot>

        <slot name="name">{{ calcName }}</slot>
      </div>

      <slot name="amount"></slot>
    </TheTooltip>

    <div
      v-else
      class="flex gap-2">
      <slot name="icon">
        <IconColor v-bind="$attrs" />
      </slot>

      <slot name="name">{{ calcName }}</slot>
    </div>

    <slot name="amount"></slot>
  </RouterLink>

  <slot name="options"></slot>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

import IconColor from '@/components/icons/IconColor.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

type Props = {
  to: RouteLocationRaw;
  name?: string;
  customTooltip?: boolean;
};

const props = defineProps<Props>();

const calcName = computed(() => {
  if (props.name.length >= 26) {
    return props.name?.slice(0, 26).concat('...');
  }

  return props.name;
});
</script>
