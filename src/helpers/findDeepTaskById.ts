import type { Task } from '@/types/models/Task';

export function findDeepTaskById(tasks: Task[], id: string): Task | undefined {
  let found: Task | undefined;

  tasks.forEach((task) => {
    if (task.id === id) {
      found = task;
    } else if (task.subtasks.length > 0) {
      found = findDeepTaskById(task.subtasks, id);
    }
  });

  return found;
}
