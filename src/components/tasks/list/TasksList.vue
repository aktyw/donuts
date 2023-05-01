<template>
  <section class="w-full">
    <!-- <ul
      v-if="allowDrag"
      class="w-1/4">
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
    </ul> -->

    <ul v-if="!isTimeline">
      <TaskCard
        v-for="task in allTasks"
        :key="task.id"
        :task="task">
        <TasksList
          v-if="task.childId?.length > 0"
          :tasks="task.childId"
          class="pl-12">
        </TasksList>
      </TaskCard>
    </ul>
    <ul v-else>
      <TaskCard
        v-for="task in (tasks as Task[])"
        :key="task.id"
        :task="task">
      </TaskCard>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import draggable from 'vuedraggable';

import TaskCard from '@/components/tasks/card/TaskCard.vue';
import TasksList from '@/components/tasks/list/TasksList.vue';
import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';

type Props = {
  tasks: Task[] | string[];
  isTimeline?: boolean;
};

const props = defineProps<Props>();

const drag = ref(true);
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);

const store = useTasksStore();
const { getSortType: sortTypeStatus, getTaskById } = storeToRefs(store);

const allTasks = computed(() => {
  if (typeof props.tasks[0] === 'string') {
    return props.tasks.map((id) => {
      return getTaskById.value(id);
    });
  }

  return props.tasks;
});
</script>
