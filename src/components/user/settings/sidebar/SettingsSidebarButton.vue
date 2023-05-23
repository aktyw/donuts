<template>
  <li class="[&.router-link-exact-active]:bg-base-200 w-60">
    <RouterLink
      active-class="bg-base-200"
      class="flex items-center py-2 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent rounded-md p-2"
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
