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

    <FadeTasksList
      v-if="(!isTimeline && filter === 'Active') || filter === 'All'"
      tag="ul">
      <TaskCard
        v-for="task in allTasks"
        :key="task.id"
        :task="task">
        <TasksList
          v-if="task.childId?.length > 0"
          :tasks="task.childId"
          class="pl-12" />
      </TaskCard>
    </FadeTasksList>

    <FadeTasksList
      v-if="filter !== 'All' && !isTimeline"
      tag="ul">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"></TaskCard>
    </FadeTasksList>

    <FadeTasksList
      v-if="isTimeline"
      tag="ul">
      <TaskCard
        v-for="task in (tasks as Task[])"
        :key="task.id"
        :task="task" />
    </FadeTasksList>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUpdated, ref } from 'vue';
import draggable from 'vuedraggable';

import TaskCard from '@/components/tasks/card/TaskCard.vue';
import TasksList from '@/components/tasks/list/TasksList.vue';
import FadeTasksList from '@/components/ui/transitions/FadeTasksList.vue';
import { useTasksStore } from '@/stores/TasksStore';
import type { Project } from '@/types/models/Projects';
import { SortFilters } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';

type Props = {
  tasks: Task[] | string[];
  projectTasks: Task[];
  currentProject: Project;
  isTimeline?: boolean;
};

const props = defineProps<Props>();

const drag = ref(true);
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);

const store = useTasksStore();
const { getSortType: sortTypeStatus, getTaskById, getCurrentFilter: filter } = storeToRefs(store);

const allTasks = computed(() => {
  if (typeof props.tasks[0] === 'string') {
    return props.tasks.map((id) => {
      return getTaskById.value(id);
    });
  }

  return props.tasks;
});

const allActiveTasks = computed(() => {
  return store.getAllTasksById(props.tasks).map((task) => {
    return task;
  });
});

const filteredTasks = computed(() => {
  if (filter.value === 'Completed') {
    return props.projectTasks.filter((task) => task.isDone);
  } else if (filter.value === 'Priority') {
    return props.projectTasks.filter((task) => task.isPriority);
  }

  return [];
});

onMounted(() => {
  // console.log(allActiveTasks.value);
  console.log(props.tasks);
});

onUpdated(() => {
  console.log(filteredTasks.value);
});
</script>
