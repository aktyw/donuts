<template>
  <TheSidebar ref="sidebar">
    <template #links>
      <TheTooltip
        :is="'li'"
        class="tooltip-right"
        data="Go to Inbox">
        <ProjectLink :to="{ name: 'project', params: { id: 'inbox' } }">
          <template #icon>
            <IconInbox />
          </template>
          <template #name> Inbox </template>
          <template #amount>
            <span>{{ store.getProjectTasks('inbox').length }}</span>
          </template>
        </ProjectLink>
      </TheTooltip>

      <TheTooltip
        :is="'li'"
        class="tooltip-right"
        data="Go to Today">
        <ProjectLink :to="{ name: 'today' }">
          <template #icon>
            <IconCalendarToday />
          </template>
          <template #name> Today </template>
          <template #amount>
            <span>{{ store.getTodayTasks.length }}</span>
          </template>
        </ProjectLink>
      </TheTooltip>

      <BaseDivider></BaseDivider>

      <div
        v-if="favActiveProjects.length"
        class="pb-4">
        <ProjectAccordion
          :title="'Favorites'"
          :class="{ 'collapse-open': isProjectFocus }"
          @open-project-editor="handleOpenEditor">
          <template #project-links>
            <li
              v-for="{ id, name, color } in favActiveProjects"
              :key="id"
              @focusin="handleShowOptions(id)"
              @mouseover="handleShowOptions(id)"
              @mouseleave="handleHideOptions">
              <ProjectLink
                :to="{ name: 'project', params: { id: id } }"
                :name="name"
                :fill="color">
                {{ name }}
                <template #options>
                  <span class="absolute right-0 -top-1 bg-transparent">
                    <ProjectOptions
                      v-show="showId === id"
                      :id="id" />
                  </span>
                </template>
              </ProjectLink>
            </li>
          </template>
        </ProjectAccordion>
      </div>

      <div>
        <ProjectAccordion
          :title="'Projects'"
          :class="{ 'collapse-open': isProjectFocus }"
          @open-project-editor="handleOpenEditor">
          <template #project-links>
            <li
              v-for="{ id, name, color } in activeProjects"
              :key="id"
              @focusin="handleShowOptions(id)"
              @mouseover="handleShowOptions(id)"
              @mouseleave="handleHideOptions">
              <ProjectLink
                :to="{ name: 'project', params: { id: id } }"
                :name="name"
                :fill="color">
                {{ name }}
                <template #options>
                  <span class="absolute right-0 -top-1 bg-transparent">
                    <ProjectOptions
                      v-show="showId === id"
                      :id="id" />
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
          @close-editor="handleCloseEditor">
        </ProjectModal>
      </teleport>
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import IconCalendarToday from '@/components/icons/IconCalendarToday.vue';
import IconInbox from '@/components/icons/IconInbox.vue';
import TheSidebar from '@/components/layouts/TheSidebar.vue';
import ProjectAccordion from '@/components/projects/ProjectAccordion.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectModal from '@/components/projects/ProjectModal.vue';
import ProjectOptions from '@/components/projects/ProjectOptions.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import BaseDivider from '@/components/ui/BaseDivider.vue';
import { useNotification } from '@/composables/useNotification';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import type { Project } from '@/types/models/Projects';

const activeElement = useActiveElement();
const store = useTasksStore();
const projectsStore = useProjectsStore();
const isProjectModalOpen = ref(false);
const isProjectFocus = ref(false);
const isOpen = ref(false);
const sidebar = ref();
const showId = ref();
const { getActiveProjects: activeProjects, getActiveFavoriteProjects: favActiveProjects } = storeToRefs(projectsStore);

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
  useNotification(NotificationMessage.AddProject);
  handleCloseEditor();
}
</script>
