import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function breakConnection(rootTask: Task) {
  const store = useTasksStore();

  const parent = store.getTaskById(rootTask.parentId);
  const idx = parent?.childId?.indexOf(rootTask.id);

  if (typeof idx !== 'undefined' && idx !== -1) {
    parent?.childId?.splice(idx, 1);
  }

  rootTask.parentId = null;
}

export function hasParent(task: Task) {
  return !!task.parentId;
}
