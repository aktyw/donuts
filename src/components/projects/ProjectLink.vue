<template>
  <li>
    <RouterLink
      class="flex items-center justify-between py-2 hover:bg-base-300"
      :to="to">
      <div class="flex gap-2">
        <slot name="icon">
          <svg
            v-bind="$attrs"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24">
            <path
              d="M480.074 835.999q-108.612 0-184.342-75.657-75.731-75.657-75.731-184.268 0-108.612 75.657-184.342 75.657-75.731 184.268-75.731 108.612 0 184.342 75.657 75.731 75.657 75.731 184.268 0 108.612-75.657 184.342-75.657 75.731-184.268 75.731Z" />
          </svg>
        </slot>
        <slot name="name">{{ name }}</slot>
      </div>
      <slot name="amount"></slot>
      <slot name="options"> </slot>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

type Props = {
  to: RouteLocationRaw;
  name?: string;
};

defineProps<Props>();
</script>
