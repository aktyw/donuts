<template>
  <main
    v-if="currentProject?.active"
    id="main">
    <div class="flex flex-col items-start w-2/3 max-w-[800px]">
      <FiltersNavbar :title="currentProject?.name ?? 'Inbox'" />
      <FilterStatus v-if="!allowDrag" />
      <FiltersList
        v-if="!!store.tasks.default.length && !allowDrag"
        :tasks="projectTasks" />
      <TasksList :tasks="rootProjectTasks" />
      <TaskAddButton
        v-if="!isEditorActive"
        @click="showEditor" />
      <TaskEditor
        v-else
        :current-project="currentProject"
        @close-editor="closeEditor" />
    </div>

    <EmptyMessage v-if="!projectTasks.length" />
    <Teleport to="body">
      <router-view></router-view>
    </Teleport>
  </main>

  <main
    v-else
    id="main">
    <div class="flex flex-col items-start w-2/3 max-w-[800px]">
      <h2 class="font-bold text-xl pb-2.5">{{ currentProject?.name ?? 'Inbox' }}</h2>
      <ProjectArchived :id="projectId" />
    </div>
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
import { useHandleTasks } from '@/composables/useHandleTasks';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';

const store = useTasksStore();
const projectsStore = useProjectsStore();
const { getProjectTasks, getSortType: sortTypeStatus } = storeToRefs(store);
const { getProjectById } = storeToRefs(projectsStore);
const projectId = useRouteParams<string>('id');
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);
const projectTasks = computed(() => getProjectTasks.value(projectId.value as string));
const currentProject = computed(() => getProjectById.value((projectId.value as string) ?? 'inbox'));
const tasks = useHandleTasks(projectTasks);
const rootProjectTasks = computed(() => tasks.value.filter((task: Task) => !task.parentId));
const isEditorActive = ref(false);

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
