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
      v-if="!isTimeline && currentFilter !== 'Active'"
      tag="ul">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task" />
    </FadeTasksList>

    <FadeTasksList
      v-if="!isTimeline && currentFilter === 'Active'"
      tag="ul">
      <TaskCard
        v-for="task in activeTasks"
        :key="task.id"
        :task="task">
        <TasksList
          v-if="task.childId && task.childId?.length > 0"
          :tasks="task?.childId.map((id) => getTaskById(id))"
          class="pl-12" />
      </TaskCard>
    </FadeTasksList>

    <FadeTasksList
      v-if="!isTimeline && currentFilter === 'All'"
      tag="ul">
      <TaskCard
        v-for="task in props.tasks"
        :key="task.id"
        :task="task">
        <TasksList
          v-if="task.childId && task.childId?.length > 0"
          :tasks="task?.childId.map((id) => getTaskById(id))"
          class="pl-12" />
      </TaskCard>
    </FadeTasksList>

    <!-- <FadeTasksList
      v-if="isTimeline"
      tag="ul">
      <TaskCard
        v-for="task in (tasks as Task[])"
        :key="task.id"
        :task="task" />
    </FadeTasksList> -->
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, type ComputedRef, onMounted, onUpdated, ref } from 'vue';

// import draggable from 'vuedraggable';
import TaskCard from '@/components/tasks/card/TaskCard.vue';
import TasksList from '@/components/tasks/list/TasksList.vue';
import FadeTasksList from '@/components/ui/transitions/FadeTasksList.vue';
import { useHandleTasks } from '@/composables/useHandleTasks';
import { useTasksStore } from '@/stores/TasksStore';
import type { Project } from '@/types/models/Projects';
import type { Task } from '@/types/models/Task';

type Props = {
  tasks: Task[];
  projectTasks?: Task[];
  currentProject?: Project;
  isTimeline?: boolean;
};

const props = defineProps<Props>();

const store = useTasksStore();

const { getTaskById, getCurrentFilter: currentFilter } = storeToRefs(store);

const activeTasks = computed(() => props.tasks.filter((task: Task) => !task.isDone));

const completedTasks = computed(() => props.projectTasks?.filter((task: Task) => task.isDone));

const priorityTasks = computed(() => props.projectTasks?.filter((task: Task) => task.isPriority));

const filteredTasks = computed(() => {
  if (currentFilter.value === 'Completed') {
    return useHandleTasks(completedTasks as ComputedRef<Task[]>).value;
  } else if (currentFilter.value === 'Priority') {
    return useHandleTasks(priorityTasks as ComputedRef<Task[]>).value;
  }

  return [];
});
</script>
