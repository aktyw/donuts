<template>
  <main id="main">
    <div
      class="flex flex-col items-start w-2/3 max-w-[800px]"
      :class="{ 'h-1/2': !store.tasks.default.length }">
      <FiltersNavbar :title="currentProject?.name ?? 'Inbox'" />
      <FilterStatus v-if="!allowDrag" />
      <FiltersList
        v-if="!!store.tasks.default.length && !allowDrag"
        :tasks="projectTasks" />
      <TasksList :tasks="tasks" />

      <TaskAddButton
        v-if="!isEditorActive"
        @click="showEditor" />
      <TaskEditor
        v-else
        :current-project="currentProject"
        @close-editor="closeEditor" />
    </div>

    <TasksEmptyMessage v-if="!store.tasks.default.length"> No tasks. Time for chillout... </TasksEmptyMessage>
  </main>
</template>

<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import { storeToRefs } from 'pinia';
import { provide } from 'vue';
import { computed, ref } from 'vue';

import FiltersList from '@/components/filters/FiltersList.vue';
import FiltersNavbar from '@/components/filters/FiltersNavbar.vue';
import FilterStatus from '@/components/filters/FilterStatus.vue';
import TaskAddButton from '@/components/tasks/TaskAddButton.vue';
import TaskEditor from '@/components/tasks/TaskEditor.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import TasksList from '@/components/tasks/TasksList.vue';
import { useHandleTasks } from '@/composables/useHandleTasks';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';

const store = useTasksStore();
const projectsStore = useProjectsStore();
const { getProjectTasks, getSortType: sortTypeStatus } = storeToRefs(store);
const { getProjectById } = storeToRefs(projectsStore);
const projectId = useRouteParams('id');
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);
const projectTasks = computed(() => getProjectTasks.value(projectId.value as string));
const currentProject = computed(() => getProjectById.value((projectId.value as string) ?? 'inbox'));
const tasks = useHandleTasks(projectTasks);
const isEditorActive = ref(false);

provide('isEditorActive', isEditorActive);

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>
