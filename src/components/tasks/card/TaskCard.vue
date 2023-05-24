<template>
  <div>
    <li
      v-if="!editTask"
      ref="card"
      v-bind="$attrs"
      class="relative flex justify-between border-b border-base-200 py-3 transition-colors duration-1000"
      :class="{ 'bg-base-300  duration-1000 ': showBacklight, 'last:border-b-0': isEditorActive }"
      @click="handleShowOptionsBtn"
      @mouseover="handleShowOptionsBtn"
      @mouseleave="handleHideOptionsBtn">
      <div class="flex w-full gap-4">
        <TaskCheckbox
          :is-done="task.isDone"
          :is-priority="task.isPriority"
          @toggle="toggleIsDone(task.id)" />

        <div class="flex w-full cursor-pointer flex-col">
          <router-link
            v-if="isModal"
            class="flex flex-col"
            :to="{ params: { taskid: task.id } }">
            <p
              class="flex break-all"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.title }}
            </p>
            <p
              class="flex break-all text-sm"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.description }}
            </p>
          </router-link>
          <router-link
            v-if="$route.name === 'today'"
            class="flex flex-col"
            :to="{ name: 'taskToday', params: { taskid: task.id } }">
            <p
              class="flex h-full break-all"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.title }}
            </p>
            <p
              class="flex h-full break-all text-sm"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.description }}
            </p>
          </router-link>
          <router-link
            v-if="$route.name === 'project'"
            class="flex flex-col"
            :to="{ name: 'task', params: { taskid: task.id } }">
            <p
              class="flex h-full break-all"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.title }}
            </p>
            <p
              class="flex h-full break-all text-sm"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.description }}
            </p>
          </router-link>

          <div class="flex justify-between pt-1">
            <div class="flex items-end gap-3">
              <TaskSubtaskInfo
                v-if="subtaskAmount > 0 && !isModal"
                :amount="subtaskAmount"
                :completed-amount="subtaskCompletedAmount" />

              <TaskTimeDetail
                :class="markOverdue"
                class="pt-0.5"
                @click.stop="handleOpenCalendar()">
                <template #icon>
                  <IconCalendar
                    v-if="showDetailTime"
                    class="relative right-0.5 fill-base-content" />
                </template>
                <template #time>
                  <span
                    v-if="showDetailTime"
                    class="flex items-end pt-0.5"
                    >{{ showDetailTime }}</span
                  >
                </template>
              </TaskTimeDetail>
            </div>
            <TaskProjectDetail
              v-if="project && !isModal"
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
        ref="options"
        :task-id="task.id"
        :task="task"
        class="absolute right-0"
        :coords="{ cardX, cardY, cardBottom }"
        @toggle-is-priority="toggleIsPriority"
        @toggle-is-done="toggleIsDone"
        @edit-task="toggleEditModal"
        @delete-task="openDeleteModal"
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
              <span class="break-words font-bold">{{ task.title }}</span> ?
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
  </div>
</template>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { useElementBounding } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, type Ref, ref, watch } from 'vue';
import { inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconColor from '@/components/icons/IconColor.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import TaskCheckbox from '@/components/tasks/card/TaskCheckbox.vue';
import TaskProjectDetail from '@/components/tasks/card/TaskProjectDetail.vue';
import TaskSubtaskInfo from '@/components/tasks/card/TaskSubtaskInfo.vue';
import TaskTimeDetail from '@/components/tasks/card/TaskTimeDetail.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskOptions from '@/components/tasks/options/TaskOptions.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

type Props = {
  task: Task;
  isModal?: boolean;
};

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();
const store = useTasksStore();
const storeProjects = useProjectsStore();
const storeSettings = useSettingsStore();
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
const subtaskAmount = computed(() => props.task.childId?.length || 0);
const subtaskChilds = computed(() => props.task.childId);
const subtaskCompletedAmount = computed(() => {
  const amount = subtaskChilds.value?.filter((subId) => {
    const subs = store.getTaskById(subId);

    return subs.isDone;
  });

  return amount?.length || 0;
});

const options = ref();

function handleOpenCalendar(): void {
  options.value.handleCalendar();
}

watch(activeElement, (el) => {
  el?.closest('.dropdown') ? (isOptionsOpen.value = true) : (isOptionsOpen.value = false);
});

watch(isOptionsOpen, (val) => {
  if (!val) handleHideOptionsBtn();
});

watch(deleteConfirm, (val) => {
  storeSettings.setModal({ modal: 'deleteTaskConfirm', value: val });
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
  closeDeleteModal();
  store.deleteTask(id);
}

function cancelDeleteTask(): void {
  closeDeleteModal();
}

function openDeleteModal(): void {
  deleteConfirm.value = true;
}

function closeDeleteModal(): void {
  deleteConfirm.value = false;
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
  route.name === 'today'
    ? router.push({ name: 'taskToday', params: { taskid: props.task.id }, hash: '#subtask' })
    : router.push({ name: 'task', params: { taskid: props.task.id }, hash: '#subtask' });
}

function handleUpdateTask(content: Partial<Task>): void {
  toggleEditModal();
  store.updateTask(props.task.id, content);
}
</script>
