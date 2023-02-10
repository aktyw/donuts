<template>
  <div class="aa flex flex-col justify-start items-center full-h">
    <div
      class="flex flex-col items-start max-w-2xl py-4 relative"
      :class="{ 'h-1/2': !store.tasks.length }"
    >
      <form
        action=""
        class="flex lg:flex-row flex-col lg:items-start items-end lg:gap-8 gap-4"
      >
        <div class="relative flex">
          <input
            id="taskInput"
            type="text"
            placeholder="What's on your mind?"
            class="input input-bordered md:w-96 w-80"
            v-model.trim="taskContent"
            v-focus
          />
        </div>

        <Datepicker
          v-model="date"
          ref="datepicker"
          v-show="showPicker"
          teleport-center
          position="right"
          :min-date="new Date()"
          :disabled="!taskContent"
          dark
        ></Datepicker>

        <BaseButton
          :disabled="!taskContent"
          @click.prevent="addTask"
          class="btn-accent"
        >
          <template #default>Add New Task</template>
        </BaseButton>

        <button
          class="[&:focus>svg]:fill-accent [&>svg:hover]:fill-accent absolute top-7 right-3 lg:right-44"
          @click.prevent="handleCalendar"
        >
          <svg
            class="fill-accent-content cursor-pointer "
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            id="cal"
          >
            <path
              d="M5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V2.775H8.45V5h7.175V2.775h1V5h1.75q.7 0 1.163.463.462.462.462 1.162v5.225h-1v-1.225H5v8.75q0 .25.188.437.187.188.437.188h4.6v1Zm14.65-5.2-1.425-1.45.725-.725q.15-.15.35-.15.2 0 .35.15l.725.725q.175.175.175.363 0 .187-.175.362ZM13 21.625V20.2l5.15-5.15 1.425 1.45-5.15 5.125Zm-8-12h14v-3q0-.25-.188-.437Q18.625 6 18.375 6H5.625q-.25 0-.437.188Q5 6.375 5 6.625Zm0 0V6v3.625Z"
            />
          </svg>
        </button>
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
import { ref, watch } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskCard from '@/components/TaskCard.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseAlert from '@/components/BaseAlert.vue';
import { vFocus } from '@/directives/vAutoFocus.js';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
const datepicker = ref(null);
const inputTaskDate = ref(null);
const showPicker = ref(false);

const store = useStoreTasks();
const currentFilter = ref('all');
const tasks = ref(store.tasks);
const taskContent = ref('');
const alertIsActive = ref(false);
const UNDO_DELETE_TIME = 4000;
const undoTimeout = ref(null);

watch(date, (newDate) => {
  inputTaskDate.value = newDate;
});

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

function handleCalendar() {
  datepicker.value.openMenu();
}

function addTask() {
  store.addTask(taskContent.value, inputTaskDate.value);
  taskContent.value = '';
  taskInput.focus();
  datepicker.value.clearValue();
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
