<template>
  <li class="w-full flex justify-between py-2">
    <div class="flex gap-4 cursor-pointer" @click="toggleIsDone(taskId)">
      <label>
        <input
          type="checkbox"
          class="checkbox align-bottom"
          :checked="isDone"
          :class="{ 'checkbox-error': isImportant }"
        />
      </label>
      <p class="break-all" :class="{ 'line-through': isDone }">
        <slot name="content" />
      </p>
    </div>
    <TaskOptions
      @deleteTask="handleDeleteTask"
      @toggleIsImportant="toggleIsImportant"
      @toggleIsDone="toggleIsDone"
      :taskId="taskId"
    ></TaskOptions>
  </li>
</template>

<script setup>
import { ref } from 'vue';
import TaskOptions from '@/components/TaskOptions.vue';
import { useStoreTasks } from '@/stores/TasksStore';

const store = useStoreTasks();

const props = defineProps(['taskId']);
const emits = defineEmits(['deleteTask']);

const isDone = ref(false);
const isImportant = ref(false);

function handleDeleteTask(taskId) {
  emits('deleteTask', taskId);
}

function toggleIsDone(taskId) {
  isDone.value = !isDone.value;
  store.toggleIsDone(taskId);
}

function toggleIsImportant(taskId) {
  isImportant.value = !isImportant.value;
  store.toggleIsImportant(taskId);
}
</script>
