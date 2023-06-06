<template>
  <section class="w-full">
    <TaskListContainer>
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task" />
    </TaskListContainer>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import TaskCard from '@/components/tasks/card/TaskCard.vue';
import TaskListContainer from '@/components/ui/containers/TaskListContainer.vue';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

type Props = {
  tasks: Task[];
};

const props = defineProps<Props>();
const store = useTasksStore();

const activeTasks = computed(() => props.tasks.filter((task: Task) => !task.isDone));
const completedTasks = computed(() => props.tasks.filter((task: Task) => task.isDone));
const priorityTasks = computed(() => props.tasks.filter((task: Task) => task.isPriority));
</script>
