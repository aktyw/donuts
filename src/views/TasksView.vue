<template>
  <TasksSidebar />
  <div class="flex flex-col justify-start items-center full-h">
    <div>
      <SettingsNavbar
        :tasks="tasks"
        class="fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded" />

      <div
        class="flex flex-col items-start max-w-2xl relative"
        :class="{ 'h-1/2': !store.tasks.default.length }">
        <SortStatusNavbar v-if="!allowDrag"> </SortStatusNavbar>
        <TaskFilter v-if="store.tasks.default.length && !allowDrag" />

        <section>
          <ul
            v-if="allowDrag"
            class="md:w-96">
            <draggable
              v-model="defTasks"
              item-key="id"
              @start="drag = true"
              @end="drag = false"
              @update="updateTasks">
              <template #item="{ element }">
                <TaskCard
                  :key="element.id"
                  :task="element"
                  @delete-task="deleteTask">
                </TaskCard>
              </template>
            </draggable>
          </ul>
          <ul
            v-else
            class="md:w-96">
            <TaskCard
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
              @delete-task="deleteTask">
            </TaskCard>
          </ul>
        </section>
        <TaskAddButton
          v-if="!editorIsActive"
          @click="showEditor" />
        <TaskEditor
          v-else
          @close-editor="closeEditor" />
      </div>
    </div>

    <TasksEmptyMessage v-if="!store.tasks.default.length"
      ><template #default> No tasks. Time for chillout... </template>
    </TasksEmptyMessage>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import { storeToRefs } from 'pinia';
import TaskCard from '@/components/tasks/TaskCard.vue';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import { SortFilters } from '@/types/models/Sort';
import SettingsNavbar from '@/components/tasks/TasksSettingsNavbar.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import { Filters } from '@/types/models/Filters';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';
import TaskAddButton from '@/components/tasks/TaskAddButton.vue';
import TaskEditor from '@/components/tasks/TaskEditor.vue';
import draggable from 'vuedraggable';
import SortStatusNavbar from '@/components/tasks/SortStatusNavbar.vue';
import TasksSidebar from '@/components/tasks/TasksSidebar.vue';

const store = useStoreTasks();

const {
  getAllTasks: tasks,
  getAllTasksSorted: tasksSorted,
  getDoneTasks,
  getPriorityTasks,
  getNotDoneTasks,
  getSortType: sortTypeStatus,
  getCurrentFilter,
} = storeToRefs(store);

const editorIsActive = ref(false);
const drag = ref(true);
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);

const filteredTasks = computed(() => {
  switch (getCurrentFilter.value) {
    case Filters.All:
      return tasksSorted.value;
    case Filters.Completed:
      return getDoneTasks.value;
    case Filters.Priority:
      return getPriorityTasks.value;
    case Filters.Uncompleted:
      return getNotDoneTasks.value;
    default:
      return tasks.value;
  }
});

const defTasks = ref(store.getAllTasks);

watch(tasks, (newTasks) => {
  if (newTasks.length !== defTasks.value.length) {
    defTasks.value = store.getAllTasks;
  }
});

function updateTasks() {
  store.setDefaultPosition(defTasks.value);
}

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
</script>
