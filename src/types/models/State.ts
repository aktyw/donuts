import type { Task } from './Task';
import type { SortFilters, SortOrder } from '@/types/models/Sort';

export type State = {
  tasks: Task[];
  sortType: SortFilters;
  sortOrder: SortOrder;
  deletedTasks: Task[];
};
