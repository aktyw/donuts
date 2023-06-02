<template>
  <div class="dropdown-bottom dropdown-end dropdown">
    <div class="flex items-center">
      <StatsDropdownButton />
      <TheStats
        tabindex="1"
        class="dropdown-content menu w-72 rounded-md bg-base-100 p-2 text-sm shadow print:hidden [&>*:active]:bg-base-200 [&>*:active]:text-base-content [&>*:hover]:bg-transparent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import StatsDropdownButton from '@/components/stats/dropdown/StatsDropdownButton.vue';

const TheStats = defineAsyncComponent(() => import('@/components/stats/TheStats.vue'));
</script>
