import type { ComputedRef } from 'vue';
import type { Task } from '@/types/models/Task';
import { useSort } from '@/composables/useSort';
import { useFilters } from '@/composables/useFilters';
import { useOrder } from '@/composables/useOrder';

export function useHandleTasks(tasks: ComputedRef<Task[]>) {
  const { sortedTasks } = useSort(tasks);
  const { orderedTasks } = useOrder(sortedTasks);
  const { filteredTasks } = useFilters(orderedTasks);

  return filteredTasks;
}
