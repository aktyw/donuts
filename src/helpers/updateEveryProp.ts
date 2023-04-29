import { v4 as uuid } from 'uuid';

import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function updateEveryProp(task: Task) {
  const store = useTasksStore();

  Object.assign(task, { id: uuid(), createdAt: new Date() });
  if (task.childId && task.childId.length > 0) {
    const tasks = store.getAllTasksById(task.childId);

    console.log(tasks);
    tasks.forEach((t: Task) => console.log(t));
    tasks.forEach((t: Task) => updateEveryProp(t));
  }

  return;
}
