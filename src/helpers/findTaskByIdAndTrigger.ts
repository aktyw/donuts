import type { Task } from '@/types/models/Task';

export function findTaskByIdAndTrigger(id: string, tasks: Task[], callback: (task: Task) => void) {
  tasks.map((task) => {
    if (task.childId && task.childId.length > 0) {
      findTaskByIdAndTrigger(id, task.childId, callback);
    }
    if (task.id === id) {
      callback(task);
    }
  });
}
