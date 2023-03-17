<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div>
      <SettingsNavbar
        :tasks="tasks"
        class="fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded" />

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
            :task-title="task.title"
            :task-date="task.date"
            @delete-task="deleteTask">
            <template #content>
              {{ task.title }}
            </template>
          </TaskCard>
        </ul>
        <TaskAddButton
          v-if="!editorIsActive"
          @click="showEditor" />
        <TaskEditor
          v-else
          @close-editor="closeEditor" />
      </div>
    </div>

    <TasksEmptyMessage v-if="!store.tasks.length"
      ><template #default> No tasks. Time for chillout... </template>
    </TasksEmptyMessage>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, watch, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskCard from '@/components/tasks/TaskCard.vue';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import SettingsNavbar from '@/components/tasks/TasksSettingsNavbar.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import { Filters } from '@/types/models/Filters';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';
import TaskAddButton from '@/components/tasks/TaskAddButton.vue';
import TaskEditor from '@/components/tasks/TaskEditor.vue';

const store = useStoreTasks();
const tasks = computed(() => store.getAllTasks);
const currentFilter: Ref<string> = ref('all');
const editorIsActive = ref(false);

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

  useNotification(NotificationMessage.TaskDelete, taskId);
}

function showEditor(): void {
  editorIsActive.value = true;
}

function closeEditor(): void {
  editorIsActive.value = false;
}

function resetFilters(): void {
  currentFilter.value = Filters.All;
}

function updateFilterType(type: string): void {
  currentFilter.value = type;
}
</script>
