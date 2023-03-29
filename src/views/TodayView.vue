<template>
  <main class="flex flex-col justify-start items-center full-h py-4">
    <div
      class="flex flex-col items-start max-w-2xl relative"
      :class="{ 'h-1/2': !store.tasks.default.length }">
      <FiltersNavbar :title="TASK_VIEW_TITLE.TODAY" />
      <FilterStatus v-if="!allowDrag" />
      <FiltersList
        v-if="store.tasks.default.length && !allowDrag"
        :tasks="todayTasks" />

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
import { storeToRefs } from 'pinia';
import FiltersNavbar from '@/components/tasks/FiltersNavbar.vue';
import FiltersList from '@/components/tasks/FiltersList.vue';
import FilterStatus from '@/components/tasks/FilterStatus.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import TaskAddButton from '@/components/tasks/TaskAddButton.vue';
import TaskEditor from '@/components/tasks/TaskEditor.vue';
import TasksList from '@/components/tasks/TasksList.vue';
import { SortFilters } from '@/types/models/Sort';
import { TASK_VIEW_TITLE } from '@/types/models/Titles';
import { useHandleTasks } from '@/composables/useHandleTasks';

const store = useTasksStore();

const { getSortType: sortTypeStatus, getTodayTasks: todayTasks } = storeToRefs(store);

const tasks = useHandleTasks(todayTasks);

const isEditorActive = ref(false);
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>