<template>
  <li class="w-full flex justify-between py-2">
    <div class="flex gap-4 cursor-pointer" @click="toggleIsDone(task.id)">
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
      :taskId="task.id"
    ></TaskOptions>
  </li>
</template>

<script setup>
import { ref } from 'vue';
import TaskOptions from '@/components/TaskOptions.vue';
import { useStoreTasks } from '@/stores/TasksStore';

const store = useStoreTasks();

const props = defineProps(['task']);
const emits = defineEmits(['deleteTask']);

const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);

function handleDeleteTask(id) {
  emits('deleteTask', id);
}

function toggleIsDone(id) {
  isDone.value = !isDone.value;
  store.toggleIsDone(id);
}

function toggleIsImportant(id) {
  isImportant.value = !isImportant.value;
  store.toggleIsImportant(id);
}
</script>
