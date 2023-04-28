import { v4 as uuid } from 'uuid';

import type { Task } from '@/types/models/Task';

export function updateEveryProp(task: Task) {
  console.log(task);

  Object.assign(task, { id: uuid(), createdAt: new Date() });
  if (task.subtasks.length > 0) {
    // updateEveryProp(task.subtasks);
    console.log(task.subtasks);
  }
}
