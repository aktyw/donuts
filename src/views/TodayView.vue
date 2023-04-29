<template>
  <main id="main">
    <div
      class="flex flex-col items-start w-2/3 max-w-[800px]"
      :class="{ 'h-1/2': !store.tasks.default.length }">
      <FiltersNavbar :title="TASK_VIEW_TITLE.TODAY" />
      <FilterStatus v-if="!allowDrag" />
      <FiltersList
        v-if="!!store.tasks.default.length && !allowDrag"
        :tasks="tasks" />
      <TasksList
        :tasks="tasks"
        :is-timeline="true" />

      <TaskAddButton
        v-if="!isEditorActive"
        @click="showEditor" />
      <TaskEditor
        v-else
        @close-editor="closeEditor" />
    </div>

    <TasksEmptyMessage v-if="!store.tasks.default.length"> No tasks. Time for chillout... </TasksEmptyMessage>
    <Teleport to="body">
      <router-view></router-view>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, provide, readonly, ref } from 'vue';

import FiltersList from '@/components/filters/FiltersList.vue';
import FiltersNavbar from '@/components/filters/FiltersNavbar.vue';
import FilterStatus from '@/components/filters/FilterStatus.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskAddButton from '@/components/tasks/list/TaskAddButton.vue';
import TasksList from '@/components/tasks/list/TasksList.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import { useHandleTasks } from '@/composables/useHandleTasks';
import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';
import { TASK_VIEW_TITLE } from '@/types/models/Titles';

const store = useTasksStore();
const { getSortType: sortTypeStatus } = storeToRefs(store);
const todayTasks = computed(() => store.getTodayTasks);
const tasks = useHandleTasks(todayTasks);
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);
const isEditorActive = ref(false);

provide('isEditorActive', isEditorActive);
provide('tasks', readonly(todayTasks));

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>
