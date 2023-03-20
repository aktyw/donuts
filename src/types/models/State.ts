import type { Task } from './Task';
import type { SortFilters, SortOrder } from '@/types/models/Sort';
import type { Notification } from '@/types/models/Notification';
import type { Filters } from '@/types/models/Filters';

export type State = {
  tasks: {
    default: Task[];
    sorted: Task[];
    deleted: Task[];
    temp: Task[];
    currentFilter: Filters;
  };
  sort: {
    type: SortFilters;
    order: SortOrder;
  };
  notifications: Notification[];
};
