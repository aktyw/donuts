import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function recoverNestedTasks(task: Task): void {
  const store = useTasksStore();

  store.tasks.deleted = store.tasks.deleted.filter((t: Task) => t !== task);
  store.tasks.default.push(task);

  if (task.childId && task.childId.length > 0) {
    task.childId.forEach((id: string) => {
      const t = store.getDeletedTaskById(id);

      console.log(t);
      recoverNestedTasks(t);
    });
  }
}
