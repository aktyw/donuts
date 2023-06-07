<template>
  <section class="w-full">
    <TaskListContainer v-if="currentFilter === 'Completed' || currentFilter === 'Priority'">
      <TaskCard
        v-for="task in flatTasks"
        :key="task.id"
        :task="task" />
    </TaskListContainer>

    <TaskListContainer v-else>
      <TaskCard
        v-for="task in nestedTasks"
        :key="task.id"
        :task="task">
        <TasksList
          v-if="task.childId && task.childId?.length > 0"
          :tasks="task?.childId.map((id) => getTaskById(id))"
          class="pl-10" />
      </TaskCard>
    </TaskListContainer>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import TaskCard from '@/components/tasks/card/TaskCard.vue';
import TasksList from '@/components/tasks/list/TasksList.vue';
import TaskListContainer from '@/components/ui/containers/TaskListContainer.vue';
import { useTasksStore } from '@/stores/TasksStore';
import type { Project } from '@/types/models/Projects';
import type { Task } from '@/types/models/Task';

type Props = {
  tasks: Task[];
  projectTasks?: Task[];
  currentProject?: Project;
};

const props = defineProps<Props>();
const tasksStore = useTasksStore();

const { getTaskById, getCurrentFilter: currentFilter } = storeToRefs(tasksStore);

const activeTasks = computed(() => props.tasks.filter((task: Task) => !task.isDone));
const completedTasks = computed(() => props.projectTasks?.filter((task: Task) => task.isDone));
const priorityTasks = computed(() => props.projectTasks?.filter((task: Task) => task.isPriority));

const nestedTasks = computed(() => (currentFilter.value === 'Active' ? activeTasks.value : props.tasks));
const flatTasks = computed(() => (currentFilter.value === 'Completed' ? completedTasks.value : priorityTasks.value));
</script>
