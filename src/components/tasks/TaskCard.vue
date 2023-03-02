<template>
  <li class="border-solid border-t border-base-200 last:border-solid last:border-b py-3 w-full flex justify-between">
    <div
      class="flex gap-4 cursor-pointer"
      @click="toggleIsDone(task.id)">
      <label class="flex items-start h-full">
        <input
          type="checkbox"
          class="checkbox"
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
          v-if="setDetailTime"
          :class="overdue"
          class="pt-0.5">
          <template #time>
            <span class="pt-0.5 w-full">{{ setDetailTime }}</span>
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
      @task-is-important="toggleIsImportant"
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
import TaskOptions from '@/components/tasks/TaskOptions.vue';
import TaskEditModal from '@/components/tasks/TaskEditModal.vue';
import TaskDeleteConfirmModal from '@/components/tasks/TaskDeleteConfirmModal.vue';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import { isOverdue, isToday, isTomorrow } from '@/helpers/checkTime';
import type { Task } from '@/types/interfaces/task';

type Props = {
  task: { type: Task; required: true };
  taskContent: { type: string; required: true };
  taskId: { type: string; required: true };
  taskDate: { type: Date; required: false };
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'deleteTasks', id: string): void;
}>();

const store = useStoreTasks();

const newContent = ref(props.taskContent);
// to refactor to storerefs? or computed
const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);
const editTask = ref(false);
const deleteConfirm = ref(false);

const deadline = computed(() => store.getTaskDate(props.taskId));
const setDetailTime = computed(() => {
  if (!deadline.value) return;
  if (isOverdue(deadline.value)) {
    return 'Overdue';
  }
  if (isToday(deadline.value)) {
    return `Today ${deadline.value.getHours().toString().padStart(2, '0')}:${deadline.value
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }
  if (isTomorrow(deadline.value)) {
    return 'Tomorrow';
  }
  const date = deadline.value.toDateString().split(' ');

  return `${date[1]} ${date[2]}`;
});

const overdue = computed(() => (setDetailTime.value === 'Overdue' ? '[&>span]:text-error [&>svg]:fill-error' : ''));

function toggleDeleteModal() {
  deleteConfirm.value = !deleteConfirm.value;
}

function cancelDeleteTask() {
  toggleDeleteModal();
}

function handleDeleteTask(id: string) {
  emit('deleteTask', id);
}

function toggleEditModal() {
  editTask.value = !editTask.value;
}

function cancelEditTask() {
  newContent.value = props.taskContent;
  toggleEditModal();
}

function handleDuplicateTask(id: string) {
  store.duplicateTask(id);
}

function handleUpdateDate(date) {
  store.updateDate(props.taskId, date);
}

function handleUpdateTask(content: string) {
  toggleEditModal();
  store.updateTask(props.taskId, content);
}

function toggleIsDone(id: string) {
  isDone.value = !isDone.value;
  store.toggleIsDone(id);
}

function toggleIsImportant(id: string) {
  isImportant.value = !isImportant.value;
  store.toggleIsImportant(id);
}
</script>
