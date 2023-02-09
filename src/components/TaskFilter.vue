<template>
  <ul class="flex justify-start md:gap-4 py-4" @click="filterTasks">
    <li>
      <button id="all" class="btn btn-xs btn-ghost md:w-14 btn-active">
        All
      </button>
    </li>
    <li>
      <button id="important" class="btn btn-xs btn-ghost md:w-22">
        Important
      </button>
    </li>
    <li>
      <button id="completed" class="btn btn-xs btn-ghost md:w-22">
        Completed
      </button>
    </li>
    <li>
      <button id="not-completed" class="btn btn-xs btn-ghost">
        Uncompleted
      </button>
    </li>
  </ul>
</template>

<script setup>
import { useStoreTasks } from '@/stores/TasksStore';
const store = useStoreTasks();

const emits = defineEmits(['filter']);

function filterTasks({ currentTarget, target }) {
  if (target.tagName !== 'BUTTON') return;
  currentTarget
    .querySelectorAll('button')
    .forEach((btn) => btn.classList.remove('btn-active'));
  target.classList.add('btn-active');
  
  emits('filter', target.id);
}
</script>
