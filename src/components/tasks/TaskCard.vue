<template>
  <li
    class="border-solid border-t border-base-200 last:border-solid last:border-b py-3 w-full flex justify-between"
    @click="handleShowOptionsBtn"
    @mouseover="handleShowOptionsBtn"
    @mouseleave="handleHideOptionsBtn">
    <div class="flex gap-4 w-full">
      <div>
        <label class="flex items-start cursor-pointer">
          <input
            type="checkbox"
            class="checkbox rounded-full"
            :checked="isDone"
            :class="{ 'checkbox-accent': isImportant }"
            @click="toggleIsDone(task.id)" />
        </label>
      </div>
      <div class="flex flex-col w-full cursor-pointer">
        <p
          class="break-all h-full flex"
          :class="{ 'line-through': isDone, 'decoration-accent': isImportant }">
          {{ task.title }}
        </p>
        <p
          class="break-all h-full flex text-sm"
          :class="{ 'line-through': isDone, 'decoration-accent': isImportant }">
          {{ task.description }}
        </p>
        <TaskTimeDetail
          v-if="showDetailTime"
          :class="markOverdue"
          class="pt-0.5">
          <template #time>
            <span class="pt-0.5">{{ showDetailTime }}</span>
          </template>
        </TaskTimeDetail>
      </div>
    </div>
    <TaskOptions
      v-show="cardIsHover"
      :task-id="task.id"
      :task-is-done="task.done"
      :task-is-important="task.isImportant"
      :task-date="props.task.date"
      :task-title="task.title"
      :task="task"
      @toggle-is-important="toggleIsImportant"
      @toggle-is-done="toggleIsDone"
      @edit-task="toggleEditModal"
      @delete-task="toggleDeleteModal"
      @handle-date="handleUpdateDate"
      @duplicate-task="handleDuplicateTask" />
    <Teleport to="body">
      <TaskEditModal
        v-if="editTask"
        v-model.trim="newTitle"
        :title="'Edit task'">
        <template #action>
          <button
            class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold"
            @click="cancelEditTask">
            Cancel
          </button>
          <button
            class="btn btn-sm rounded-md capitalize font-semibold"
            :disabled="!newTitle.length"
            @click="handleUpdateTask(newTitle)">
            Save
          </button>
        </template>
      </TaskEditModal>
    </Teleport>
    <Teleport to="body">
      <TaskDeleteConfirmModal
        v-if="deleteConfirm"
        :title="'Delete task'">
        <template #content>
          <p>
            Do you really want to delete
            <span class="font-bold break-words">"{{ task.title }}"</span> ?
          </p>
        </template>
        <template #action>
          <button
            class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold focus:outline focus:outline-1"
            @click="cancelDeleteTask">
            Cancel
          </button>
          <button
            class="btn btn-sm rounded-md capitalize font-semibold"
            @click="handleDeleteTask(task.id)">
            Delete
          </button>
        </template>
      </TaskDeleteConfirmModal>
    </Teleport>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';
import TaskOptions from '@/components/tasks/TaskOptions.vue';
import TaskEditModal from '@/components/tasks/TaskEditModal.vue';
import TaskDeleteConfirmModal from '@/components/tasks/TaskDeleteConfirmModal.vue';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';
import { useActiveElement } from '@vueuse/core';

type Props = {
  task: Task;
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'deleteTask', id: string): void;
}>();

const store = useStoreTasks();
const newTitle = ref(props.task.title);
const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);
const editTask = ref(false);
const deleteConfirm = ref(false);
const deadline = computed(() => store.getTaskDate(props.task.id));
const { showDetailTime, markOverdue } = useTimeDetail(deadline);
const cardIsHover = ref(true);
const optionsIsOpen = ref(true);
const activeElement = useActiveElement();

watch(activeElement, (el) => {
  el?.closest('.dropdown') ? (optionsIsOpen.value = true) : (optionsIsOpen.value = false);
});

watch(optionsIsOpen, (val) => {
  if (!val) handleHideOptionsBtn();
});

function handleHideOptionsBtn() {
  if (optionsIsOpen.value) return;
  cardIsHover.value = false;
}

function handleShowOptionsBtn() {
  if (!optionsIsOpen.value) {
    cardIsHover.value = true;
  }
}

function handleDeleteTask(id: string): void {
  emit('deleteTask', id);
}

function cancelDeleteTask(): void {
  toggleDeleteModal();
}

function toggleDeleteModal(): void {
  deleteConfirm.value = !deleteConfirm.value;
}

function toggleEditModal(): void {
  editTask.value = !editTask.value;
}

function toggleIsDone(id: string): void {
  isDone.value = !isDone.value;
  store.toggleIsDone(id);
  isDone.value ? useNotification(NotificationMessage.Complete) : useNotification(NotificationMessage.NotComplete);
}

function toggleIsImportant(id: string): void {
  isImportant.value = !isImportant.value;
  store.toggleIsImportant(id);
}

function cancelEditTask(): void {
  newTitle.value = props.task.title;
  toggleEditModal();
}

function handleDuplicateTask(id: string): void {
  store.duplicateTask(id);
  useNotification(NotificationMessage.Duplicate);
}

function handleUpdateDate(date: Date): void {
  store.updateDate(props.task.id, date);
  useNotification(NotificationMessage.UpdateDate);
}

function handleUpdateTask(content: string): void {
  toggleEditModal();
  store.updateTask(props.task.id, content);
  useNotification(NotificationMessage.UpdateTask);
}
</script>
