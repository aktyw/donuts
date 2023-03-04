<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div>
      <SettingsNavbar
        :tasks="tasks"
        class="fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded" />

      <div
        class="flex flex-col items-start max-w-2xl py-2 relative"
        :class="{ 'h-1/2': !store.tasks.length }">
        <form
          id="form"
          class="flex lg:flex-row flex-col lg:items-start items-end lg:gap-8 gap-4 [&>(#cal)]:fill-white">
          <div class="relative flex">
            <input
              ref="taskInput"
              v-model.trim="taskContent"
              v-focus
              type="text"
              maxlength="100"
              placeholder="What's on your mind?"
              class="input input-bordered md:w-96 w-80 pr-11"
              :class="{ 'pr-28': date }" />
            <TaskTimeDetail
              v-if="date && taskContent"
              class="absolute right-1 py-3.5">
              <template #time>
                <span class="pt-0.5 w-full">{{ showDateOnInput }}</span>
              </template>
            </TaskTimeDetail>
          </div>

          <Datepicker
            v-show="showPicker"
            ref="datepicker"
            v-model="date"
            teleport="#form"
            position="left"
            :min-date="new Date()"
            :start-time="startTime"
            :disabled="!taskContent"
            dark />

          <BaseButton
            :disabled="!taskContent"
            class="btn-accent lg:absolute lg:-right-40"
            @click.prevent="addTask">
            <template #default> Add New Task </template>
          </BaseButton>

          <button
            class="absolute top-5 right-4 lg:right-3 fill-base-content"
            :class="{ 'hover:fill-accent': taskContent }"
            @click.prevent="handleCalendar">
            <svg
              id="cal"
              class="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24">
              <path
                d="M5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V2.775H8.45V5h7.175V2.775h1V5h1.75q.7 0 1.163.463.462.462.462 1.162v5.225h-1v-1.225H5v8.75q0 .25.188.437.187.188.437.188h4.6v1Zm14.65-5.2-1.425-1.45.725-.725q.15-.15.35-.15.2 0 .35.15l.725.725q.175.175.175.363 0 .187-.175.362ZM13 21.625V20.2l5.15-5.15 1.425 1.45-5.15 5.125Zm-8-12h14v-3q0-.25-.188-.437Q18.625 6 18.375 6H5.625q-.25 0-.437.188Q5 6.375 5 6.625Zm0 0V6v3.625Z" />
            </svg>
          </button>
        </form>

        <TaskFilter
          v-if="store.tasks.length"
          @filterType="updateFilterType" />

        <ul class="md:w-96 w-80">
          <TaskCard
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            :task-id="task.id"
            :task-content="task.content"
            :task-date="task.date"
            @delete-task="deleteTask">
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
    <TaskDeleteAlert
      v-if="alertIsActive"
      class="flex flex-row absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10/12 md:w-6/12 bg-neutral-focus text-neutral-content lg:w-fit"
      @undo="undoDelete"
      @close-alert="closeDeleteAlert">
      <template #default>
        <span class="text-center mx-4">Task deleted</span>
      </template>
    </TaskDeleteAlert>
  </Teleport>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, watch, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import Datepicker from '@vuepic/vue-datepicker';
import TaskCard from '@/components/tasks/TaskCard.vue';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import TaskDeleteAlert from '@/components/tasks/TaskDeleteAlert.vue';
import SettingsNavbar from '@/components/tasks/TasksSettingsNavbar.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { vFocus } from '@/directives/vAutoFocus';
import { calcStartTime } from '@/helpers/checkTime';

const store = useStoreTasks();
const tasks = computed(() => store.getAllTasks);
const taskContent = ref('');
const date: Ref<Date | undefined> = ref();
const datepicker = ref();
const inputTaskDate: Ref<Date | undefined> = ref();
const showPicker = ref(false);
const currentFilter = ref();
const alertIsActive = ref(false);
const UNDO_DELETE_TIME = 3500; // config
const undoTimeout = ref();
const startTime = ref();
const taskInput = ref();

watch(date, (newDate) => {
  inputTaskDate.value = newDate;
});

watch(tasks, (value) => {
  if (value.length) resetFilters();
});

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case 'all':
      return store.getAllTasks;
    case 'completed':
      return store.getDoneTasks;
    case 'important':
      return store.getImportantTasks;
    case 'not-completed':
      return store.getNotDoneTasks;
    default:
      return store.getAllTasks;
  }
});

function updateFilterType(type: string): void {
  currentFilter.value = type;
}

function handleCalendar(): void {
  startTime.value = calcStartTime();
  datepicker.value?.openMenu();
}

function addTask(): void {
  store.addTask(taskContent.value, inputTaskDate.value);
  taskContent.value = '';
  taskInput.value?.focus();
  datepicker.value?.clearValue();
}

function deleteTask(taskId: string): void {
  store.deleteTask(taskId);
  alertIsActive.value = true;
  undoTimeout.value = setTimeout(() => {
    alertIsActive.value = false;
  }, UNDO_DELETE_TIME);
}

function undoDelete(): void {
  clearTimeout(undoTimeout.value);
  alertIsActive.value = false;
  store.undoDelete(store.getDeletedTask);
}

function closeDeleteAlert(): void {
  alertIsActive.value = !alertIsActive.value;
}

const showDateOnInput = computed(() => {
  const shortDate = date?.value?.toDateString().split(' ');

  return `${shortDate[1]} ${shortDate[2]} `;
});

function resetFilters() {
  currentFilter.value = 'all';
}
</script>
