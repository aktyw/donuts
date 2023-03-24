<template>
  <TheHeader />
  <RouterView name="sidebar" />
  <RouterView />
  <TheNotification v-if="store.notifications.length" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheNotification from '@/components/layouts/TheNotification.vue';
import { useTasksStore } from '@/stores/TasksStore';

const store = useTasksStore();
</script>
