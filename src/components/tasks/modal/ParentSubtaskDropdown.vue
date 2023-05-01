<template>
  <SubtaskDropdown>
    <template #icon>
      <IconSubTask />
    </template>
    <template #content> {{ subtasks?.length }}</template>
    <li
      class="font-semibold p-3 hover:!bg-base-100 cursor-default"
      tabindex="-1">
      Sub tasks
    </li>
    <Router-Link
      v-for="sub in subtasks"
      :key="sub.id"
      :to="{ params: { taskid: sub.id } }"
      class="p-3 hover:bg-base-200"
      :class="{ 'text-semibold ': $route.params.taskid === sub.id }">
      <span class="flex justify-between gap-1 w-full">
        {{ sub.title }}
        <IconDone v-if="$route.params.taskid === sub.id" />
      </span>
    </Router-Link>
  </SubtaskDropdown>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, inject } from 'vue';

import IconDone from '@/components/icons/IconDone.vue';
import IconSubTask from '@/components/icons/IconSubTask.vue';
import SubtaskDropdown from '@/components/tasks/modal/SubtaskDropdown.vue';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

const store = useTasksStore();

const parentTask = inject<ComputedRef<Task>>('parentTask');
const subtasks = computed(() => parentTask?.value?.childId?.map((id: string) => store.getTaskById(id)));
</script>
