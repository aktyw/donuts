<template>
  <div class="dropdown-bottom dropdown-end dropdown">
    <div class="flex items-center">
      <StatsDropdownButton />
    </div>
    <TheStats
      tabindex="1"
      class="dropdown-content menu w-72 rounded-md bg-base-100 p-2 text-sm shadow print:hidden [&>*:active]:bg-base-200 [&>*:active]:text-base-content [&>*:hover]:bg-transparent" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import StatsDropdownButton from '@/components/stats/dropdown/StatsDropdownButton.vue';
import TheStats from '@/components/stats/TheStats.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const route = useRoute();
</script>
