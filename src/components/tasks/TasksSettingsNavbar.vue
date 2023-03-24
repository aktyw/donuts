<template>
  <div class="w-full flex justify-between gap-2 py-2 relative">
    <BaseHeading>
      <template #default>
        <h2 class="font-bold">Inbox</h2>
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
          class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold focus:outline focus:outline-1"
          @click="cancelDeleteTask">
          Cancel
        </button>
        <button
          class="btn btn-sm rounded-md capitalize font-semibold"
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
import TasksSettingsDropdown from '@/components/tasks/TasksSettingsDropdown.vue';
import TaskDeleteConfirmModal from '@/components/tasks/TaskDeleteConfirmModal.vue';
import BaseHeading from '../ui/BaseHeading.vue';
import type { Task } from '@/types/models/Task';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';

const store = useTasksStore();

defineProps<{
  tasks: Task[];
}>();

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
