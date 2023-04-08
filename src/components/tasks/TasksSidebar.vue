<template>
  <TheSidebar>
    <template #links>
      <ProjectLink :to="{ name: 'project', params: { id: 'inbox' } }">
        <template #icon>
          <IconInbox />
        </template>
        <template #name> Inbox </template>
        <template #amount>
          <span>{{ store.getAllTasks.length }}</span>
        </template>
      </ProjectLink>
      <ProjectLink :to="{ name: 'today' }">
        <template #icon>
          <IconCalendarToday />
        </template>
        <template #name> Today </template>
        <template #amount>
          <span>{{ store.getTodayTasks.length }}</span>
        </template>
      </ProjectLink>
      <BaseDivider></BaseDivider>
      <div>
        <ProjectAccordion @open-project-editor="handleOpenEditor">
          <template #project-links>
            <ProjectLink
              v-for="{ id, name, color } in projects"
              :key="id"
              :to="{ name: 'project', params: { id: id } }"
              :name="name"
              :fill="color">
              {{ name }}
            </ProjectLink>
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

const store = useTasksStore();
const projectsStore = useProjectsStore();
const isProjectModalOpen = ref(false);
const { getProjects: projects } = storeToRefs(projectsStore);

function handleOpenEditor(): void {
  isProjectModalOpen.value = true;
}

function handleCloseEditor(): void {
  isProjectModalOpen.value = false;
}
</script>
