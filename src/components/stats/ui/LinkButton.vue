<template>
  <RouterLink
    v-bind="$attrs"
    class="outline-custom text-primary hover:underline transition"
    :to="to">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

type Props = {
  to: RouteLocationRaw;
  name?: string;
};

defineProps<Props>();
</script>
