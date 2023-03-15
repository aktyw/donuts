import type { Task } from './Task';
import type { SortFilters, SortOrder } from '@/types/models/Sort';
import type { Notification } from '@/types/models/Notification';

export type State = {
  tasks: Task[];
  sortType: SortFilters;
  sortOrder: SortOrder;
  deletedTasks: Task[];
  notifications: Notification[];
  temp: Task[];
};
