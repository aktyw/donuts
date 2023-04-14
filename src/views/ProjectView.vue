<template>
  <main id="main">
    <div
      class="flex flex-col items-start w-2/3 max-w-[800px]"
      :class="{ 'h-1/2': !store.tasks.default.length }">
      <FiltersNavbar :title="project?.name ?? 'Inbox'" />
      <FilterStatus v-if="!allowDrag" />
      <FiltersList
        v-if="store.tasks.default.length && !allowDrag"
        :tasks="projectTasks" />
      <TasksList :tasks="tasks" />

      <TaskAddButton
        v-if="!isEditorActive"
        @click="showEditor" />
      <TaskEditor
        v-else
        @close-editor="closeEditor" />
    </div>

    <TasksEmptyMessage v-if="!store.tasks.default.length">
      <template #default> No tasks. Time for chillout... </template>
    </TasksEmptyMessage>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

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

const route = useRoute();
const projectId = computed(() => route.params.id as string);
const store = useTasksStore();
const projectsStore = useProjectsStore();
const { getProjectTasks, getSortType: sortTypeStatus } = storeToRefs(store);
const { getProjectById } = storeToRefs(projectsStore);
const project = computed(() => getProjectById.value(projectId.value));
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);
const projectTasks = computed(() => getProjectTasks.value(projectId.value));

const tasks = useHandleTasks(projectTasks);

const isEditorActive = ref(false);

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>
