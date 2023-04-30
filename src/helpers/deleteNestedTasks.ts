import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function deleteNestedTasks(task: Task): void {
  const store = useTasksStore();

  if (task.childId && task.childId.length > 0) {
    task.childId.forEach((id: string) => {
      const t = store.getTaskById(id);

      deleteNestedTasks(t);
    });
  }
}
