<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div>
      <SettingsNavbar
        :tasks="tasks"
        class="fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded"
      >
      </SettingsNavbar>
      <div
        class="flex flex-col items-start max-w-2xl py-2 relative"
        :class="{ 'h-1/2': !store.tasks.length }"
      >
        <form
          id="form"
          class="flex lg:flex-row flex-col lg:items-start items-end lg:gap-8 gap-4 [&>(#cal)]:fill-white"
        >
          <div class="relative flex">
            <input
              id="taskInput"
              type="text"
              maxlength="100"
              placeholder="What's on your mind?"
              class="input input-bordered md:w-96 w-80 pr-11"
              :class="{ 'pr-28': date }"
              v-model.trim="taskContent"
              v-focus
            />
            <TaskTimeDetail
              v-if="date && taskContent"
              class="absolute right-1 py-3.5"
            >
              <template #time>
                <span class="pt-0.5 w-full">{{ showDateOnInput }}</span>
              </template>
            </TaskTimeDetail>
          </div>

          <Datepicker
            v-model="date"
            ref="datepicker"
            v-show="showPicker"
            teleport="#form"
            position="left"
            :min-date="new Date()"
            :start-time="startTime"
            :disabled="!taskContent"
            dark
          ></Datepicker>

          <BaseButton
            :disabled="!taskContent"
            @click.prevent="addTask"
            class="btn-accent lg:absolute lg:-right-40"
          >
            <template #default>Add New Task</template>
          </BaseButton>

          <button
            class="[&:focus>svg]:fill-accent [&>svg:hover]:fill-accent absolute top-5 right-4 lg:right-3"
            @click.prevent="handleCalendar"
          >
            <svg
              class="fill-base-content cursor-pointer"
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
            @deleteTask="deleteTask"
            @click="filterTasks(currentFilter)"
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            :taskId="task.id"
            :taskContent="task.content"
            :taskDate="task.date"
            :showOptions="showOptions"
          >
            <template #content>
              {{ task.content }}
            </template>
          </TaskCard>
        </ul>
      </div>
    </div>
    <span
      v-if="!store.tasks.length"
      class="grid place-items-center h-1/2 md:text-lg"
      >No tasks. Time for chillout...</span
    >
  </div>
  <Teleport to="body">
    <BaseAlert
      v-if="alertIsActive"
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      @undo="undoDelete"
      ><template #default>
        <span class="text-center md:text-lg sm:px-4 md:p-2 py-4"
          >You've deleted the task succesfully.</span
        >
      </template>
    </BaseAlert>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskCard from '@/components/TaskCard.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import TaskTimeDetail from '@/components/TaskTimeDetail.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseAlert from '@/components/BaseAlert.vue';
import Datepicker from '@vuepic/vue-datepicker';
import SettingsNavbar from '@/components/SettingsNavbar.vue';
import { vFocus } from '@/directives/vAutoFocus.js';
import { addHours, calcStartTime } from '@/helpers/checkTime.js';

const date = ref();
const datepicker = ref(null);
const inputTaskDate = ref(null);
const showPicker = ref(false);
const store = useStoreTasks();
const currentFilter = ref('');
const tasks = ref(store.tasks);
const taskContent = ref('');
const alertIsActive = ref(false);
const UNDO_DELETE_TIME = 3500; // config
const undoTimeout = ref(null);
const startTime = ref({});

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

function sortTasks() {}

const showDateOnInput = computed(() => {
  const shortDate = date.value.toDateString().split(' ');
  return `${shortDate[1]} ${shortDate[2]} `;
});

function handleCalendar() {
  startTime.value = calcStartTime();
  datepicker.value.openMenu();
}

function addTask() {
  store.addTask(taskContent.value, inputTaskDate.value);
  taskContent.value = '';
  taskInput.focus();
  datepicker.value.clearValue();
  filterTasks(currentFilter.value);
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
