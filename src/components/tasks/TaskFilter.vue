<template>
  <ul
    class="flex justify-between w-full md:gap-2 md:py-4 py-2 p-0"
    @click="filterTasks">
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

const emits = defineEmits(['filterType']);

function filterTasks(event: Event): void {
  if (!(event.target as Element).closest('li')) return;

  const btn = (event.target as Element)?.closest('button');

  (event.currentTarget as HTMLButtonElement)
    ?.querySelectorAll('button')
    .forEach((btn) => btn.classList.remove('btn-active'));
  btn?.classList.add('btn-active');

  emits('filterType', btn?.id);
}
</script>
