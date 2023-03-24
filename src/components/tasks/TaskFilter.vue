<template>
  <ul class="flex justify-between w-full md:gap-2 md:py-3 py-2 p-0">
    <li>
      <TaskFilterBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.All }"
        @click="handleFilterType(Filters.All)">
        <template #title> {{ Filters.All }} </template>
        <template #amount>
          {{ getAllTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
    <li>
      <TaskFilterBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.Priority }"
        @click="handleFilterType(Filters.Priority)">
        <template #title> {{ Filters.Priority }} </template>
        <template #amount>
          {{ getPriorityTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
    <li>
      <TaskFilterBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.Completed }"
        @click="handleFilterType(Filters.Completed)">
        <template #title> {{ Filters.Completed }} </template>
        <template #amount>
          {{ getDoneTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
    <li>
      <TaskFilterBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.Uncompleted }"
        @click="handleFilterType(Filters.Uncompleted)">
        <template #title> {{ Filters.Uncompleted }} </template>
        <template #amount>
          {{ getNotDoneTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/TasksStore';
import TaskFilterBadge from '@/components/tasks/TaskFilterBadge.vue';
import { Filters } from '@/types/models/Filters';

const store = useTasksStore();
const { getCurrentFilter } = storeToRefs(store);
const { getAllTasks, getPriorityTasks, getDoneTasks, getNotDoneTasks } = storeToRefs(store);

function handleFilterType(type: Filters): void {
  store.setFilter(type);
}
</script>
