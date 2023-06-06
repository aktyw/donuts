<template>
  <div
    class="relative flex w-full justify-between gap-2 fill-base-content pb-2 [&>button:hover]:bg-base-300 [&>button:hover]:fill-base-content [&>button]:rounded [&>button]:p-0.5">
    <BaseHeading>
      <h2 class="text-xl font-bold">
        {{ title }}
        <span
          v-if="title === TASK_VIEW_TITLE.TODAY"
          class="text-sm font-normal">
          {{ formattedDate }}
        </span>
      </h2>
    </BaseHeading>
    <FiltersDropdown @delete-tasks="handleDeleteTasksAndSetProject"></FiltersDropdown>
    <ModalConfirmDelete
      v-if="deleteAllConfirm"
      :is-danger="true"
      @cancel="hideDeleteModals"
      @action="handleDeleteAllTasks">
      Delete task
      <template #content>
        <p>Do you really want to delete all tasks ?</p>
      </template>
    </ModalConfirmDelete>
    <ModalConfirmDelete
      v-if="deleteCompletedConfirm"
      :is-danger="true"
      @cancel="hideDeleteModals"
      @action="handleDeleteCompletedTasks">
      Delete completed task
      <template #content>
        <p>Do you really want to delete all completed tasks ?</p>
      </template>
    </ModalConfirmDelete>
  </div>
</template>

<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import { type Ref, ref } from 'vue';

import BaseHeading from '@/components/base/BaseHeading.vue';
import type { FilterModal } from '@/components/filters/FiltersDropdown.vue';
import FiltersDropdown from '@/components/filters/FiltersDropdown.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import { useTasksStore } from '@/stores/TasksStore';
import type { Project } from '@/types/models/Projects';
import { TASK_VIEW_TITLE } from '@/types/models/Titles';

const currentProject: Ref<Project | undefined> = ref();
const store = useTasksStore();

defineProps<{
  title: string;
  titleDate?: string | Date;
}>();

function handleDeleteTasksAndSetProject(modal: FilterModal, project?: Project) {
  console.log(modal, project);
  currentProject.value = project;

  showDeleteModal(modal);
}

const formattedDate = useDateFormat(useNow(), 'ddd DD MMM', { locales: 'en-US' });

const deleteAllConfirm = ref(false);
const deleteCompletedConfirm = ref(false);

function showDeleteModal(modal: FilterModal): void {
  if (modal === 'all') {
    deleteAllConfirm.value = true;
  } else if (modal === 'completed') {
    deleteCompletedConfirm.value = true;
  }
}

function hideDeleteModals(): void {
  deleteAllConfirm.value = false;
  deleteCompletedConfirm.value = false;
}

function handleDeleteAllTasks(): void {
  store.deleteAllProjectTasks(currentProject?.value?.id);
  hideDeleteModals();
}

function handleDeleteCompletedTasks(): void {
  store.deleteAllCompletedProjectTasks(currentProject?.value?.id);
  hideDeleteModals();
}
</script>
