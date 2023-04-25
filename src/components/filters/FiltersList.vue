<template>
  <ul class="flex justify-between md:justify-end w-full lg:gap-4 md:py-3 py-2 p-0">
    <FiltersListOption
      aria-label=""
      :tasks="activeTasks"
      :filter-type="Filters.Active" />

    <FiltersListOption
      aria-label=""
      :tasks="completedTasks"
      :filter-type="Filters.Completed" />

    <FiltersListOption
      aria-label=""
      :tasks="priorityTasks"
      :filter-type="Filters.Priority" />

    <FiltersListOption
      aria-label=""
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
const completedTasks = computed(() => props.tasks.filter((task) => task.done));
const activeTasks = computed(() => props.tasks.filter((task) => !task.done));
</script>
