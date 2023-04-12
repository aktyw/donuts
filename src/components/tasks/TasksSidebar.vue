<template>
  <TheSidebar ref="sidebar">
    <template #links>
      <TheTooltip
        :is="'li'"
        class="tooltip-right"
        data="Go to Inbox">
        <template #default>
          <ProjectLink :to="{ name: 'project', params: { id: 'inbox' } }">
            <template #icon>
              <IconInbox />
            </template>
            <template #name> Inbox </template>
            <template #amount>
              <span>{{ store.getProjectTasks('inbox').length }}</span>
            </template>
          </ProjectLink>
        </template>
      </TheTooltip>

      <TheTooltip
        :is="'li'"
        class="tooltip-right"
        data="Go to Today">
        <template #default>
          <ProjectLink :to="{ name: 'today' }">
            <template #icon>
              <IconCalendarToday />
            </template>
            <template #name> Today </template>
            <template #amount>
              <span>{{ store.getTodayTasks.length }}</span>
            </template>
          </ProjectLink>
        </template>
      </TheTooltip>

      <BaseDivider></BaseDivider>

      <div>
        <ProjectAccordion
          :class="{ 'collapse-open': isProjectFocus }"
          @open-project-editor="handleOpenEditor">
          <template #project-links>
            <li
              v-for="{ id, name, color } in projects"
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
        <teleport to="body">
          <ProjectEditor
            v-if="isProjectModalOpen"
            @close-editor="handleCloseEditor">
          </ProjectEditor>
        </teleport>
      </div>
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/TasksStore';
import { useProjectsStore } from '@/stores/ProjectsStore';
import TheSidebar from '@/components/layouts/TheSidebar.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectEditor from '@/components/projects/ProjectEditor.vue';
import BaseDivider from '@/components/ui/BaseDivider.vue';
import ProjectAccordion from '@/components/projects/ProjectAccordion.vue';
import IconCalendarToday from '@/components/icons/IconCalendarToday.vue';
import IconInbox from '@/components/icons/IconInbox.vue';
import ProjectOptions from '@/components/projects/ProjectOptions.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import { useActiveElement } from '@vueuse/core';

const activeElement = useActiveElement();
const store = useTasksStore();
const projectsStore = useProjectsStore();
const isProjectModalOpen = ref(false);
const isProjectFocus = ref(false);
const isOpen = ref(false);
const sidebar = ref();
const showId = ref();
const { getProjects: projects } = storeToRefs(projectsStore);

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
</script>
