<template>
  <FadeTransitionMedium>
    <main
      class="flex flex-col items-center justify-start overflow-y-auto py-8 pb-20 transition-all duration-300"
      :class="{ 'ml-80': isMenuOpen && lgAndLarger }">
      <div class="flex w-4/5 max-w-[800px] flex-col items-start">
        <div class="flex w-full flex-col gap-4 border-b pb-4">
          <h1 class="text-2xl font-bold">Projects</h1>
          <ProjectsNavbar @open-project-editor="handleOpenEditor" />
        </div>
        <ProjectsRecords :projects="activeProjects" />
      </div>
      <teleport to="body">
        <ProjectModal
          v-if="isProjectModalOpen"
          modal-title="Add project"
          action-title="Add"
          @action="addProject"
          @close-editor="handleCloseEditor" />
      </teleport>
    </main>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import ProjectModal from '@/components/projects/ProjectModal.vue';
import ProjectsNavbar from '@/components/projects/ProjectsNavbar.vue';
import ProjectsRecords from '@/components/projects/ProjectsRecords.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { Project } from '@/types/models/Projects';

const { lgAndLarger } = getBreakpoints();
const route = useRoute();
const projectsStore = useProjectsStore();
const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
const { getActiveProjects, getArchiveProjects } = storeToRefs(projectsStore);
const isProjectModalOpen = ref(false);
const activeElement = useActiveElement();

const activeProjects = computed(() => {
  if (route.name === 'archived') {
    return getArchiveProjects.value;
  }

  return getActiveProjects.value;
});

function handleOpenEditor(): void {
  if (activeElement.value) {
    activeElement.value.blur();
  }
  isProjectModalOpen.value = true;
}

function handleCloseEditor(): void {
  isProjectModalOpen.value = false;
}

function addProject(project: Project): void {
  projectsStore.addProject(project);
  handleCloseEditor();
}
</script>
