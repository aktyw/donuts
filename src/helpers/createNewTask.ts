import { v4 as uuid } from 'uuid';

import type { Task } from '@/types/models/Task';

export function createNewTask(options: Task): Task {
  const { title, description, isPriority, date, projectId, parentId } = options;

  return {
    id: uuid(),
    title,
    ...(description && { description }),
    isDone: false,
    isPriority,
    createdAt: new Date(),
    ...(date && { date }),
    projectId,
    ...(parentId && { parentId }),
    childId: [],
  };
}
