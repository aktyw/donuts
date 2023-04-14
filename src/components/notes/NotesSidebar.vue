<template>
  <TheSidebar>
    <template #links>
      <ProjectLink :to="{ name: 'noteList' }">
        <template #icon>
          <IconInbox />
        </template>
        <template #name> Notes </template>
      </ProjectLink>
      <BaseDivider></BaseDivider>
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useTasksStore } from '@/stores/TasksStore';
// import { useProjectsStore } from '@/stores/ProjectsStore';
import IconInbox from '@/components/icons/IconInbox.vue';
import TheSidebar from '@/components/layouts/TheSidebar.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import BaseDivider from '@/components/ui/BaseDivider.vue';
// const store = useTasksStore();
// const projectsStore = useProjectsStore();
// const isProjectModalOpen = ref(false);
// const { getAllProjects: projects } = storeToRefs(projectsStore);
</script>
