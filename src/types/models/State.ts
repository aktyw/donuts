import type { Task } from './Task';

export type State = {
  tasks: Task[];
  deletedTasks: Task[];
};
