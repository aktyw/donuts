<template>
  <FadeTransitionMedium>
    <div
      class="modal modal-open sm:modal-middle"
      role="dialog">
      <div
        id="task-modal"
        ref="target"
        class="modal-box fixed top-12 flex h-[calc(100vh_-_6rem)] !max-h-screen min-h-[460px] flex-col overflow-visible !rounded-xl p-0 md:min-w-[720px]">
        <div class="flex items-center justify-between border-b px-4 py-2">
          <div>
            <ProjectLink
              class="hover:!bg-base-100 hover:underline"
              :to="{ name: 'project', params: { id: currentProject?.id || 'inbox' } }"
              :name="currentProject?.name"
              :custom-tooltip="true"
              :fill="currentProject?.color">
              <span class="items-center">{{ currentProject?.name }}</span>
            </ProjectLink>
          </div>
          <nav class="flex items-center gap-2">
            <TaskModalAction
              tooltip-data="Previous task"
              :disabled="!isPrevTask"
              :class="{ 'bg-base-100, color-red-500 cursor-not-allowed': !isPrevTask }"
              @click.stop="moveToPrevTask">
              <IconChevronDown
                class="rotate-180"
                :class="{ 'fill-base-300': !isPrevTask }" />
            </TaskModalAction>
            <TaskModalAction
              tooltip-data="Next task"
              :disabled="!isNextTask"
              :class="{ 'cursor-not-allowed bg-base-100': !isNextTask }"
              @click.stop="moveToNextTask">
              <IconChevronDown :class="{ 'fill-base-300': !isNextTask }" />
            </TaskModalAction>
            <TaskModalNavbarDropdown
              :task="currentTask"
              @view-activity-task="handleShowActivityTask"
              @delete-task="toggleDeleteModal"
              @print-task="handlePrintTask" />
            <TaskModalAction
              tooltip-data="Close modal"
              @click.prevent="closeModal">
              <IconClose />
            </TaskModalAction>

            <Teleport to="body">
              <ModalConfirmDelete
                v-if="deleteConfirm"
                :is-danger="true"
                @cancel="cancelDeleteTask"
                @action="handleDeleteTask">
                Delete task
                <template #content>
                  <p>
                    Do you really want to delete
                    <span class="break-words font-bold">{{ currentTask.title }}</span>
                    ?
                  </p>
                </template>
              </ModalConfirmDelete>
            </Teleport>
          </nav>
        </div>

        <section class="flex h-full flex-col overflow-hidden md:flex-row">
          <main class="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
            <SubParentLinks v-if="hasParent" />
            <div class="flex">
              <TaskCheckbox
                class="checkbox-xs mx-0.5 pt-3"
                :is-done="currentTask.isDone"
                :is-priority="currentTask.isPriority"
                @toggle="toggleIsDone" />
              <TaskEditorSlim
                v-if="isTaskEditorActive"
                class="ml-1"
                :title="currentTask.title"
                :description="currentTask.description"
                @update-task="handleUpdateTask"
                @close-editor="isTaskEditorActive = false" />
              <TaskShowSlim
                v-else
                :class="{ 'line-through': currentTask.isDone }"
                @click.stop="openTaskEditor">
                {{ currentTask.title }}
                <template #desc>
                  {{ currentTask.description }}
                </template>
              </TaskShowSlim>
            </div>
            <div class="relative ml-8">
              <SubtaskList
                v-if="subTasks"
                :subtasks="subTasks" />
              <TaskEditor
                v-if="isSubtaskEditorActive"
                :is-sub-task="true"
                :task="currentTask"
                :current-project="currentProject"
                @close-editor="isSubtaskEditorActive = false" />
              <SubtaskAddButton
                v-if="!isSubtaskEditorActive"
                class="print:hidden"
                @click.stop="openSubtaskEditor" />
            </div>
          </main>

          <aside class="rounded-b-xl bg-base-200 p-4 md:w-96 md:rounded-none md:rounded-br-xl">
            <div class="flex flex-col">
              <TaskModalOption title="Project">
                <ProjectList
                  v-model="selectedProject"
                  class="select-sm w-full max-w-[14rem] lg:w-full border-none bg-base-100 px-2 transition duration-300 hover:bg-base-100"
                  :current-project="currentProject"
                  @change="handleMoveTask" />
              </TaskModalOption>
              <TaskModalOption title="Due date">
                <Datepicker
                  ref="datepicker"
                  v-model="date"
                  teleport-center
                  :min-date="new Date()"
                  :start-time="startTime"
                  @open="settingsStore.setModal({ modal: 'calendar', value: true })"
                  @closed="settingsStore.setModal({ modal: 'calendar', value: false })"
                  @update:model-value="handleUpdateDate" />
              </TaskModalOption>
              <TaskModalOption title="Priority">
                <TheTooltip
                  class="!tooltip-top"
                  data="Set priority">
                  <ButtonBadgeMedium
                    :class="{ '!bg-base-100': currentTask.isPriority }"
                    class="hover:!bg-base-100 gap-1"
                    :is-toggle="currentTask.isPriority"
                    @click.prevent="togglePriority">
                    <template #icon>
                      <IconFlag class="-ml-1" />
                    </template>
                    Priority
                  </ButtonBadgeMedium>
                </TheTooltip>
              </TaskModalOption>
            </div>
          </aside>
        </section>
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import { onClickOutside } from '@vueuse/core';
import { computed, inject, onMounted, onUnmounted, provide, type Ref, ref, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconFlag from '@/components/icons/IconFlag.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import TaskCheckbox from '@/components/tasks/card/TaskCheckbox.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskEditorSlim from '@/components/tasks/editor/TaskEditorSlim.vue';
import SubParentLinks from '@/components/tasks/modal/SubParentLinks.vue';
import SubtaskAddButton from '@/components/tasks/modal/SubtaskAddButton.vue';
import SubtaskList from '@/components/tasks/modal/SubtaskList.vue';
import TaskModalAction from '@/components/tasks/modal/TaskModalAction.vue';
import TaskModalNavbarDropdown from '@/components/tasks/modal/TaskModalNavbarDropdown.vue';
import TaskModalOption from '@/components/tasks/modal/TaskModalOption.vue';
import TaskShowSlim from '@/components/tasks/modal/TaskShowSlim.vue';
import ButtonBadgeMedium from '@/components/ui/buttons/ButtonBadgeMedium.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

import { findIndex } from '../../../helpers/findIndex';
import { findItem } from '../../../helpers/findItem';

onMounted(() => {
  settingsStore.setModal({ modal: 'task', value: true });
});

onUnmounted(() => {
  settingsStore.setModal({ modal: 'task', value: false });
});

const route = useRoute();
const router = useRouter();

defineEmits<{
  (event: 'update:modelValue', payload: string): void;
}>();

const projectsStore = useProjectsStore();
const settingsStore = useSettingsStore();
const store = useTasksStore();

const currentTaskId = computed(() => route.params.taskid as string);
const currentTask = computed(() => store.getTaskById(currentTaskId.value));
const currentProject = computed(() => projectsStore.getProjectById(currentTask?.value?.projectId));
const currentIndex = computed(() => findIndex(currentTaskId.value, initialTasks));
const currentDate = computed(() => store.getTaskDate(currentTask.value.id));

const parentTask = computed(() => {
  const parentTaskId = currentTask.value.parentId;

  return store.getTaskById(parentTaskId);
});

provide('parentTask', parentTask);

const subTasks = computed(() => {
  const subTasksId = currentTask.value.childId;

  return subTasksId.map((id: string) => store.getTaskById(id));
});

const initialTasks = unref(inject('tasks') as Task[]);
const initialProject = projectsStore.getProjectById(currentTask.value.projectId);
const selectedProject = ref(currentProject.value);

const date: Ref<Date | undefined> = ref(currentTask.value.date);
const datepicker = ref();
const startTime = ref({ hours: 12, minutes: 0 });
const isTaskEditorActive = ref(false);
const isSubtaskEditorActive = ref(false);
const subtaskDeleteConfirm = computed(() => settingsStore.getModalStatus('deleteTaskConfirm'));
const isCalendarOpen = computed(() => settingsStore.getModalStatus('calendar'));
const isMoveProjectOpen = computed(() => settingsStore.getModalStatus('moveProject'));
const deleteConfirm = ref(false);
const target = ref();

const isPrevTask = computed(() => {
  return currentIndex.value > 0;
});

const isNextTask = computed(() => {
  return currentIndex.value < initialTasks.length - 1;
});

const hasParent = computed(() => !!parentTask.value);

onMounted(() => {
  isSubtaskEditorActive.value = !!(route.hash === '#subtask');
});

async function moveToPrevTask(): Promise<void> {
  try {
    if (!isPrevTask.value) return;

    const { id: prevId } = findItem(initialTasks[currentIndex.value - 1].id, initialTasks);

    await router.push({ params: { taskid: prevId } });

    selectedProject.value = currentProject.value;
    date.value = currentDate.value;
  } catch (error) {
    console.log(error);
  }
}

async function moveToNextTask(): Promise<void> {
  try {
    if (!isNextTask.value) return;

    const { id: nextId } = findItem(initialTasks[currentIndex.value + 1].id, initialTasks);

    await router.push({ params: { taskid: nextId } });

    selectedProject.value = currentProject.value;
    date.value = currentDate.value;
  } catch (error) {
    console.log(error);
  }
}

function handleUpdateTask(content: Partial<Task>): void {
  store.updateTask(currentTaskId.value, content);
  closeEditors();
}

function handleUpdateDate(date: Date): void {
  store.updateDate(currentTaskId.value, date);
}

function handleMoveTask(): void {
  if (selectedProject.value) {
    store.moveTask(currentTask.value.id, selectedProject.value.id);
  }
}

function toggleIsDone(): void {
  store.toggleIsDone(currentTaskId.value);
}

function togglePriority(): void {
  store.toggleIsPriority(currentTask.value.id);
}

function handlePrintTask(): void {
  print();
}

function closeModal(): void {
  const parentRoute = route.matched[1].name;

  parentRoute === 'project'
    ? router.push({ name: parentRoute, params: { id: initialProject?.id || 'inbox' } })
    : router.push({ name: parentRoute });
}

function closeEditors(): void {
  isTaskEditorActive.value = false;
  isSubtaskEditorActive.value = false;
}

function toggleDeleteModal(): void {
  deleteConfirm.value = !deleteConfirm.value;
}

function cancelDeleteTask(): void {
  toggleDeleteModal();
}

function handleDeleteTask(): void {
  store.deleteTask(currentTask.value.id);
  closeModal();
}

function handleShowActivityTask(): void {
  router.push({ name: 'activityTask', params: { id: route.params.taskid } });
}

function openTaskEditor(): void {
  isTaskEditorActive.value = true;
  isSubtaskEditorActive.value = false;
}

function openSubtaskEditor(): void {
  isTaskEditorActive.value = false;
  isSubtaskEditorActive.value = true;
}

onClickOutside(target, (e) => {
  const notification = (e.target as HTMLElement)?.closest('#notification');

  if (
    deleteConfirm.value ||
    subtaskDeleteConfirm.value ||
    isCalendarOpen.value ||
    isMoveProjectOpen.value ||
    notification
  )
    return;
  closeModal();
});
</script>
