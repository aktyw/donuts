import { storeToRefs } from 'pinia';
import { computed, type ComputedRef } from 'vue';

import { useTasksStore } from '@/stores/TasksStore';
import { Filters } from '@/types/models/Filters';
import type { Task } from '@/types/models/Task';

export function useFilters(tasks: ComputedRef<Task[]>) {
  const store = useTasksStore();
  const { getCurrentFilter: currentFilter } = storeToRefs(store);

  const filteredTasks = computed(() => {
    if (currentFilter.value === Filters.Completed) {
      return tasks.value.filter((task) => task.isDone);
    } else if (currentFilter.value === Filters.Priority) {
      return tasks.value.filter((task) => task.isPriority);
    } else if (currentFilter.value === Filters.Active) {
      return tasks.value.filter((task) => !task.isDone);
    }

    return tasks.value;
  });

  return { filteredTasks };
}
