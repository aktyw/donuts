import type { Task } from '@/types/models/Task';

export function findTaskByIdAndTrigger(id: string, tasks: Task[], callback: (task: Task) => void) {
  tasks.map((task) => {
    if (task.subtasks.length > 0) {
      findTaskByIdAndTrigger(id, task.subtasks, callback);
    }
    if (task.id === id) {
      callback(task);
    }
  });
}
