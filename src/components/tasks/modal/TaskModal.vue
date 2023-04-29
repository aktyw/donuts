<template>
  <div
    class="modal sm:modal-middle modal-open"
    role="dialog">
    <div
      id="task-modal"
      ref="target"
      class="fixed flex flex-col modal-box top-12 !rounded-xl !max-h-screen overflow-visible p-0 md:min-w-[720px] min-h-[460px] h-[calc(100vh_-_6rem)]">
      <div class="flex justify-between items-center border-b px-4 py-2">
        <div>
          <ProjectLink
            class="hover:!bg-base-100 hover:underline"
            :to="{ name: 'project', params: { id: taskProject?.id || 'inbox' } }"
            :name="taskProject?.name"
            :custom-tooltip="true"
            :fill="taskProject?.color">
            <span class="items-center">{{ taskProject?.name }}</span>
          </ProjectLink>
        </div>
        <nav class="flex gap-2 items-center">
          <TaskModalAction
            tooltip-data="Previous task"
            @click="moveToPrevTask">
            <IconChevronDown class="rotate-180" />
          </TaskModalAction>
          <TaskModalAction
            tooltip-data="Next task"
            @click="moveToNextTask">
            <IconChevronDown />
          </TaskModalAction>
          <TaskModalNavbarDropdown
            :task="task"
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
              @action="handleDeleteTask"
              >Delete task
              <template #content>
                <p>
                  Do you really want to delete
                  <span class="font-bold break-words">{{ task.title }}</span> ?
                </p>
              </template>
            </ModalConfirmDelete>
          </Teleport>
        </nav>
      </div>
      <section class="flex h-full">
        <main class="flex flex-col gap-4 w-full h-full p-4">
          <div class="flex">
            <TaskCheckbox
              class="pt-3 mx-0.5 checkbox-xs"
              :is-done="task.isDone"
              :is-priority="task.isPriority"
              @toggle="toggleIsDone" />
            <TaskEditorSlim
              v-if="isTaskEditorActive"
              class="ml-1"
              :title="task.title"
              :description="task.description"
              @update-task="handleUpdateTask"
              @close-editor="isTaskEditorActive = false" />
            <TaskShowSlim
              v-else
              :class="{ 'line-through': task.isDone }"
              @click="openTaskEditor">
              {{ task.title }}
              <template #desc>
                {{ task.description }}
              </template>
            </TaskShowSlim>
          </div>
          <div class="ml-8 relative">
            <span
              class="before:absolute before:top-0 before:left-0 before:w-2 before:h-10 before:bg-black before:content-none before:block"
              >span</span
            >
            <TaskEditor
              v-if="isSubtaskEdtiorActive"
              :is-sub-task="true"
              :task="task"
              :current-project="taskProject"
              @close-editor="isSubtaskEdtiorActive = false" />
            <SubtaskAddButton
              v-else
              class="print:hidden"
              @click="openSubtaskEditor" />
          </div>
        </main>

        <aside class="bg-base-200 rounded-br-xl w-96 p-4">
          <div class="flex flex-col">
            <TaskModalOption title="Project">
              <ProjectList
                v-model="selectedProject"
                class="select-sm px-2 bg-base-100 hover:bg-base-100 transition duration-300 border-none w-full max-w-[16rem]"
                :current-project="taskProject"
                @change="handleMoveTask" />
            </TaskModalOption>
            <TaskModalOption title="Due date">
              <Datepicker
                ref="datepicker"
                v-model="date"
                position="center"
                :min-date="new Date()"
                :start-time="startTime"
                @update:model-value="handleUpdateDate" />
            </TaskModalOption>
            <TaskModalOption title="Priority">
              <TheTooltip
                class="!tooltip-top"
                data="Set priority">
                <ButtonBadgeMedium
                  :class="{ '!bg-base-100': task.isPriority }"
                  class="hover:!bg-base-100"
                  :is-toggle="task.isPriority"
                  @click.prevent="togglePriority"
                  ><template #icon>
                    <IconImportantSmall class="-ml-1.5" />
                  </template>
                  Is priority
                </ButtonBadgeMedium>
              </TheTooltip>
            </TaskModalOption>

            <div>
              <h3>Labels +btn</h3>
              <p>List labels badges</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { computed, type ComputedRef, inject, onMounted, onUpdated, type Ref, ref, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconImportantSmall from '@/components/icons/IconImportantSmall.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import TaskCheckbox from '@/components/tasks/card/TaskCheckbox.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskEditorSlim from '@/components/tasks/editor/TaskEditorSlim.vue';
import SubtaskAddButton from '@/components/tasks/modal/SubtaskAddButton.vue';
import TaskModalAction from '@/components/tasks/modal/TaskModalAction.vue';
import TaskModalNavbarDropdown from '@/components/tasks/modal/TaskModalNavbarDropdown.vue';
import TaskModalOption from '@/components/tasks/modal/TaskModalOption.vue';
import TaskShowSlim from '@/components/tasks/modal/TaskShowSlim.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import ButtonBadgeMedium from '@/components/ui/buttons/ButtonBadgeMedium.vue';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

import { findIndex } from '../../../helpers/findIndex';
import { findItem } from '../../../helpers/findItem';

const route = useRoute();
const router = useRouter();

defineEmits<{
  (event: 'update:modelValue', payload: string): void;
}>();

const storeProjects = useProjectsStore();
const store = useTasksStore();
const taskId = computed(() => route.params.taskid as string);
const task = computed(() => store.getTaskById(taskId.value)!);
const taskProject = computed(() => storeProjects.getProjectById(task.value.projectId));
const initialTasks = unref(inject('tasks') as Task[]);
// const initialTasks = unref(tasks);
const initialProject = storeProjects.getProjectById(task.value.projectId);
const selectedProject = ref(taskProject.value);
const deleteConfirm = ref(false);

const currentDate = computed(() => store.getTaskDate(task.value.id));
const date: Ref<Date | undefined> = ref(task.value.date);
const datepicker = ref();
const startTime = ref({ hours: 12, minutes: 0 });
const target = ref();
const isTaskEditorActive = ref(false);
const isSubtaskEdtiorActive = ref(false);

const exitRoutePushName = computed(() => {
  if (route.path.toString().includes('/tasks/project')) {
    return 'project';
  } else if (route.path.toString().includes('/tasks/today')) {
    return 'today';
  }

  return 'tasks';
});

onMounted(() => {
  isSubtaskEdtiorActive.value = !!(route.hash === '#subtask');

  console.log(route.path);
  console.log(initialTasks);
  console.log(initialTasks);
});

// onUpdated(() => {});

async function moveToPrevTask(): Promise<void> {
  try {
    const idx = findIndex(taskId.value, initialTasks);

    if (idx <= 0) return;
    const { id: prevId } = findItem(initialTasks[idx - 1].id, initialTasks);

    if (exitRoutePushName.value === 'today') {
      await router.push({ name: 'taskToday', params: { taskid: prevId } });
    } else {
      await router.push({ name: 'task', params: { taskid: prevId } });
    }
    selectedProject.value = taskProject.value;
    date.value = currentDate.value;
  } catch (error) {
    console.log(error);
  }
}

async function moveToNextTask(): Promise<void> {
  try {
    const idx = findIndex(taskId.value, initialTasks);

    if (idx >= initialTasks.length - 1) return;

    const { id: nextId } = findItem(initialTasks[idx + 1].id, initialTasks);

    if (exitRoutePushName.value === 'today') {
      await router.push({ name: 'taskToday', params: { taskid: nextId } });
    } else {
      await router.push({ name: 'task', params: { taskid: nextId } });
    }

    selectedProject.value = taskProject.value;
    date.value = currentDate.value;
  } catch (error) {
    console.log(error);
  }
}

function handleUpdateTask(content: Partial<Task>): void {
  store.updateTask(taskId.value, content);
  closeEditors();
}

function handleUpdateDate(date: Date): void {
  store.updateDate(taskId.value, date);
}

function handleMoveTask(): void {
  if (selectedProject.value) {
    store.moveTask(task.value.id, selectedProject.value.id);
  }
}

function toggleIsDone(): void {
  store.toggleIsDone(taskId.value);
}

function togglePriority(): void {
  store.toggleIsPriority(task.value.id);
}

function handlePrintTask(): void {
  print();
}

function handleDeleteTask(): void {
  store.deleteTask(task.value.id);
  closeModal();
}

function closeModal(): void {
  exitRoutePushName.value === 'project'
    ? router.push({ name: exitRoutePushName.value, params: { id: initialProject?.id || 'inbox' } })
    : router.push({ name: exitRoutePushName.value });
}

function closeEditors(): void {
  isTaskEditorActive.value = false;
  isSubtaskEdtiorActive.value = false;
}

function toggleDeleteModal(): void {
  deleteConfirm.value = !deleteConfirm.value;
}

function cancelDeleteTask(): void {
  toggleDeleteModal();
}

function openTaskEditor(): void {
  isTaskEditorActive.value = true;
  isSubtaskEdtiorActive.value = false;
}

function openSubtaskEditor(): void {
  isTaskEditorActive.value = false;
  isSubtaskEdtiorActive.value = true;
}

onClickOutside(target, () => {
  if (deleteConfirm.value) return;

  closeModal();
});

useFocusTrap(target, {
  immediate: true,
});
</script>
