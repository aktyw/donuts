<template>
  <div>
    <div class="flex flex-col justify-start items-center full-h py-4">
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
                v-model="store.tasks.default"
                item-key="id"
                @start="drag = true"
                @end="drag = false">
                <template #item="{ element }">
                  <TaskCard
                    :key="element.id"
                    :task="element">
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
                :task="task">
              </TaskCard>
            </ul>
          </section>
          <TaskAddButton
            v-if="!isEditorActive"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTasksStore } from '@/stores/TasksStore';
import { storeToRefs } from 'pinia';
import TaskCard from '@/components/tasks/TaskCard.vue';
import TaskFilter from '@/components/tasks/TaskFilter.vue';
import { SortFilters } from '@/types/models/Sort';
import SettingsNavbar from '@/components/tasks/TasksSettingsNavbar.vue';
import TasksEmptyMessage from '@/components/tasks/TasksEmptyMessage.vue';
import { Filters } from '@/types/models/Filters';
import TaskAddButton from '@/components/tasks/TaskAddButton.vue';
import TaskEditor from '@/components/tasks/TaskEditor.vue';
import draggable from 'vuedraggable';
import SortStatusNavbar from '@/components/tasks/SortStatusNavbar.vue';

const store = useTasksStore();

const {
  getAllTasks: tasks,
  getAllTasksSorted: tasksSorted,
  getDoneTasks,
  getPriorityTasks,
  getNotDoneTasks,
  getSortType: sortTypeStatus,
  getCurrentFilter,
} = storeToRefs(store);

const isEditorActive = ref(false);
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

function showEditor(): void {
  isEditorActive.value = true;
}

function closeEditor(): void {
  isEditorActive.value = false;
}
</script>
