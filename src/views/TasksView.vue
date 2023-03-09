<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div>
      <SettingsNavbar
        :tasks="tasks"
        class="fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded" />

      <TaskInput />

      <div
        class="flex flex-col items-start max-w-2xl py-2 relative"
        :class="{ 'h-1/2': !store.tasks.length }">
        <TaskFilter
          v-if="store.tasks.length"
          @filter-type="updateFilterType" />

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

    <TasksEmptyMessage v-if="!store.tasks.length"
      ><template #default> No tasks. Time for chillout... </template></TasksEmptyMessage
    >
  </div>

  <Teleport to="body">
    <TaskDeleteAlert
      v-if="deleteAlertIsActive"
      class="flex flex-row absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10/12 md:w-6/12 bg-neutral-focus text-neutral-content lg:w-fit"
      @undo="undoDeleteTask"
      @close-alert="closeDeleteAlert">
      <template #default>
        <span class="text-center mx-4">Task deleted</span>
      </template>
    </TaskDeleteAlert>
    <TaskDoneAlert
      v-if="alertIsActive"

      @close-alert="closeDoneAlert">
      <template #default>
        <span class="text-center mx-4">Task deleted</span>
      </template>
    </TaskDoneAlert>
  </Teleport>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, watch, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskInput from '@/components/tasks/TaskInput.vue';
import TaskCard from '@/components/tasks/TaskCard.vue';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import TaskDeleteAlert from '@/components/tasks/TaskDeleteAlert.vue';
import TaskDoneAlert from '@/components/tasks/TaskDoneAlert.vue';
import SettingsNavbar from '@/components/tasks/TasksSettingsNavbar.vue';
import { Filters } from '@/types/models/Filters';
import { SHOW_ALERT_TIME } from '@/config/popup';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';

const store = useStoreTasks();
const tasks = computed(() => store.getAllTasks);
const currentFilter: Ref<string> = ref('all');
const deleteAlertIsActive = ref(false);
const undoTimeoutId: Ref<ReturnType<typeof setTimeout> | null> = ref(null);

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case Filters.All:
      return store.getAllTasks;
    case Filters.Completed:
      return store.getDoneTasks;
    case Filters.Important:
      return store.getImportantTasks;
    case Filters.NotCompleted:
      return store.getNotDoneTasks;
    default:
      return store.getAllTasks;
  }
});

watch(tasks, (value) => {
  if (value.length) resetFilters();
});

function deleteTask(taskId: string): void {
  store.deleteTask(taskId);
  deleteAlertIsActive.value = true;
  undoTimeoutId.value = setTimeout(() => {
    deleteAlertIsActive.value = false;
  }, SHOW_ALERT_TIME);
}

function undoDeleteTask(): void {
  if (undoTimeoutId.value) {
    clearTimeout(undoTimeoutId.value);
  }
  deleteAlertIsActive.value = false;
  store.undoDeleteTask(store.getDeletedTask);
}

function resetFilters(): void {
  currentFilter.value = Filters.All;
}

function updateFilterType(type: string): void {
  currentFilter.value = type;
}

function closeAlert(type: string): void {
  deleteAlertIsActive.value = !deleteAlertIsActive.value;
}
</script>
