import { v4 as uuid } from 'uuid';

import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function duplicateNestedTasks(task: Task, newParent?: Task): Task {
  const store = useTasksStore();

  const copyTask = JSON.parse(JSON.stringify(task));

  copyTask.createdAt = new Date();
  copyTask.parentId = newParent?.id || task.parentId;
  copyTask.id = uuid();
  if (copyTask.date) copyTask.date = new Date(copyTask.date);

  if (!newParent && copyTask.parentId) {
    const rootParent = store.getTaskById(copyTask.parentId);

    rootParent.childId?.push(copyTask.id);
  }

  if (newParent) {
    const idx = newParent.childId?.indexOf(task.id);

    if (typeof idx !== 'undefined' && idx !== -1) {
      newParent.childId?.splice(idx, 1, copyTask.id);
    }
  }

  const taskIndex = store.tasks.default.findIndex((task: Task) => task.id === copyTask.id);
  // const tasksArrStart = store.tasks.default.slice(0, taskIndex + 1);
  // const tasksArrEnd = store.tasks.default.slice(taskIndex + 1);
  const tasks = store.tasks.default.slice();

  store.tasks.default = [...tasks, copyTask];

  if (copyTask.childId && copyTask.childId.length > 0) {
    copyTask.childId.forEach((id: string) => {
      const t = store.getTaskById(id);

      duplicateNestedTasks(t, copyTask);
    });
  }

  return copyTask;
}
