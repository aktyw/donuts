import { storeToRefs } from 'pinia';
import { computed, type ComputedRef } from 'vue';

import { useTasksStore } from '@/stores/TasksStore';
import { SortOrder } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';

export function useOrder(tasks: ComputedRef<Task[]>) {
  const store = useTasksStore();
  const { getSortOrder: order } = storeToRefs(store);

  const orderedTasks = computed(() => {
    if (order.value === SortOrder.Descending) {
      return tasks.value.slice().reverse();
    } else {
      return tasks.value;
    }
  });

  return { orderedTasks };
}
