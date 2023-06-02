<template>
  <main
    v-if="currentProject?.active"
    id="main">
    <TasksContainer>
      <FiltersNavbar :title="currentProject?.name ?? 'Inbox'" />
      <FilterStatus v-if="!isDefault" />
      <FiltersList :tasks="projectTasks" />
      <TasksList
        :tasks="rootProjectTasks"
        :project-tasks="projectTasks"
        :current-project="currentProject" />
      <TaskAddButton
        v-if="!isEditorActive"
        @click="showEditor" />
      <TaskEditor
        v-else
        :current-project="currentProject"
        @close-editor="closeEditor" />
    </TasksContainer>

    <EmptyMessage v-if="!activeProjectTasks.length && currentFilter === 'Active'" />
    <Teleport to="body">
      <router-view />
    </Teleport>
  </main>

  <main
    v-else
    id="main">
    <TasksContainer>
      <h2 class="pb-2.5 text-xl font-bold">{{ currentProject?.name ?? 'Inbox' }}</h2>
      <ProjectArchived :id="projectId" />
    </TasksContainer>
  </main>
</template>

<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import { storeToRefs } from 'pinia';
import { computed, provide, readonly, ref } from 'vue';

import FiltersList from '@/components/filters/FiltersList.vue';
import FiltersNavbar from '@/components/filters/FiltersNavbar.vue';
import FilterStatus from '@/components/filters/FilterStatus.vue';
import EmptyMessage from '@/components/messages/EmptyMessage.vue';
import ProjectArchived from '@/components/projects/ProjectArchived.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskAddButton from '@/components/tasks/list/TaskAddButton.vue';
import TasksList from '@/components/tasks/list/TasksList.vue';
import TasksContainer from '@/components/ui/containers/TasksContainer.vue';
import { useHandleTasks } from '@/composables/useHandleTasks';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';

const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();

const { getProjectTasks, getSortType: sortTypeStatus, getCurrentFilter: currentFilter } = storeToRefs(tasksStore);
const { getProjectById } = storeToRefs(projectsStore);

const projectId = useRouteParams<string>('id');
const projectTasks = computed(() => getProjectTasks.value(projectId.value as string));
const activeProjectTasks = computed(() => projectTasks.value.filter((task: Task) => !task.isDone));
const currentProject = computed(() => getProjectById.value((projectId.value as string) ?? 'inbox'));
const rootProjectTasks = computed(() => tasks.value.filter((task: Task) => !task.parentId));

const tasks = useHandleTasks(projectTasks);

const isEditorActive = ref(false);
const isDefault = computed(() => sortTypeStatus.value === SortFilters.Default);

provide('isEditorActive', isEditorActive);
provide('tasks', readonly(projectTasks));
provide('currentProject', readonly(currentProject));

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>
