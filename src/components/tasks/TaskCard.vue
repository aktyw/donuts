<template>
  <li class="border-solid border-t border-base-200 last:border-solid last:border-b py-3 w-full flex justify-between">
    <div
      class="flex gap-4 cursor-pointer"
      @click="toggleIsDone(task.id)">
      <label class="flex items-start h-full">
        <input
          type="checkbox"
          class="checkbox rounded-full"
          :checked="isDone"
          :class="{ 'checkbox-accent': isImportant }" />
      </label>
      <div class="flex flex-col">
        <p
          class="break-all h-full flex"
          :class="{ 'line-through': isDone, 'decoration-accent': isImportant }">
          <slot name="content" />
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
      :task-id="task.id"
      :task-is-done="task.done"
      :task-is-important="task.isImportant"
      :task-date="props.task.date"
      :task-content="task.content"
      @toggle-is-important="toggleIsImportant"
      @toggle-is-done="toggleIsDone"
      @edit-task="toggleEditModal"
      @delete-task="toggleDeleteModal"
      @handle-date="handleUpdateDate"
      @duplicate-task="handleDuplicateTask" />
    <Teleport to="body">
      <TaskEditModal
        v-if="editTask"
        v-model.trim="newContent"
        :title="'Edit task'">
        <template #action>
          <button
            class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold"
            @click="cancelEditTask">
            Cancel
          </button>
          <button
            class="btn btn-sm rounded-md capitalize font-semibold"
            :disabled="!newContent.length"
            @click="handleUpdateTask(newContent)">
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
            <span class="font-bold break-words">"{{ taskContent }}"</span> ?
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
            @click="handleDeleteTask(taskId)">
            Delete
          </button>
        </template>
      </TaskDeleteConfirmModal>
    </Teleport>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';
import TaskOptions from '@/components/tasks/TaskOptions.vue';
import TaskEditModal from '@/components/tasks/TaskEditModal.vue';
import TaskDeleteConfirmModal from '@/components/tasks/TaskDeleteConfirmModal.vue';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';

type Props = {
  task: Task;
  taskContent: string;
  taskId: string;
  taskDate?: Date;
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'deleteTask', id: string): void;
}>();

const store = useStoreTasks();
const newContent = ref(props.taskContent);
const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);
const editTask = ref(false);
const deleteConfirm = ref(false);

const deadline = computed(() => store.getTaskDate(props.taskId));
const { showDetailTime, markOverdue } = useTimeDetail(deadline);

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
}

function toggleIsImportant(id: string): void {
  isImportant.value = !isImportant.value;
  store.toggleIsImportant(id);
}

function cancelEditTask(): void {
  newContent.value = props.taskContent;
  toggleEditModal();
}

function handleDuplicateTask(id: string): void {
  store.duplicateTask(id);
}

function handleUpdateDate(date: Date): void {
  store.updateDate(props.taskId, date);
}

function handleUpdateTask(content: string): void {
  toggleEditModal();
  store.updateTask(props.taskId, content);
}
</script>
