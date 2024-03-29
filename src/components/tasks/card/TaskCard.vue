<template>
  <div>
    <li
      v-if="!editTask"
      ref="card"
      v-bind="$attrs"
      class="relative flex justify-between border-b border-base-200 py-3 transition-colors duration-1000 md:[&>div>*>button]:opacity-0 md:[&>div>*>button]:hover:opacity-100 [&>div>*>button:focus]:opacity-100"
      :class="{ 'bg-base-300  duration-1000 ': showBacklight, 'last:border-b-0': isEditorActive }">
      <div class="flex w-full gap-4">
        <TaskCheckbox
          :is-done="task.isDone"
          :is-priority="task.isPriority"
          @toggle="toggleIsDone(task.id)" />

        <div class="flex w-full cursor-pointer flex-col [&>*>p]:outline-red-500 [&>*>p]:pr-16">
          <router-link
            v-if="isModal"
            class="flex flex-col outline-custom"
            :to="{ params: { taskid: task.id } }">
            <p
              class="flex break-all"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.title }}
            </p>
            <p
              class="flex break-all text-sm outline-custom"
              :class="{ 'line-through': isDone, 'decoration-accent': isPriority }">
              {{ task.description }}
            </p>
          </router-link>
          <router-link
            v-if="$route.name === 'today'"
            class="flex flex-col outline-custom"
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
            class="flex flex-col outline-custom"
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
              <TaskPriorityDetail
                v-if="task.isPriority"
                class="fill-error" />

              <TaskTimeDetail
                v-if="showDetailTime"
                :class="{
                  '[&>span]:!text-error [&>svg]:!fill-error': markOverdue,
                  '[&>span]:text-success [&>svg]:fill-success': markToday,
                  '[&>span]:text-warning [&>svg]:fill-warning': markTomorrow,
                  '[&>span]:text-primary [&>svg]:fill-primary': markDays,
                }"
                class="pt-0.5"
                @click.stop="handleOpenCalendar()">
                <template #icon>
                  <IconCalendar class="relative right-0.5 fill-base-content" />
                </template>
                <template #time>
                  <span class="flex items-end pt-0.5">
                    {{ showDetailTime }}
                  </span>
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

      <div>
        <div class="absolute right-8">
          <BaseButton
            class="transition rounded-md hover:bg-base-200 print:hidden"
            @click="toggleEditModal">
            <IconPen />
          </BaseButton>
        </div>
        <TaskOptions
          ref="options"
          :task-id="task.id"
          :task="task"
          class="absolute right-0 print:hidden"
          :coords="{ cardX, cardY, cardBottom }"
          @toggle-is-priority="toggleIsPriority"
          @toggle-is-done="toggleIsDone"
          @edit-task="toggleEditModal"
          @delete-task="openDeleteModal"
          @handle-date="handleUpdateDate"
          @duplicate-task="handleDuplicateTask"
          @picker-open="setCardBacklight"
          @add-subtask="handleAddSubtask" />
      </div>

      <Teleport to="body">
        <ModalConfirmDelete
          v-if="deleteConfirm"
          :is-danger="true"
          @cancel="cancelDeleteTask"
          @action="handleDeleteTask(task.id)">
          Delete task
          <template #content>
            <p>
              Do you really want to delete
              <span class="break-words font-bold">{{ task.title }}</span>
              ?
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
import { useElementBounding } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, inject, type Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconColor from '@/components/icons/IconColor.vue';
import IconPen from '@/components/icons/IconPen.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import TaskPriorityDetail from '@/components/tasks/card/details/TaskPriorityDetail.vue';
import TaskProjectDetail from '@/components/tasks/card/details/TaskProjectDetail.vue';
import TaskSubtaskInfo from '@/components/tasks/card/details/TaskSubtaskInfo.vue';
import TaskTimeDetail from '@/components/tasks/card/details/TaskTimeDetail.vue';
import TaskCheckbox from '@/components/tasks/card/TaskCheckbox.vue';
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

const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();
const settingsStore = useSettingsStore();

const { getProjectById } = storeToRefs(projectsStore);
const project = computed(() => getProjectById.value(props.task.projectId));

const isDone = computed(() => props.task.isDone);
const isPriority = computed(() => props.task.isPriority);

const deleteConfirm = ref(false);

watch(deleteConfirm, (val) => {
  settingsStore.setModal({ modal: 'deleteTaskConfirm', value: val });
});

const editTask = ref(false);
const options = ref();
const isEditorActive = inject('isEditorActive');

const deadline = computed(() => tasksStore.getTaskDate(props.task.id));
const { showDetailTime, markOverdue, markToday, markTomorrow, markDays } = useTimeDetail(deadline);

const card: Ref<HTMLElement | undefined> = ref();
const { x: cardX, y: cardY, bottom: cardBottom } = useElementBounding(card);
const showBacklight = ref(false);

const subtaskAmount = computed(() => props.task.childId?.length || 0);
const subtaskChilds = computed(() => props.task.childId);
const subtaskCompletedAmount = computed(() => {
  const amount = subtaskChilds.value?.filter((subId) => {
    const subs = tasksStore.getTaskById(subId);

    return subs.isDone;
  });

  return amount?.length || 0;
});

function handleOpenCalendar(): void {
  options.value.handleCalendar();
}

function setCardBacklight() {
  showBacklight.value = true;
  setTimeout(() => {
    showBacklight.value = false;
  }, 800);
}

function handleDeleteTask(id: string): void {
  closeDeleteModal();
  tasksStore.deleteTask(id);
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
  tasksStore.toggleIsDone(id);
}

function toggleIsPriority(id: string): void {
  tasksStore.toggleIsPriority(id);
}

function handleDuplicateTask(id: string): void {
  tasksStore.duplicateTask(id);
}

function handleUpdateDate(date: Date): void {
  tasksStore.updateDate(props.task.id, date);
}

function handleAddSubtask(): void {
  route.name === 'today'
    ? router.push({ name: 'taskToday', params: { taskid: props.task.id }, hash: '#subtask' })
    : router.push({ name: 'task', params: { taskid: props.task.id }, hash: '#subtask' });
}

function handleUpdateTask(content: Partial<Task>): void {
  toggleEditModal();
  tasksStore.updateTask(props.task.id, content);
}
</script>
