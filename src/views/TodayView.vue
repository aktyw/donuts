<template>
  <main id="main">
    <TasksContainer>
      <FiltersNavbar :title="TASK_VIEW_TITLE.TODAY" />
      <FilterStatus v-if="!isDefault" />
      <FiltersList :tasks="todayTasks" />
      <TodayTasksList :tasks="tasks" />

      <TaskAddButton
        v-if="!isEditorActive"
        @click="showEditor" />
      <TaskEditor
        v-else
        @close-editor="closeEditor" />
    </TasksContainer>

    <EmptyMessage v-if="!tasks.length" />
    <Teleport to="body">
      <router-view />
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
import TodayTasksList from '@/components/tasks/list/TodayTasksList.vue';
import TasksContainer from '@/components/ui/containers/TasksContainer.vue';
import { useHandleTasks } from '@/composables/useHandleTasks';
import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';
import { TASK_VIEW_TITLE } from '@/types/models/Titles';

const store = useTasksStore();
const { getSortType: sortTypeStatus } = storeToRefs(store);

const todayTasks = computed(() => store.getTodayTasks);
const tasks = useHandleTasks(todayTasks);

const isDefault = computed(() => sortTypeStatus.value === SortFilters.Default);
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
