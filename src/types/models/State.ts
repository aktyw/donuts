import type { Task } from './Task';
import type { SortFilters } from '@/types/models/SortFilters';

export type State = {
  tasks: Task[];
  sortType: SortFilters;
  deletedTasks: Task[];
};
