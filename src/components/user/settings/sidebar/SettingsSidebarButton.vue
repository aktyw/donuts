<template>
  <li class="w-60">
    <RouterLink
      active-class="bg-base-200"
      class="flex items-center rounded-md p-2 py-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      :to="to"
      v-bind="$attrs">
      <TheTooltip
        :data="name"
        class="w-full">
        <div class="flex gap-2 [&>svg]:fill-base-content">
          <slot name="icon"></slot>
          <slot
            ><span>{{ name }}</span>
          </slot>
        </div>
      </TheTooltip>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

import TheTooltip from '@/components/tooltips/TheTooltip.vue';

type Props = {
  to: RouteLocationRaw;
  name: string;
};

defineProps<Props>();
</script>
