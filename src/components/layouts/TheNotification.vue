<template>
  <Teleport to="body">
    <div
      id="notification"
      class="absolute flex flex-col gap-2 bottom-4 left-4 z-50">
      <BaseNotification
        v-for="notification in notifications"
        :key="notification.id"
        :notification-id="notification.id"
        @close-alert="closeAlert">
        <template #content>
          <span class="text-center mx-4">{{ notification.message }}</span>
        </template>
        <template #action>
          <BaseButton
            v-if="notification.action"
            v-focus
            class="btn-ghost btn-sm text-accent capitalize md:btn-sm focus:outline focus:outline-1 rounded"
            @click="handleAction(notification.id, notification.action!)">
            {{ notification.actionLabel }}
          </BaseButton>
        </template>
      </BaseNotification>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseNotification from '@/components/ui/BaseNotification.vue';
import { vFocus } from '@/directives/vAutoFocus.js';
import { useStoreTasks } from '@/stores/TasksStore';
import { storeToRefs } from 'pinia';
import { NotificationAction } from '@/types/models/NotificationAction';

const store = useStoreTasks();

const { notifications } = storeToRefs(store);

function closeAlert(id: string): void {
  store.deleteNotification(id);
}

function handleAction(id: string, action: string): void {
  if (action === NotificationAction.AllTasksDelete) {
    undoDeleteAllTasks(id);
  } else if (action === NotificationAction.TaskDelete) {
    undoDeleteTask(id);
  }
}

function undoDeleteTask(id: string): void {
  store.deleteNotification(id);
  store.undoDeleteTask(id);
}

function undoDeleteAllTasks(id: string): void {
  store.undoDeleteAllTasks();
  store.deleteNotification(id);
}
</script>
