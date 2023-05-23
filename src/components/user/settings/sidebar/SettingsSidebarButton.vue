<template>
  <li>
    <RouterLink
      class="flex items-center py-2 hover:bg-base-300 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
      :to="to"
      v-bind="$attrs">
      <TheTooltip
        :data="name"
        class="w-full">
        <div class="flex gap-2">
          <slot name="icon">
            <IconColor v-bind="$attrs" />
          </slot>
          <slot />
        </div>
      </TheTooltip>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

import IconColor from '@/components/icons/IconColor.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

type Props = {
  to: RouteLocationRaw;
  name: string;
};

defineProps<Props>();
</script>
