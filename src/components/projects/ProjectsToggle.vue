<template>
  <div class="m-10 flex justify-around items-center w-44 h-10 bg-base-200 rounded-full">
    <ProjectToggleLink :to="{ name: 'active' }">Active</ProjectToggleLink>
    <ProjectToggleLink :to="{ name: 'archived' }">Archived</ProjectToggleLink>
  </div>
</template>

<script setup lang="ts">
import ProjectToggleLink from '@/components/projects/ProjectToggleLink.vue';
</script>
