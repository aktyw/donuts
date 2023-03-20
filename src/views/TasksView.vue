<template>
  <div class="flex flex-col justify-start items-center full-h">
    <div>
      <SettingsNavbar
        :tasks="tasks"
        class="fill-base-content [&>button:hover]:fill-base-content [&>button:hover]:bg-base-300 [&>button]:p-0.5 [&>button]:rounded" />

      <div
        class="flex flex-col items-start max-w-2xl relative"
        :class="{ 'h-1/2': !store.tasks.length }">
        <SortStatusNavbar v-if="sortTypeStatus !== SortFilters.Default && tasks"> </SortStatusNavbar>
        <TaskFilter
          v-if="store.tasks.length"
          @filter-type="updateFilterType" />

        <section>
          <ul
            v-if="allowDrag"
            class="md:w-96">
            <draggable
              v-model="dragTasks"
              item-key="id"
              @start="drag = true"
              @end="drag = false">
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

    <TasksEmptyMessage v-if="!store.tasks.length"
      ><template #default> No tasks. Time for chillout... </template>
    </TasksEmptyMessage>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, watch, computed, onUpdated } from 'vue';
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

const store = useStoreTasks();

const { getAllTasks: tasks, getSortType: sortTypeStatus, getSortOrder: sortOrderStatus } = storeToRefs(store);

const currentFilter: Ref<string> = ref('all');
const editorIsActive = ref(false);
const drag = ref(false);
const allowDrag = ref(true);
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
const testTasks = ref(store.getAllTasks);
const dragTasks = ref(testTasks);

onUpdated(() => {
  testTasks.value = store.getAllTasks;
});

watch(tasks, (value) => {
  if (value.length) resetFilters();
});

watch(sortTypeStatus, (type) => {
  if (type === SortFilters.Default) {
    allowDrag.value = true;
  } else {
    allowDrag.value = false;
  }
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
