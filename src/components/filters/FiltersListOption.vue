<template>
  <li>
    <TheBadge
      :class="{ 'btn-active': getCurrentFilter === filterType }"
      class="outline-custom"
      @click="handleFilterType(filterType)">
      <template #title>{{ filterType }}</template>
      <template #amount>
        {{ tasks.length }}
      </template>
    </TheBadge>
  </li>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import TheBadge from '@/components/base/BaseBadge.vue';
import { useTasksStore } from '@/stores/TasksStore';
import type { Filters } from '@/types/models/Filters';
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
