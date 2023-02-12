<template>
  <li
    class="border-solid border-t border-base-200 last:border-solid last:border-b py-3 w-full flex justify-between"
  >
    <div class="flex gap-4 cursor-pointer" @click="toggleIsDone(task.id)">
      <label class="flex items-start h-full">
        <input
          type="checkbox"
          class="checkbox"
          :checked="isDone"
          :class="{ 'checkbox-accent': isImportant }"
        />
      </label>
      <div class="flex flex-col">
        <p
          class="break-all h-full flex"
          :class="{ 'line-through': isDone, 'decoration-accent': isImportant }"
        >
          <slot name="content" />
        </p>
        <TaskTimeDetail v-if="timeDetail" :class="overdue" class="pt-0.5">
          <template #time>
            <span class="pt-0.5 w-full">{{ timeDetail }}</span>
          </template>
        </TaskTimeDetail>
      </div>
    </div>
    <TaskOptions
      @toggleIsImportant="toggleIsImportant"
      @toggleIsDone="toggleIsDone"
      @editTask="toggleEditModal"
      @deleteTask="toggleDeleteModal"
      @handleDate="handleUpdateDate"
      :taskId="task.id"
      :taskIsDone="task.done"
      :taskIsImportant="task.isImportant"
      :taskDate="props.task.date"
      :taskContent="task.content"
    ></TaskOptions>
    <Teleport to="body">
      <TaskEditModal
        v-if="editTask"
        v-model.trim="newContent"
        :title="'Edit task'"
      >
        <template #action>
          <button
            @click="cancelEditTask"
            class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold"
          >
            Cancel
          </button>
          <button
            class="btn btn-sm rounded-md capitalize font-semibold"
            @click="handleUpdateTask(newContent)"
            :disabled="!newContent.length"
          >
            Save
          </button></template
        >
      </TaskEditModal>
    </Teleport>
    <Teleport to="body">
      <TaskDeleteConfirmModal
      v-if="deleteConfirm"
      :title="'Delete task'"
      
      >
        <template #content >
          <p>
            Do you really want to delete
            <span class="font-bold break-words">"{{ taskContent }}"</span> ?
          </p>
        </template>
        <template #action>
          <button
            @click="cancelDeleteTask"
            class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold" 
          >
            Cancel
          </button>
          <button
            class="btn btn-sm rounded-md capitalize font-semibold"
            @click="handleDeleteTask(taskId)"
          >
            Delete
          </button></template
        >
      </TaskDeleteConfirmModal>
    </Teleport>
  </li>
</template>

<script setup>
import { ref, onUpdated, onMounted, computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import TaskOptions from '@/components/TaskOptions.vue';
import TaskEditModal from '@/components/TaskEditModal.vue';
import TaskDeleteConfirmModal from '@/components/TaskDeleteConfirmModal.vue';
import TaskTimeDetail from '@/components/TaskTimeDetail.vue';
import { isOverdue, isToday, isTomorrow } from '@/helpers/checkTime';
import { vFocus } from '@/directives/vAutoFocus.js';

const store = useStoreTasks();
const props = defineProps(['task', 'taskContent', 'taskId', 'taskDate']);
const emits = defineEmits(['deleteTask']);

const newContent = ref(props.taskContent);
// to refactor
const isDone = ref(props.task.done);
const isImportant = ref(props.task.isImportant);
const editTask = ref(false);
const deleteConfirm = ref(false);
const timeDetail = ref(null);

onUpdated(() => {
  setTimeDetail();
});

onMounted(() => {
  setTimeDetail();
});

const overdue = computed(() =>
  timeDetail.value === 'Overdue' ? '[&>span]:text-error [&>svg]:fill-error' : ''
);

function setTimeDetail() {
  const deadline = props.taskDate;
  if (!deadline) return;
  const date = deadline.toDateString().split(' ');
  if (isOverdue(deadline)) {
    timeDetail.value = 'Overdue';
  } else if (isToday(deadline)) {
    timeDetail.value = `Today ${deadline
      .getHours()
      .toString()
      .padStart(2, '0')}:${deadline.getMinutes().toString().padStart(2, '0')}`;
  } else if (isTomorrow(deadline)) {
    timeDetail.value = 'Tomorrow';
  } else {
    timeDetail.value = `${date[1]} ${date[2]}`;
  }
}

function toggleDeleteModal() {
  deleteConfirm.value = !deleteConfirm.value;
}

function cancelDeleteTask() {
  toggleDeleteModal();
}

function toggleEditModal() {
  editTask.value = !editTask.value;
}

function cancelEditTask() {
  newContent.value = props.taskContent;
  toggleEditModal();
}

function handleUpdateDate(date) {
  store.updateDate(props.task.id, date);
}

function handleUpdateTask(content) {
  showAlert();
  toggleEditModal();
  store.updateTask(props.taskId, content);
}

function showAlert() {
  setTimeout(() => {});
}

function handleDeleteTask(id) {
  emits('deleteTask', id);
}

function toggleIsDone(id) {
  isDone.value = !isDone.value;
  store.toggleIsDone(id);
}

function toggleIsImportant(id) {
  isImportant.value = !isImportant.value;
  store.toggleIsImportant(id);
}
</script>
