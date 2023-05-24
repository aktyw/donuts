<template>
  <li>
    <RouterLink
      v-bind="$attrs"
      class="btn-md btn rounded border-0 bg-base-300 text-base font-normal normal-case text-base-content lg:btn-sm hover:bg-base-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      :active-class="isMobile"
      :to="to">
      <div class="flex gap-2">
        <slot name="icon"> </slot>
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
    ? 'bg-neutral text-neutral-content hover:text-neutral focus:bg-neutral'
    : 'bg-base-300 text-base-content hover:text-base-300 focus:bg-base-300';
});

const { smAndSmaller } = getBreakpoints();

type Props = {
  to: RouteLocationRaw;
  name?: string;
};

defineProps<Props>();
</script>
