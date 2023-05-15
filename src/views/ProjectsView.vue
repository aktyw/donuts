<template>
  <FadeTransitionMedium>
    <main
      class="overflow-y-auto transition-all duration-300 flex flex-col justify-start items-center pb-20 py-8"
      :class="{ 'ml-80': isMenuOpen }">
      <div class="w-2/3 max-w-[800px] flex flex-col items-start">
        <div class="flex flex-col w-full border-b gap-4 pb-4">
          <h1 class="font-bold text-2xl">Projects</h1>
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
          @close-editor="handleCloseEditor">
        </ProjectModal>
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
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { Project } from '@/types/models/Projects';

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
