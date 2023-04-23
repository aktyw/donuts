<template>
  <div
    class="w-full flex justify-between gap-2 pb-2 relative fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded">
    <BaseHeading>
      <h2 class="font-bold text-xl">
        {{ title }}
        <span
          v-if="title === TASK_VIEW_TITLE.TODAY"
          class="font-normal text-sm"
          >{{ formattedDate }}</span
        >
      </h2>
    </BaseHeading>
    <FiltersDropdown @delete-tasks="toggleDeleteModal"></FiltersDropdown>
    <ModalConfirmDelete
      v-if="deleteConfirm"
      :is-danger="true"
      @cancel="cancelDeleteTask"
      @action="handleDeleteAllTasks">
      Delete task
      <template #content>
        <p>Do you really want to delete all tasks ?</p>
      </template>
    </ModalConfirmDelete>
  </div>
</template>

<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import { ref } from 'vue';

import BaseHeading from '@/components/base/BaseHeading.vue';
import FiltersDropdown from '@/components/filters/FiltersDropdown.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import { useTasksStore } from '@/stores/TasksStore';
import { TASK_VIEW_TITLE } from '@/types/models/Titles';

const store = useTasksStore();

defineProps<{
  title: string;
  titleDate?: string | Date;
}>();

const formattedDate = useDateFormat(useNow(), 'ddd DD MMM', { locales: 'en-US' });

const deleteConfirm = ref(false);

function toggleDeleteModal(): void {
  deleteConfirm.value = !deleteConfirm.value;
}

function cancelDeleteTask(): void {
  toggleDeleteModal();
}

function handleDeleteAllTasks(): void {
  store.deleteAllTasks();
  toggleDeleteModal();
}
</script>
