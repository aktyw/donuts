<template>
  <div class="grid place-items-center">
    <div class="flex flex-col max-w-2xl py-4 gap-4 lg:gap-8">
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
      <ul class="md:w-96 w-80">
        <TaskCard v-for="task in tasks" :key="task.id">
          <template #content>
            {{ task.content }}
          </template>
        </TaskCard>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskCard from '@/components/TaskCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import { vFocus } from '@/directives/vAutoFocus.js';

const store = useStoreTasks();

const tasks = ref(store.tasks);
const taskContent = ref('');

function addTask() {
  store.addTask(taskContent.value);
  taskContent.value = '';
  taskInput.focus();
}
</script>
