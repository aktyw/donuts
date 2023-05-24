<template>
  <div class="flex h-full w-full flex-col p-4 gap-4">
    <SettingsHeader
      class="flex justify-between font-semibold"
      :name="title">
      <template #content>
        <span>Close</span>
      </template>
    </SettingsHeader>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SettingsHeader from '@/components/user/settings/content/SettingsHeader.vue';

const route = useRoute();
const title = computed(
  () => (route.name as string)[0]?.toString().toUpperCase() + route?.name?.toString().slice(1) || ''
);
</script>
