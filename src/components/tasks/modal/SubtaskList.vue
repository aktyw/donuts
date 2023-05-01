<template>
  <section class="w-full">
    <ul v-if="!isTimeline">
      <li
        v-show="subtasks.length > 0"
        class="flex gap-2 py-3">
        <span class="font-semibold">Subtasks</span>
        <span>{{ subtaskCompletedAmount }}/{{ subtasks.length }}</span>
      </li>
      <TaskCard
        v-for="subtask in subtasks"
        :key="subtask.id"
        :task="subtask"
        :is-modal="true">
      </TaskCard>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import TaskCard from '@/components/tasks/card/TaskCard.vue';
import type { Task } from '@/types/models/Task';

type Props = {
  subtasks: Task[];
  isTimeline?: boolean;
};

const props = defineProps<Props>();

const subtaskCompletedAmount = computed(() =>
  props.subtasks.reduce((acc: number, val: Task) => (val.isDone ? acc + 1 : acc), 0)
);
</script>
