import { hasParent } from '@/helpers/breakConnection';
import { findIndex } from '@/helpers/findIndex';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function activateParentTasks(task: Task): void {
  const store = useTasksStore();
  const index = findIndex(task.id, store.tasks.default);

  store.tasks.default[index]['isDone'] = false;

  if (hasParent(task)) {
    const parent = store.getTaskById(task.parentId);

    activateParentTasks(parent);
  }
}
