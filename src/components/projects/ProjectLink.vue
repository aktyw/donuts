<template>
  <RouterLink
    class="outline-custom flex items-center py-2 hover:bg-base-300"
    :to="to"
    @click="useHideMenu()"
    v-bind="$attrs">
    <TheTooltip
      v-if="!customTooltip"
      :data="name || ''"
      class="w-full">
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
import { useHideMenu } from '@/composables/useHideMenu';

import IconColor from '@/components/icons/IconColor.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

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
