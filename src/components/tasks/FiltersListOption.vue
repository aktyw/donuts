import TheBadge from '@/components/layouts/TheBadge.vue';
<template>
  <li>
    <TheBadge
      :class="{ 'btn-active': getCurrentFilter === filterType }"
      @click="handleFilterType(filterType)">
      <template #title> {{ filterType }} </template>
      <template #amount>
        {{ tasks.length }}
      </template>
    </TheBadge>
  </li>
</template>

<script setup lang="ts">
import TheBadge from '@/components/layouts/TheBadge.vue';
import type { Filters } from '@/types/models/Filters';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

const store = useTasksStore();
const { getCurrentFilter } = storeToRefs(store);

type Props = {
  filterType: Filters;
  tasks: Task[];
};

defineProps<Props>();

function handleFilterType(type: Filters): void {
  store.setFilter(type);
}
</script>
