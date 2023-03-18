import { NOTIFICATION_DURATION } from '@/config/popup';
import type { NotificationMessage } from '@/types/models/NotificationMessage';
import { useStoreTasks } from '@/stores/TasksStore';
import { v4 as uuid } from 'uuid';

export function useNotification(message: NotificationMessage, id: string = uuid()) {
  const store = useStoreTasks();

  store.addNotification(message, id);

  setTimeout(() => {
    store.deleteNotification(id);
  }, NOTIFICATION_DURATION);
}