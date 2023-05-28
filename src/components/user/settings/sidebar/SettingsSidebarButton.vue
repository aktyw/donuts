<template>
  <li class="w-full md:w-60">
    <TheTooltip
      :data="name"
      class="!tooltip-right w-full">
      <RouterLink
        active-class="bg-base-200"
        class="outline-custom flex items-center rounded-md p-2 py-2"
        :to="to"
        v-bind="$attrs">
        <BaseButton
          tabindex="-1"
          class="flex w-full gap-2 [&>svg]:fill-base-content">
          <slot name="icon"></slot>
          <slot>
            <span>{{ name }}</span>
          </slot>
        </BaseButton>
      </RouterLink>
    </TheTooltip>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

type Props = {
  to: RouteLocationRaw;
  name: string;
};

defineProps<Props>();
</script>
