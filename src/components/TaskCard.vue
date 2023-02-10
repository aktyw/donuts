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
      @handleDate="handleUpdateDate"
      :taskId="task.id"
      :taskIsDone="task.done"
      :taskIsImportant="task.isImportant"
      :taskDate="props.task.date"
    ></TaskOptions>
    <Teleport to="body">
      <AddEditTask
        v-if="editTask"
        v-model.trim="newContent"
        :title="'Edit Task'"
      >
        <template #action>
          <button @click="cancelEditTask" class="btn btn-ghost">Cancel</button>
          <button
            :disabled="!newContent.length"
            class="btn"
            @click="handleUpdateTask(newContent)"
          >
            Save
          </button></template
        >
      </AddEditTask>
    </Teleport>
  </li>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TaskOptions from '@/components/TaskOptions.vue';
import { useStoreTasks } from '@/stores/TasksStore';
import AddEditTask from '@/components/AddEditTask.vue';

const store = useStoreTasks();
const props = defineProps(['task', 'taskContent', 'taskId']);
const emits = defineEmits(['deleteTask']);

const newContent = ref(props.taskContent);
// to refactor
const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);
const editTask = ref(false);


function toggleModal() {
  editTask.value = !editTask.value;
}
function cancelEditTask() {
  newContent.value = props.taskContent;
  toggleModal();
}

function handleUpdateDate(date) {
  store.updateDate(props.task.id, date);
}

function handleUpdateTask(content) {
  toggleModal();
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
