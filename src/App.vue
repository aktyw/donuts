<template>
  <div>
    <BaseSkipLink />
    <TheHeader />
    <div class="flex pt-12 h-[calc(100vh-48px)]">
      <RouterView name="sidebar" />
      <RouterView class="w-full h-[calc(100vh-48px)] pt-10" />
    </div>
    <TheNotification v-if="store.notifications.length" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheNotification from '@/components/layouts/TheNotification.vue';
import { useTasksStore } from '@/stores/TasksStore';
import BaseSkipLink from '@/components/ui/BaseSkipLink.vue';

const store = useTasksStore();
</script>

<style>
body {
  overflow: hidden;
}
</style>
