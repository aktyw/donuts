<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div class="flex flex-col items-start max-w-2xl py-4 gap-2 lg:gap-2" :class="{'h-1/2': !tasks.length}">
      <form
        action=""
        class="flex lg:flex-row flex-col lg:items-start items-end lg:gap-8 gap-4"
      >
        <input
          id="taskInput"
          type="text"
          placeholder="What's on your mind?"
          class="input input-bordered md:w-96 w-80"
          v-model="taskContent"
          v-focus
        />
        <BaseButton :disabled="!taskContent" @click.prevent="addTask">
          <template #default>Add New Task</template>
        </BaseButton>
      </form>
      <TaskFilter v-if="tasks.length" />
      <ul class="md:w-96 w-80">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :taskId="task.id"
          class="even:bg-base-200"
          @deleteTask="deleteTask"
        >
          <template #content>
            {{ task.content }}
          </template>
        </TaskCard>
      </ul>
    </div>
    <span v-if="!tasks.length" class="flex h-1/2 md:text-lg">No tasks. Time for chillout...</span>
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

const tasks = ref(store.tasks);
const taskContent = ref('');


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
