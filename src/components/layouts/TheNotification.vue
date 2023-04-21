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
          <span class="text-center ml-4">{{ notification.message }}</span>
        </template>
        <template #action>
          <BaseButton
            v-if="notification.action"
            v-focus
            class="inline-flex items-center btn-ghost btn-sm text-accent hover:bg-base-content capitalize md:btn-sm focus:outline focus:outline-1 rounded"
            @click="handleAction(notification.id, notification.action!)">
            {{ notification.actionLabel }}
            <template #icon>
              <svg
                class="fill-accent"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20">
                <path
                  d="M6.333 15.583v-.666h5.584q1.229 0 2.073-.844.843-.844.843-2.073t-.843-2.073q-.844-.844-2.073-.844H5.792l2.354 2.355-.479.479L4.5 8.75l3.167-3.167.479.479-2.354 2.355h6.125q1.479 0 2.531 1.041Q15.5 10.5 15.5 12q0 1.5-1.052 2.542-1.052 1.041-2.531 1.041Z" />
              </svg>
            </template>
          </BaseButton>
        </template>
      </BaseNotification>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseNotification from '@/components/base/BaseNotification.vue';
import { vFocus } from '@/directives/vAutoFocus.js';
import { useTasksStore } from '@/stores/TasksStore';
import { NotificationAction } from '@/types/models/NotificationAction';

const store = useTasksStore();

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
