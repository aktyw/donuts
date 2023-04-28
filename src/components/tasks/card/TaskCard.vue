<template>
  <li
    v-if="!editTask"
    ref="card"
    v-bind="$attrs"
    class="relative border-b border-base-200 py-3 flex justify-between transition-colors duration-1000"
    :class="{ 'bg-base-300  duration-1000 ': showBacklight, 'last:border-b-0': isEditorActive }"
    @click="handleShowOptionsBtn"
    @mouseover="handleShowOptionsBtn"
    @mouseleave="handleHideOptionsBtn">
    <div class="flex gap-4 w-full">
      <TaskCheckbox
        :is-done="task.isDone"
        :is-priority="task.isPriority"
        @toggle="toggleIsDone(task.id)" />
      <div class="flex flex-col w-full cursor-pointer">
        <router-link
          class="flex flex-col"
          :to="{ name: 'task', params: { taskid: task.id } }">
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
        </router-link>
        <div class="flex justify-between pt-1">
          <TaskTimeDetail
            :class="markOverdue"
            class="pt-0.5">
            <template #icon>
              <IconCalendar
                v-if="showDetailTime"
                class="relative right-0.5 fill-base-content" />
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
                height="16"
                width="16" />
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
      @picker-open="setCardBacklight"
      @add-subtask="handleAddSubtask" />

    <Teleport to="body">
      <ModalConfirmDelete
        v-if="deleteConfirm"
        :is-danger="true"
        @cancel="cancelDeleteTask"
        @action="handleDeleteTask(task.id)"
        >Delete task
        <template #content>
          <p>
            Do you really want to delete
            <span class="font-bold break-words">{{ task.title }}</span> ?
          </p>
        </template>
      </ModalConfirmDelete>
    </Teleport>
  </li>

  <TaskEditor
    v-if="editTask"
    :is-edit="true"
    :title="task.title"
    :description="task.description"
    :current-project="project"
    :is-priority="isPriority"
    :date="deadline"
    @close-editor="toggleEditModal"
    @update-task="handleUpdateTask" />
  <slot />
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { useElementBounding } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, type Ref, ref, watch } from 'vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconColor from '@/components/icons/IconColor.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import TaskCheckbox from '@/components/tasks/card/TaskCheckbox.vue';
import TaskProjectDetail from '@/components/tasks/card/TaskProjectDetail.vue';
import TaskTimeDetail from '@/components/tasks/card/TaskTimeDetail.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskOptions from '@/components/tasks/TaskOptions.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

type Props = {
  task: Task;
};

const props = defineProps<Props>();
const router = useRouter();
const store = useTasksStore();
const storeProjects = useProjectsStore();
const activeElement = useActiveElement();
const { getProjectById } = storeToRefs(storeProjects);
const project = computed(() => getProjectById.value(props.task.projectId));
const isDone = ref(props.task.isDone);
const isPriority = ref(props.task.isPriority);
const deleteConfirm = ref(false);
const deadline = computed(() => store.getTaskDate(props.task.id));
const { showDetailTime, markOverdue } = useTimeDetail(deadline);
const cardIsHover = ref(false);
const isOptionsOpen = ref(false);
const card: Ref<HTMLElement | undefined> = ref();
const { x: cardX, y: cardY, bottom: cardBottom } = useElementBounding(card);
const showBacklight = ref(false);
const editTask = ref(false);
const isEditorActive = inject('isEditorActive');

onMounted(() => {
  console.log(props.task);
  console.log(deadline.value);
});

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

function toggleIsPriority(id: string): void {
  isPriority.value = !isPriority.value;
  store.toggleIsPriority(id);
}

function handleDuplicateTask(id: string): void {
  store.duplicateTask(id);
}

function handleUpdateDate(date: Date): void {
  store.updateDate(props.task.id, date);
}

function handleAddSubtask(): void {
  router.push({ name: 'task', params: { taskid: props.task.id }, hash: '#subtask' });
}

function handleUpdateTask(content: Partial<Task>): void {
  toggleEditModal();
  store.updateTask(props.task.id, content);
}
</script>
