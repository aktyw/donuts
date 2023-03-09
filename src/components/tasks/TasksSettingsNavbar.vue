<template>
  <div class="w-full flex justify-between gap-2 py-2 relative">
    <BaseHeading>
      <template #default>
        <h2 class="font-bold">Inbox</h2>
      </template>
    </BaseHeading>
    <TasksSettingsDropdown @delete-tasks="toggleDeleteModal">
      <template #btn>
        <button
          class="hover:bg-base-200 focus:bg-base-200 btn btn-square rounded-md btn-xs bg-base-100 border-0 focus:outline focus:outline-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M6.225 13.5q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062Q5.6 10.5 6.225 10.5t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Zm5.775 0q-.625 0-1.062-.438Q10.5 12.625 10.5 12t.438-1.062Q11.375 10.5 12 10.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm5.775 0q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Z" />
          </svg>
        </button>
      </template>
    </TasksSettingsDropdown>
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
import { useStoreTasks } from '@/stores/TasksStore';
import TasksSettingsDropdown from '@/components/tasks/TasksSettingsDropdown.vue';
import TaskDeleteConfirmModal from '@/components/tasks/TaskDeleteConfirmModal.vue';
import BaseHeading from '../ui/BaseHeading.vue';
import type { Task } from '@/types/models/Task';

const store = useStoreTasks();

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
}
</script>
