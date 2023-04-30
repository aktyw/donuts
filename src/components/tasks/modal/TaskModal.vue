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
            :to="{ name: 'project', params: { id: currentProject?.id || 'inbox' } }"
            :name="currentProject?.name"
            :custom-tooltip="true"
            :fill="currentProject?.color">
            <span class="items-center">{{ currentProject?.name }}</span>
          </ProjectLink>
        </div>
        <nav class="flex gap-2 items-center">
          <TaskModalAction
            tooltip-data="Previous task"
            :disabled="!isPrevTask"
            :class="{ 'cursor-not-allowed bg-base-100, color-red-500': !isPrevTask }"
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
                  <span class="font-bold break-words">{{ currentTask.title }}</span> ?
                </p>
              </template>
            </ModalConfirmDelete>
          </Teleport>
        </nav>
      </div>

      <section class="flex h-full">
        <main class="flex flex-col gap-4 w-full h-full p-4">
          <div
            v-if="hasParent"
            class="flex items-center justify-between border rounded-md mx-0.5 w-40 h-10">
            <ParentTaskButton :parent="parentTask" />
            <ParentSubTaskDropdown :subtasks="subTasks" />
          </div>
          <div class="flex">
            <TaskCheckbox
              class="pt-3 mx-0.5 checkbox-xs"
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
              @click="openTaskEditor">
              {{ currentTask.title }}
              <template #desc>
                {{ currentTask.description }}
              </template>
            </TaskShowSlim>
          </div>
          <div class="ml-8 relative">
            <TaskEditor
              v-if="isSubtaskEdtiorActive"
              :is-sub-task="true"
              :task="currentTask"
              :current-project="currentProject"
              @close-editor="isSubtaskEdtiorActive = false" />
            <!-- <ul
              v-if="subTasks"
              class="before:absolute before:top-0 before:left-0 before:w-2 before:h-10 before:bg-black before:content-none before:block">
              <RouterLink
                v-for="sub in subTasks"
                :key="sub.id"
                :title="sub.title">
                {{ sub.title }}
              </RouterLink>
            </ul> -->
            <SubtaskAddButton
              v-if="!isSubtaskEdtiorActive"
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
                :current-project="currentProject"
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
                  :class="{ '!bg-base-100': currentTask.isPriority }"
                  class="hover:!bg-base-100"
                  :is-toggle="currentTask.isPriority"
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
import { computed, inject, onMounted, onUpdated, type Ref, ref, unref } from 'vue';
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
import ParentSubTaskDropdown from '@/components/tasks/modal/ParentSubTaskDropdown.vue';
import ParentTaskButton from '@/components/tasks/modal/ParentTaskButton.vue';
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

const currentTaskId = computed(() => route.params.taskid as string);
const currentTask = computed(() => store.getTaskById(currentTaskId.value));
const currentProject = computed(() => storeProjects.getProjectById(currentTask.value.projectId));
const currentIndex = computed(() => findIndex(currentTaskId.value, initialTasks));
const currentDate = computed(() => store.getTaskDate(currentTask.value.id));

const parentTask = computed(() => {
  const parentTaskId = currentTask.value.parentId;

  return store.getTaskById(parentTaskId);
});

const subTasks = computed(() => {
  const subTasksId = currentTask.value.childId;

  return subTasksId.map((id: string) => store.getTaskById(id));
});

const initialTasks = unref(inject('tasks') as Task[]);
const initialProject = storeProjects.getProjectById(currentTask.value.projectId);
const selectedProject = ref(currentProject.value);

const date: Ref<Date | undefined> = ref(currentTask.value.date);
const datepicker = ref();
const startTime = ref({ hours: 12, minutes: 0 });
const isTaskEditorActive = ref(false);
const isSubtaskEdtiorActive = ref(false);
const deleteConfirm = ref(false);
const target = ref();

const isPrevTask = computed(() => {
  return currentIndex.value > 0;
});

const isNextTask = computed(() => {
  return currentIndex.value < initialTasks.length - 1;
});

const hasParent = computed(() => !!parentTask.value);

onUpdated(() => {});

onMounted(() => {
  isSubtaskEdtiorActive.value = !!(route.hash === '#subtask');
  console.log(route.path);
  console.log(route.params);
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

function handleDeleteTask(): void {
  store.deleteTask(currentTask.value.id);
  closeModal();
}

function closeModal(): void {
  const parentRoute = route.matched[1].name;

  parentRoute === 'project'
    ? router.push({ name: parentRoute, params: { id: initialProject?.id || 'inbox' } })
    : router.push({ name: parentRoute });
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
