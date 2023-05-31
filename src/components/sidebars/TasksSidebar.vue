<template>
  <TheSidebar ref="sidebar ">
    <template #links>
      <TheTooltip
        :is="'li'"
        data="Go to Inbox">
        <ProjectLink
          :custom-tooltip="true"
          class="fill-primary"
          :to="{ name: 'project', params: { id: 'inbox' } }">
          <template #icon>
            <IconInbox />
          </template>
          <template #name>Inbox</template>
          <template #amount>
            <span>{{ store.getProjectTasks('inbox').length }}</span>
          </template>
        </ProjectLink>
      </TheTooltip>

      <TheTooltip
        :is="'li'"
        class="!tooltip-center"
        data="Go to Today">
        <ProjectLink
          :custom-tooltip="true"
          class="fill-primary"
          :to="{ name: 'today' }">
          <template #icon>
            <IconCalendarToday />
          </template>
          <template #name>Today</template>
          <template #amount>
            <span>{{ store.getTodayTasks.length }}</span>
          </template>
        </ProjectLink>
      </TheTooltip>

      <BaseDivider></BaseDivider>

      <div
        v-if="!!favActiveProjects.length"
        class="pb-4">
        <ProjectAccordion
          id="favorites"
          title="Favorites"
          :is-project-open="isProjectListOpen.favorites"
          :class="{ 'collapse-open': isProjectFocus }"
          @set-project-list-toggle="setProjectList">
          <template #project-links>
            <li
              v-for="{ id, name, color } in favActiveProjects"
              :key="id">
              <ProjectLink
                :to="{ name: 'project', params: { id: id } }"
                :name="name"
                :fill="color">
                {{ name }}
                <template #options>
                  <span class="absolute -top-1 right-0 bg-transparent">
                    <ProjectOptions
                      :id="id"
                      :is-favorites="true" />
                  </span>
                </template>
              </ProjectLink>
            </li>
          </template>
        </ProjectAccordion>
      </div>

      <div>
        <ProjectAccordion
          id="projects"
          route-name="projects"
          title="Projects"
          :is-project-open="isProjectListOpen.projects"
          :class="{ 'collapse-open': isProjectFocus }"
          @set-project-list-toggle="setProjectList"
          @open-project-editor="handleOpenEditor">
          <template #project-links>
            <li
              v-for="{ id, name, color } in activeProjects"
              :key="id"
              class="[&>*>*>button]:opacity-0 [&>*>*>button]:hover:opacity-100 [&>*>*>button:focus]:opacity-100">
              <ProjectLink
                :to="{ name: 'project', params: { id: id } }"
                :name="name"
                :fill="color">
                <template #options>
                  <span class="absolute -top-1 right-0 bg-transparent">
                    <ProjectOptions :id="id" />
                  </span>
                </template>
              </ProjectLink>
            </li>
          </template>
        </ProjectAccordion>
      </div>
      <teleport to="body">
        <ProjectModal
          v-if="isProjectModalOpen"
          modal-title="Add project"
          action-title="Add"
          @action="addProject"
          @close-editor="handleCloseEditor"></ProjectModal>
      </teleport>
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import BaseDivider from '@/components/base/BaseDivider.vue';
import IconCalendarToday from '@/components/icons/IconCalendarToday.vue';
import IconInbox from '@/components/icons/IconInbox.vue';
import ProjectAccordion from '@/components/projects/ProjectAccordion.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectModal from '@/components/projects/ProjectModal.vue';
import ProjectOptions from '@/components/projects/ProjectOptions.vue';
import TheSidebar from '@/components/sidebars/TheSidebar.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import { useHideMenu } from '@/composables/useHideMenu';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Project } from '@/types/models/Projects';

const store = useTasksStore();
const settingsStore = useSettingsStore();
const projectsStore = useProjectsStore();
const activeElement = useActiveElement();
const isProjectModalOpen = ref(false);
const isProjectFocus = ref(false);
const isOpen = ref(false);
const sidebar = ref();
const showId = ref();
const { getActiveProjects: activeProjects, getActiveFavoriteProjects: favActiveProjects } = storeToRefs(projectsStore);

const { getProjectListState: isProjectListOpen } = storeToRefs(settingsStore);

function handleOpenEditor(): void {
  if (activeElement.value) {
    activeElement.value.blur();
  }
  isProjectModalOpen.value = true;
}

function handleCloseEditor(): void {
  isProjectModalOpen.value = false;
}

function handleShowOptions(id: string): void {
  if (isOpen.value) return;
  showId.value = id;
}

function handleHideOptions(): void {
  if (!isOpen.value) {
    showId.value = null;
  }
}

function addProject(project: Project): void {
  projectsStore.addProject(project);
  handleCloseEditor();
  useHideMenu();
}

function setProjectList(payload: { id: 'favorites' | 'projects'; currentValue: boolean }): void {
  settingsStore.setProjectListState({ id: payload.id, value: !payload.currentValue });
}
</script>
