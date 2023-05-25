<template>
  <RouterLink
    :to="to"
    class="btn btn-sm bg-base-300 text-base-content normal-case font-medium w-48 border-hidden h-9 outline-custom">
    {{ title }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

type Props = {
  to: RouteLocationRaw;
  title: string;
};

defineProps<Props>();
</script>
