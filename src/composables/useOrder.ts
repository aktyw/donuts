import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { SortOrder } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';
import { useTasksStore } from '@/stores/TasksStore';
import { storeToRefs } from 'pinia';

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
