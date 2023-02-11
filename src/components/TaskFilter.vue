<template>
  <ul class="flex md:gap-2 py-2 p-0" @click="filterTasks">
    <li>
      <FilterBadge id="all" class="btn-active">
        <template #title>All</template>
        <template #amount>{{ getAllTasks.length }}</template>
      </FilterBadge>
    </li>
    <li>
      <FilterBadge id="important">
        <template #title>Important</template>
        <template #amount>{{ getImportantTasks.length }}</template>
      </FilterBadge>
    </li>
    <li>
      <FilterBadge id="completed">
        <template #title>Completed</template>
        <template #amount>{{ getDoneTasks.length }}</template>
      </FilterBadge>
    </li>
    <li>
      <FilterBadge id="not-completed">
        <template #title>Uncompleted</template>
        <template #amount>{{ getNotDoneTasks.length }}</template>
      </FilterBadge>
    </li>
  </ul>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStoreTasks } from '@/stores/TasksStore';
import FilterBadge from '@/components/FilterBadge.vue';

const store = useStoreTasks();
const { getAllTasks, getImportantTasks, getDoneTasks, getNotDoneTasks } =
  storeToRefs(store);

const emits = defineEmits(['filter']);

function filterTasks({ currentTarget, target }) {
  const btn = target.closest('button');
  if (!btn) return;
  currentTarget
    .querySelectorAll('button')
    .forEach((btn) => btn.classList.remove('btn-active'));
  btn.classList.add('btn-active');

  emits('filter', btn.id);
}
</script>
