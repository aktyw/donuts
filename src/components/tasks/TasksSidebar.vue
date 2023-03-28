<template>
  <TheSidebar>
    <template #links>
      <li>
        <router-link to="/tasks/inbox"
          >Inbox <span>{{ store.getAllTasks.length }}</span></router-link
        >
      </li>
      <li>
        <router-link to="/tasks/today"
          >Today <span>{{ store.getTodayTasks.length }}</span></router-link
        >
      </li>
    </template>
    <template #projects>
      <router-link to="/tasks/project/123">Project 123</router-link>
      <router-link to="/tasks/project/456">Project 456</router-link>
      <router-link to="/tasks/project/789">Project 789</router-link>
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/TasksStore';
import TheSidebar from '@/components/layouts/TheSidebar.vue';

const store = useTasksStore();
</script>
