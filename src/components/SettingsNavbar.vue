<template>
  <div class="w-full flex justify-end gap-2 py-2 relative">
    <TasksSettingsDropdown
      @deleteTasks="toggleDeleteModal"
      @sortTasks="handleSortTasks">
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

<script setup>
import { ref } from 'vue';
import TasksSettingsDropdown from '@/components/TasksSettingsDropdown.vue';
import TaskDeleteConfirmModal from '@/components/TaskDeleteConfirmModal.vue';
import { useStoreTasks } from '@/stores/TasksStore';

const store = useStoreTasks();

defineProps(['tasks']);
const deleteConfirm = ref(false);

function toggleDeleteModal() {
  deleteConfirm.value = !deleteConfirm.value;
}

function cancelDeleteTask() {
  toggleDeleteModal();
}

function handleDeleteAllTasks() {
  store.deleteAllTasks();
  toggleDeleteModal();
}
</script>
