import { v4 as uuid } from 'uuid';

import { NOTIFICATION_DURATION } from '@/config/popup';
import { useTasksStore } from '@/stores/TasksStore';
import type { NotificationMessage } from '@/types/models/NotificationMessage';

export function useNotification(message: NotificationMessage | string, id: string = uuid()) {
  const store = useTasksStore();

  store.addNotification(message, id);

  setTimeout(() => {
    store.deleteNotification(id);
  }, NOTIFICATION_DURATION);
}
