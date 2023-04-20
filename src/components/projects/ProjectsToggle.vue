<template>
  <div class="flex justify-around items-center w-40 h-9 bg-base-200 rounded-full">
    <ProjectToggleLink :to="{ name: 'active' }">Active</ProjectToggleLink>
    <ProjectToggleLink :to="{ name: 'archived' }">Archived</ProjectToggleLink>
  </div>
</template>

<script setup lang="ts">
import ProjectToggleLink from '@/components/projects/ProjectToggleLink.vue';
</script>
