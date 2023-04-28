import type { Task } from '@/types/models/Task';

export function traverse(task: Task, callback: (task: Task) => void) {
  callback(task);

  for (const subtask of task.subtasks) {
    traverse(subtask, callback);
  }
}
