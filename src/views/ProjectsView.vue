import BaseHeading from '@/components/ui/BaseHeading.vue';
<template>
  <main
    class="w-full overflow-y-auto transition-all duration-300 flex flex-col justify-start items-center pb-80 py-8"
    :class="{ 'ml-80': isMenuOpen }">
    <h1 class="font-bold text-2xl">Projects</h1>
    <ProjectsNavbar />
    <ProjectsRecords :projects="activeProjects" />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import ProjectsNavbar from '@/components/projects/ProjectsNavbar.vue';
import ProjectsRecords from '@/components/projects/ProjectsRecords.vue';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const route = useRoute();
const projectsStore = useProjectsStore();
const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
const { getActiveProjects, getArchiveProjects } = storeToRefs(projectsStore);

const activeProjects = computed(() => {
  if (route.name === 'archived') {
    return getArchiveProjects.value;
  }

  return getActiveProjects.value;
});

onMounted(() => {
  console.log(activeProjects.value);
});
</script>
