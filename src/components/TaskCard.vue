<template>
  <li class="w-full flex justify-between py-2">
    <div class="flex gap-4 cursor-pointer" @click="toggleIsDone(task.id)">
      <label class="flex items-center h-full">
        <input
          type="checkbox"
          class="checkbox"
          :checked="isDone"
          :class="{ 'checkbox-accent': isImportant }"
        />
      </label>
      <p
        class="break-all h-full w-full flex items-center"
        :class="{ 'line-through': isDone }"
      >
        <slot name="content" />
      </p>
    </div>
    <TaskOptions
      @deleteTask="handleDeleteTask"
      @toggleIsImportant="toggleIsImportant"
      @toggleIsDone="toggleIsDone"
      @editTask="toggleModal"
      :taskId="task.id"
      :taskIsDone="task.done"
      :taskIsImportant="task.isImportant"
    ></TaskOptions>
  </li>
  <Teleport to="body">
    <AddEditTask
      v-if="editTask"
      v-model="newContent"
      :title="'Edit Task'"
    >
      <template #text> new: {{ newContent }}</template>
      <template #action
        ><button class="btn" @click="handleUpdateTask(newContent)">Save</button></template
      >
    </AddEditTask>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import TaskOptions from '@/components/TaskOptions.vue';
import { useStoreTasks } from '@/stores/TasksStore';
import AddEditTask from '@/components/AddEditTask.vue';

const store = useStoreTasks();

const props = defineProps(['task', 'taskContent', 'taskId']);
const emits = defineEmits(['deleteTask']);

const oldContent = props.taskContent;
const newContent = ref(oldContent);
// to refactor
const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);

const editTask = ref(false);

function toggleModal() {
  editTask.value = !editTask.value;
}

function handleUpdateTask(content) {
  toggleModal();
  // update store
  store.updateTask(props.taskId, content);
}

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
