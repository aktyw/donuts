<template>
  <div class="h-full w-full flex-col p-4">
    <header class="bg-red-200 w-full flex justify-between">
      <span>{{ title }}</span>
      <span>Close</span>
    </header>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = computed(
  () => (route.name as string)[0]?.toString().toUpperCase() + route?.name?.toString().slice(1) || ''
);
</script>
