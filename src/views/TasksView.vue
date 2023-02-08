<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div
      class="flex flex-col items-start max-w-2xl py-4 gap-2 lg:gap-2"
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
        <BaseButton :disabled="!taskContent" @click.prevent="addTask">
          <template #default>Add New Task</template>
        </BaseButton>
      </form>

      <TaskFilter v-if="store.tasks.length" @filter="filterTasks" />
      <ul class="md:w-96 w-80">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          class="even:bg-base-200"
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
</template>

<script setup>
import { ref } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskCard from '@/components/TaskCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import { vFocus } from '@/directives/vAutoFocus.js';
import TaskFilter from '@/components/TaskFilter.vue';

const store = useStoreTasks();
const currentFilter = ref('all');
const tasks = ref(store.tasks);
const taskContent = ref('');

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
  // if (type === ) {

  // }
  // if (type === 'completed') {
  //   tasks.value = store.getDoneTasks;
  // }
  // if (type === 'important') {
  //   tasks.value = store.getImportantTasks;
  // }
  // if (type === 'not-completed') {
  //   tasks.value = store.getNotDoneTasks;
  // }
}

function addTask() {
  store.addTask(taskContent.value);
  taskContent.value = '';
  taskInput.focus();
}

function deleteTask(task) {
  store.deleteTask(task);
  tasks.value = store.tasks;
}
</script>
