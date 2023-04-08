<template>
  <li
    ref="card"
    class="relative border-t border-base-200 last:border-b py-3 w-full flex justify-between duration-1000"
    :class="{ 'bg-base-300  duration-1000 ': showBacklight }"
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
            :class="{ 'checkbox-accent': isPriority }"
            @click="toggleIsDone(task.id)" />
        </label>
      </div>
      <div class="flex flex-col w-full cursor-pointer">
        <p
          class="break-all h-full flex"
          :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
          {{ task.title }}
        </p>
        <p
          class="break-all h-full flex text-sm"
          :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
          {{ task.description }}
        </p>
        <div class="flex justify-between pt-1">
          <TaskTimeDetail
            :class="markOverdue"
            class="pt-0.5">
            <template #icon>
              <IconCalendar
                v-if="showDetailTime"
                class="relative right-0.5" />
            </template>
            <template #time>
              <span
                v-if="showDetailTime"
                class="pt-0.5"
                >{{ showDetailTime }}</span
              >
            </template>
          </TaskTimeDetail>
          <TaskProjectDetail
            v-if="project"
            class="items-center">
            <template #name>
              {{ project.name }}
            </template>
            <template #color>
              <IconColor
                :fill="project.color"
                height="18"
                width="18" />
            </template>
          </TaskProjectDetail>
        </div>
      </div>
    </div>
    <TaskOptions
      v-show="cardIsHover"
      :task-id="task.id"
      :task="task"
      class="absolute right-0"
      :coords="{ cardX, cardY, cardBottom }"
      @toggle-is-priority="toggleIsPriority"
      @toggle-is-done="toggleIsDone"
      @edit-task="toggleEditModal"
      @delete-task="toggleDeleteModal"
      @handle-date="handleUpdateDate"
      @duplicate-task="handleDuplicateTask"
      @picker-open="setCardBacklight" />
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
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/TasksStore';
import { useProjectsStore } from '@/stores/ProjectsStore';
import type { Task } from '@/types/models/Task';
import TaskOptions from '@/components/tasks/TaskOptions.vue';
import TaskEditModal from '@/components/tasks/TaskEditModal.vue';
import TaskDeleteConfirmModal from '@/components/tasks/TaskDeleteConfirmModal.vue';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import TaskProjectDetail from '@/components/tasks/TaskProjectDetail.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';
import { useActiveElement } from '@vueuse/core';
import { useElementBounding } from '@vueuse/core';
import IconColor from '@/components/icons/IconColor.vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';

type Props = {
  task: Task;
};

const props = defineProps<Props>();
const store = useTasksStore();
const storeProjects = useProjectsStore();
const newTitle = ref(props.task.title);
const isDone = ref(props.task.done);
const isPriority = ref(props.task.isPriority);
const editTask = ref(false);
const deleteConfirm = ref(false);
const deadline = computed(() => store.getTaskDate(props.task.id));
const { showDetailTime, markOverdue } = useTimeDetail(deadline);
const cardIsHover = ref(false);
const isOptionsOpen = ref(false);
const activeElement = useActiveElement();
const card: Ref<HTMLElement | undefined> = ref();
const { x: cardX, y: cardY, bottom: cardBottom } = useElementBounding(card);
const showBacklight = ref(false);
const { getProjectById } = storeToRefs(storeProjects);
const project = getProjectById.value(props.task.project);
const showProjectDetails = ref(false);

watch(activeElement, (el) => {
  el?.closest('.dropdown') ? (isOptionsOpen.value = true) : (isOptionsOpen.value = false);
});

watch(isOptionsOpen, (val) => {
  if (!val) handleHideOptionsBtn();
});

function setCardBacklight() {
  showBacklight.value = true;
  setTimeout(() => {
    showBacklight.value = false;
  }, 800);
}

function handleHideOptionsBtn() {
  if (isOptionsOpen.value) return;
  cardIsHover.value = false;
}

function handleShowOptionsBtn() {
  if (!isOptionsOpen.value) {
    cardIsHover.value = true;
  }
}

function handleDeleteTask(id: string): void {
  store.deleteTask(id);

  useNotification(NotificationMessage.TaskDelete, id);
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

function toggleIsPriority(id: string): void {
  isPriority.value = !isPriority.value;
  store.toggleIsPriority(id);
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
