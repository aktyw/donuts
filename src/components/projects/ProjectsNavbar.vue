<template>
  <div class="flex justify-between items-center">
    <ProjectsToggle />
    <ProjectAddButton> Add project </ProjectAddButton>
  </div>
</template>

<script setup lang="ts">
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectsToggle from '@/components/projects/ProjectsToggle.vue';
</script>
