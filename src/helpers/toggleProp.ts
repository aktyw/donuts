import type { Task } from '@/types/models/Task';

export function toggleProp(task: Task, prop: keyof Task) {
  if (prop === 'isDone' || prop === 'isPriority') {
    task[prop] = !task[prop];
  }
}
