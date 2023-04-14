import { computed, type ComputedRef } from 'vue';
import type { Task } from '@/types/models/Task';
import { useTasksStore } from '@/stores/TasksStore';
import { Filters } from '@/types/models/Filters';
import { storeToRefs } from 'pinia';

export function useFilters(tasks: ComputedRef<Task[]>) {
  const store = useTasksStore();
  const { getCurrentFilter: currentFilter } = storeToRefs(store);

  const filteredTasks = computed(() => {
    if (currentFilter.value === Filters.Completed) {
      return tasks.value.filter((task) => task.done);
    } else if (currentFilter.value === Filters.Priority) {
      return tasks.value.filter((task) => task.isPriority);
    } else if (currentFilter.value === Filters.NotCompleted) {
      return tasks.value.filter((task) => !task.done);
    }

    return tasks.value;
  });

  return { filteredTasks };
}
