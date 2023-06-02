import { useTrackingEvent } from '@/composables/useTrackingEvent';
import { activateParentTasks } from '@/helpers/activateParentTasks';
import { hasParent } from '@/helpers/breakConnection';
import { findIndex } from '@/helpers/findIndex';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

export function completeNestedTasks(task: Task, value: boolean): void {
  const store = useTasksStore();
  const index = findIndex(task.id, store.tasks.default);

  if (!value) {
    store.tasks.default[index]['isDone'] = value;
    useTrackingEvent({ action: 'Activate', name: task.title, projectId: task.projectId });
    if (hasParent(task)) {
      const parent = store.getTaskById(task.parentId);

      activateParentTasks(parent);
    }
  } else {
    store.tasks.default[index]['isDone'] = value;
    useTrackingEvent({ action: 'Complete', name: task.title, projectId: task.projectId });

    if (task.childId && task.childId.length > 0) {
      task.childId.forEach((id: string) => {
        const t = store.getTaskById(id);

        completeNestedTasks(t, value);
      });
    }
  }
}
