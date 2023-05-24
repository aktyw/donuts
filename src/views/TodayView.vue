<template>
  <main id="main">
    <div class="flex w-2/3 max-w-[800px] flex-col items-start">
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

    <EmptyMessage v-if="!tasks.length" />
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
import EmptyMessage from '@/components/messages/EmptyMessage.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskAddButton from '@/components/tasks/list/TaskAddButton.vue';
import TasksList from '@/components/tasks/list/TasksList.vue';
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
provide('currentProject', undefined);

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>
