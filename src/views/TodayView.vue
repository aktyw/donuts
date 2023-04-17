<template>
  <main id="main">
    <div
      class="flex flex-col items-start w-2/3 max-w-[800px]"
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

    <TasksEmptyMessage v-if="!store.tasks.default.length"> No tasks. Time for chillout... </TasksEmptyMessage>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import FiltersList from '@/components/filters/FiltersList.vue';
import FiltersNavbar from '@/components/filters/FiltersNavbar.vue';
import FilterStatus from '@/components/filters/FilterStatus.vue';
import TaskAddButton from '@/components/tasks/TaskAddButton.vue';
import TaskEditor from '@/components/tasks/TaskEditor.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import TasksList from '@/components/tasks/TasksList.vue';
import { useHandleTasks } from '@/composables/useHandleTasks';
import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';
import { TASK_VIEW_TITLE } from '@/types/models/Titles';

const store = useTasksStore();
const { getSortType: sortTypeStatus, getTodayTasks: todayTasks } = storeToRefs(store);
const tasks = useHandleTasks(todayTasks);
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);
const isEditorActive = ref(false);

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>
