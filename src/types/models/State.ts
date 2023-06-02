import type { RemovableRef } from '@vueuse/core';

import type { Filters } from '@/types/models/Filters';
import type { Notification } from '@/types/models/Notification';
import type { SortFilters, SortOrder } from '@/types/models/Sort';

import type { Task } from './Task';

export interface Tasks {
  default: Task[];
  sorted: Task[];
  deleted: Task[];
  temp: Task[];
  currentFilter: Filters;
}

export interface Sort {
  type: SortFilters;
  order: SortOrder;
}

export interface State {
  tasks: RemovableRef<Tasks>;
  sort: Sort;
  notifications: Notification[];
}
