<template>
  <li>
    <RouterLink
      v-bind="$attrs"
      class="btn btn-md lg:btn-sm bg-base-300 border-0 normal-case text-base font-normal text-base-content hover:bg-base-200 rounded outline-custom"
      :active-class="isMobile"
      :to="to">
      <div class="flex gap-2">
        <slot name="icon"></slot>
        <slot>{{ name }}</slot>
      </div>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

import { getBreakpoints } from '@/composables/useBreakpoints';

const isMobile = computed(() => {
  return smAndSmaller
    ? 'bg-base-100 text-base-content '
    : 'bg-base-300 text-base-content hover:text-base-300 focus:bg-base-300';
});

const { smAndSmaller } = getBreakpoints();

type Props = {
  to: RouteLocationRaw;
  name?: string;
};

defineProps<Props>();
</script>
