<template>
  <ul class="flex w-full justify-between p-0 py-2 sm:justify-end md:py-3 sm:gap-4">
    <FiltersListOption
      aria-label="active"
      :tasks="activeTasks"
      :filter-type="Filters.Active" />

    <FiltersListOption
      aria-label="completed"
      :tasks="completedTasks"
      :filter-type="Filters.Completed" />

    <FiltersListOption
      aria-label="priority"
      :tasks="priorityTasks"
      :filter-type="Filters.Priority" />

    <FiltersListOption
      aria-label="all"
      :tasks="tasks"
      :filter-type="Filters.All" />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import FiltersListOption from '@/components/filters/FiltersListOption.vue';
import { Filters } from '@/types/models/Filters';
import type { Task } from '@/types/models/Task';

type Props = {
  tasks: Task[];
};

const props = defineProps<Props>();

const priorityTasks = computed(() => props.tasks.filter((task) => task.isPriority));
const completedTasks = computed(() => props.tasks.filter((task) => task.isDone));
const activeTasks = computed(() => props.tasks.filter((task) => !task.isDone));
</script>
