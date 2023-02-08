<template>
  <div class="dropdown md:dropdown-right dropdown-left">
    <label tabindex="0" class="btn btn-square btn-sm">. . .</label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-neutral rounded-lg w-52 space-y-2"
    >
      <li><button class="btn-md md:btn-sm">Edit Task</button></li>
      <li><button class="btn-md md:btn-sm">Add Subtask</button></li>
      <li>
        <button class="btn-md md:btn-sm" @click="handleToggleImportant(taskId)">
          Toggle Important
        </button>
      </li>
      <li>
        <button class="btn-md md:btn-sm" @click="handleToggleIsDone(taskId)">
          Toggle Done
        </button>
      </li>
      <li><button class="btn-md md:btn-sm">Set Deadline</button></li>
      <li><button class="btn-md md:btn-sm">Set Remainder</button></li>
      <li>
        <button
          class="btn-md btn-error bg-error hover:bg-error-content text-white md:btn-sm"
          @click="handleDeleteTask(taskId)"
        >
          Delete Task
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['taskId']);
const emits = defineEmits(['deleteTask', 'toggleIsImportant', 'toggleIsDone']);

function handleDeleteTask(taskId) {
  emits('deleteTask', taskId);
}

function handleToggleImportant(taskId) {
  emits('toggleIsImportant', taskId);
}

function handleToggleIsDone(taskId) {
  emits('toggleIsDone', taskId);
}
</script>
