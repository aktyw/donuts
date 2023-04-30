import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function deleteTaskWithChildren(task: Task): Task {
  if (task.childId && task.childId.length > 0) {
    task.childId.forEach((id: string) => {
      const t = store.getTaskById(id);

      deleteTaskWithChildren(t);
    });
  }
}
