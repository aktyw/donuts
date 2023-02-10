<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div
      class="flex flex-col items-start max-w-2xl py-4"
      :class="{ 'h-1/2': !store.tasks.length }"
    >
      <form
        action=""
        class="flex lg:flex-row flex-col lg:items-start items-end lg:gap-8 gap-4"
      >
        <input
          id="taskInput"
          type="text"
          placeholder="What's on your mind?"
          class="input input-bordered md:w-96 w-80"
          v-model.trim="taskContent"
          v-focus
        />
        <BaseButton
          :disabled="!taskContent"
          @click.prevent="addTask"
          class="btn-primary"
        >
          <template #default>Add New Task</template>
        </BaseButton>
      </form>

      <TaskFilter v-if="store.tasks.length" @filter="filterTasks" />
      <ul class="md:w-96 w-80">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :taskId="task.id"
          :taskContent="task.content"
          class="border-solid border-t-2 border-base-200 last:border-solid last:border-b-2"
          @deleteTask="deleteTask"
          @click="filterTasks(currentFilter)"
        >
          <template #content>
            {{ task.content }}
          </template>
        </TaskCard>
      </ul>
    </div>
    <span v-if="!store.tasks.length" class="flex h-1/2 md:text-lg"
      >No tasks. Time for chillout...</span
    >
  </div>
  <Teleport to="body">
    <BaseAlert
      v-if="alertIsActive"
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      @undo="undoDelete"
      ><template #default>
        <span class="md:text-lg text-center md:mx-4 py-4 md:py-2 md:p-0"
          >You've deleted the task succesfully.</span
        >
      </template>
    </BaseAlert>
  </Teleport>
  
</template>

<script setup>

import { ref } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskCard from '@/components/TaskCard.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseAlert from '@/components/BaseAlert.vue';
import { vFocus } from '@/directives/vAutoFocus.js';

const store = useStoreTasks();
const currentFilter = ref('all');
const tasks = ref(store.tasks);
const taskContent = ref('');
const alertIsActive = ref(false);
const UNDO_DELETE_TIME = 4000;
const undoTimeout = ref(null);

function filterTasks(type) {
  currentFilter.value = type;
  switch (type) {
    case 'all':
      tasks.value = store.getAllTasks;
      break;
    case 'completed':
      tasks.value = store.getDoneTasks;
      break;
    case 'important':
      tasks.value = store.getImportantTasks;
      break;
    case 'not-completed':
      tasks.value = store.getNotDoneTasks;
      break;
    default:
      tasks.value = store.getAllTasks;
  }
}

function addTask() {
  store.addTask(taskContent.value);
  taskContent.value = '';
  taskInput.focus();
}

function deleteTask(task) {
  store.deleteTask(task);
  tasks.value = store.tasks;
  alertIsActive.value = true;

  undoTimeout.value = setTimeout(() => {
    alertIsActive.value = false;
  }, UNDO_DELETE_TIME);
}

function undoDelete() {
  clearTimeout(undoTimeout.value);
  alertIsActive.value = false;
  store.undoDelete(store.getDeletedTask);
  filterTasks(currentFilter.value);
}
</script>
