<template>
  <Teleport to="body">
    <div class="absolute bottom-4 left-4 z-[1000] flex flex-col gap-2">
      <FadeTransitionGroup>
        <BaseNotification
          v-for="notification in notifications"
          :key="notification.id"
          :notification-id="notification.id"
          @close-alert="closeAlert">
          <template #content>
            <span class="ml-4 text-center">{{ notification.message }}</span>
          </template>
          <template #action>
            <BaseButton
              v-if="notification.action"
              v-focus
              class="btn-ghost btn-sm inline-flex items-center rounded capitalize text-accent md:btn-sm hover:bg-base-content focus:outline focus:outline-1"
              @click="handleAction(notification.id, notification.action!)">
              {{ notification.actionLabel }}
              <template #icon>
                <IconUndo class="fill-accent" />
              </template>
            </BaseButton>
          </template>
        </BaseNotification>
      </FadeTransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseNotification from '@/components/base/BaseNotification.vue';
import IconUndo from '@/components/icons/IconUndo.vue';
import FadeTransitionGroup from '@/components/ui/transitions/FadeTransitionGroup.vue';
import { vFocus } from '@/directives/vAutoFocus.js';
import { useTasksStore } from '@/stores/TasksStore';
import { NotificationAction } from '@/types/models/NotificationAction';

const store = useTasksStore();
const { notifications } = storeToRefs(store);

function closeAlert(id: string): void {
  store.deleteNotification(id);
}

function handleAction(id: string, action: string): void {
  if (action === NotificationAction.TasksAllDelete) {
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
