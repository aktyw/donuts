import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function moveNestedTasks(task: Task, projectId: string) {
  const store = useTasksStore();

  task.projectId = projectId;

  if (task.childId && task.childId.length > 0) {
    task.childId.forEach((id: string) => {
      const t = store.getTaskById(id);

      moveNestedTasks(t, projectId);
    });
  }
}
