<template>
  <TheSidebar>
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
              @focusin="isProjectFocus = true"
              @focusout="isProjectFocus = false">
              <ProjectLink
                :to="{ name: 'project', params: { id: id } }"
                :name="name"
                :fill="color">
                {{ name }}
                <template #options>
                  <span class="absolute right-1 top-2">
                    <ProjectOptions :id="id" />
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

const store = useTasksStore();
const projectsStore = useProjectsStore();
const isProjectModalOpen = ref(false);
const isProjectFocus = ref(false);
const { getProjects: projects } = storeToRefs(projectsStore);

function handleOpenEditor(): void {
  const activeElement = document.activeElement as HTMLElement;

  if (activeElement) {
    activeElement.blur();
  }
  isProjectModalOpen.value = true;
}

function handleCloseEditor(): void {
  isProjectModalOpen.value = false;
}
</script>
