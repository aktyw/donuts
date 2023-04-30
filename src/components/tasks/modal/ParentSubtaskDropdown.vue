<template>
  <SubtaskDropdown>
    <template #icon>
      <IconSubTask />
    </template>
    <template #content> {{ subtasks.length }}</template>
    <li class="font-semibold p-3 hover:!bg-base-100 cursor-default">Sub tasks</li>
    <Router-Link
      v-for="sub in subtasks"
      :key="sub.id"
      :to="{ params: { taskid: sub.id } }"
      class="p-3"
      :class="{ 'text-semibold ': $route.params.taskid === sub.id }">
      <span class="flex justify-between gap-1 w-full">
        {{ sub.title }}
        <IconDone v-if="$route.params.taskid === sub.id" />
      </span>
    </Router-Link>
  </SubtaskDropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import IconDone from '@/components/icons/IconDone.vue';
import IconSubTask from '@/components/icons/IconSubTask.vue';
import SubtaskDropdown from '@/components/tasks/modal/SubtaskDropdown.vue';
import { useTasksStore } from '@/stores/TasksStore';

const store = useTasksStore();

type Props = {
  subtasksId: string[];
};
const props = defineProps<Props>();

const subtasks = computed(() => props.subtasksId.map((id) => store.getTaskById(id)));
</script>
