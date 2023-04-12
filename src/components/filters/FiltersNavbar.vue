<template>
  <div
    class="w-full flex justify-between gap-2 pb-2 relative fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded">
    <BaseHeading>
      <template #default>
        <h2 class="font-bold text-xl">
          {{ title }}
          <span
            v-if="title === TASK_VIEW_TITLE.TODAY"
            class="font-normal text-sm"
            >{{ formattedDate }}</span
          >
        </h2>
      </template>
    </BaseHeading>
    <TasksSettingsDropdown @delete-tasks="toggleDeleteModal"></TasksSettingsDropdown>
    <TaskDeleteConfirmModal
      v-if="deleteConfirm"
      :title="'Delete task'">
      <template #content>
        <p>Do you really want to delete all tasks ?</p>
      </template>
      <template #action>
        <button
          class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
          @click="cancelDeleteTask">
          Cancel
        </button>
        <button
          class="btn btn-sm rounded-md capitalize font-semibold focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
          @click="handleDeleteAllTasks">
          Delete
        </button>
      </template>
    </TaskDeleteConfirmModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTasksStore } from '@/stores/TasksStore';
import TasksSettingsDropdown from '@/components/filters/FiltersDropdown.vue';
import TaskDeleteConfirmModal from '@/components/tasks/TaskDeleteConfirmModal.vue';
import BaseHeading from '@/components/ui/BaseHeading.vue';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';
import { useNow, useDateFormat } from '@vueuse/core';
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
  useNotification(NotificationMessage.AllTasksDelete);
}
</script>
