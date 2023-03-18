<template>
  <ul
    class="flex justify-between w-full md:gap-2 md:py-3 py-2 p-0"
    @click="handleFilterTasks">
    <li>
      <TaskFilterBadge
        id="all"
        class="btn-active">
        <template #title> All </template>
        <template #amount>
          {{ getAllTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
    <li>
      <TaskFilterBadge id="important">
        <template #title> Important </template>
        <template #amount>
          {{ getImportantTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
    <li>
      <TaskFilterBadge id="completed">
        <template #title> Completed </template>
        <template #amount>
          {{ getDoneTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
    <li>
      <TaskFilterBadge id="not-completed">
        <template #title> Uncompleted </template>
        <template #amount>
          {{ getNotDoneTasks.length }}
        </template>
      </TaskFilterBadge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskFilterBadge from '@/components/tasks/TaskFilterBadge.vue';

const store = useStoreTasks();
const { getAllTasks, getImportantTasks, getDoneTasks, getNotDoneTasks } = storeToRefs(store);

const emit = defineEmits<{
  (e: 'filterType', id: string): void;
}>();

function handleFilterTasks(event: Event): void {
  const btn = (event.target as HTMLElement).closest('button');

  if (!btn) return;

  (event.currentTarget as HTMLUListElement)
    .querySelectorAll('button')
    .forEach((btn) => btn.classList.remove('btn-active'));

  btn.classList.add('btn-active');
  emit('filterType', btn.id);
}
</script>
