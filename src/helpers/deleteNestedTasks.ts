import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function deleteNestedTasks(task: Task): void {
  const store = useTasksStore();

  store.tasks.deleted.push(task);
  store.tasks.default = store.tasks.default.filter((t: Task) => t !== task);

  if (task.childId && task.childId.length > 0) {
    task.childId.forEach((id: string) => {
      const t = store.getTaskById(id);

      deleteNestedTasks(t);
    });
  }
}
