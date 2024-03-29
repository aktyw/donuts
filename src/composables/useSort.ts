import { storeToRefs } from 'pinia';
import { computed, type ComputedRef } from 'vue';

import { useTasksStore } from '@/stores/TasksStore';
import { SortFilters } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';

export function useSort(tasks: ComputedRef<Task[]>) {
  const store = useTasksStore();
  const { getSortType: type } = storeToRefs(store);

  const sortedTasks = computed(() => {
    if (type.value === SortFilters.Created) {
      return tasks.value.sort((taskA, taskB) => taskB.createdAt.getTime() - taskA.createdAt.getTime());
    } else if (type.value === SortFilters.Date) {
      return tasks.value.sort(
        (taskA, taskB) => (taskA.date?.getTime() || Infinity) - (taskB.date?.getTime() || Infinity)
      );
    } else if (type.value === SortFilters.Title) {
      return tasks.value.sort((taskA, taskB) => taskA.title.localeCompare(taskB.title));
    }

    return tasks.value;
  });

  return { sortedTasks };
}
