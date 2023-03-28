<template>
  <ul class="flex justify-between w-full md:gap-2 md:py-3 py-2 p-0">
    <li>
      <TheBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.All }"
        @click="handleFilterType(Filters.All)">
        <template #title> {{ Filters.All }} </template>
        <template #amount>
          {{ tasks.length }}
        </template>
      </TheBadge>
    </li>
    <li>
      <TheBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.Priority }"
        @click="handleFilterType(Filters.Priority)">
        <template #title> {{ Filters.Priority }} </template>
        <template #amount>
          {{ priorityTasks.length }}
        </template>
      </TheBadge>
    </li>
    <li>
      <TheBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.Completed }"
        @click="handleFilterType(Filters.Completed)">
        <template #title> {{ Filters.Completed }} </template>
        <template #amount>
          {{ completedTasks.length }}
        </template>
      </TheBadge>
    </li>
    <li>
      <TheBadge
        :class="{ 'btn-active': getCurrentFilter === Filters.NotCompleted }"
        @click="handleFilterType(Filters.NotCompleted)">
        <template #title> {{ Filters.NotCompleted }} </template>
        <template #amount>
          {{ notCompletedTasks.length }}
        </template>
      </TheBadge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/TasksStore';
import TheBadge from '@/components/layouts/TheBadge.vue';
import { Filters } from '@/types/models/Filters';
import type { Task } from '@/types/models/Task';

const store = useTasksStore();
const { getCurrentFilter } = storeToRefs(store);

type Props = {
  tasks: Task[];
};

const props = defineProps<Props>();

const priorityTasks = computed(() => props.tasks.filter((task) => task.isPriority));
const completedTasks = computed(() => props.tasks.filter((task) => task.done));
const notCompletedTasks = computed(() => props.tasks.filter((task) => !task.done));

function handleFilterType(type: Filters): void {
  store.setFilter(type);
}
</script>
