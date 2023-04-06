<template>
  <main class="flex flex-col justify-start items-center py-4">
    <div
      class="flex flex-col items-start max-w-2xl relative"
      :class="{ 'h-1/2': !store.tasks.default.length }">
      <FiltersNavbar :title="project?.name ?? 'Inbox'" />
      <FilterStatus v-if="!allowDrag" />
      <FiltersList
        v-if="store.tasks.default.length && !allowDrag"
        :tasks="tasks" />
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
import { ref, computed } from 'vue';
import { useTasksStore } from '@/stores/TasksStore';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import FiltersNavbar from '@/components/filters/FiltersNavbar.vue';
import FiltersList from '@/components/filters/FiltersList.vue';
import FilterStatus from '@/components/filters/FilterStatus.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import TaskAddButton from '@/components/tasks/TaskAddButton.vue';
import TaskEditor from '@/components/tasks/TaskEditor.vue';
import TasksList from '@/components/tasks/TasksList.vue';
import { SortFilters } from '@/types/models/Sort';
import { useHandleTasks } from '@/composables/useHandleTasks';

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
