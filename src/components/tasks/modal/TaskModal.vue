<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div
      id="task-modal"
      ref="target"
      class="!rounded-xl modal-box !max-h-screen overflow-visible p-0 md:min-w-[720px] min-h-[600px]">
      <div class="flex justify-between items-center border-b px-4 h-14">
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
          <TaskModalAction tooltip-data="More actions">
            <IconHorizontalDots />
          </TaskModalAction>
          <TaskModalAction
            tooltip-data="Close modal"
            @click.prevent="closeModal">
            <IconClose />
          </TaskModalAction>
        </nav>
      </div>
      <section class="flex">
        <main class="flex flex-col gap-4 w-full p-4">
          <div class="flex">
            <TaskCheckbox
              class="pt-3 mx-0.5 checkbox-xs"
              :is-done="task.done"
              :is-priority="task.isPriority"
              @toggle="toggleIsDone" />
            <TaskEditorSlim
              v-if="isTaskEditorActive"
              class="ml-1"
              :title="task.title"
              :description="task.description"
              @update-task="handleUpdateTask"
              @close-editor="isTaskEditorActive = false" />
            <div
              v-else
              class="flex flex-col rounded-md p-2 cursor-pointer gap-2 w-full ml-1"
              :class="{ 'line-through': task.done }"
              @click="openTaskEditor">
              <span class="font-bold">{{ task.title }}</span>
              <span>{{ task.description }}</span>
            </div>
          </div>
          <div class="ml-8 relative">
            <span
              class="before:absolute before:top-0 before:left-0 before:w-2 before:h-10 before:bg-black before:content-none before:block"
              >span</span
            >
            <TaskEditor
              v-if="isSubtaskEdtiorActive"
              :sub-task="true"
              @close-editor="isSubtaskEdtiorActive = false" />
            <SubtaskAddButton
              v-else
              @click="openSubtaskEditor" />
          </div>
        </main>

        <aside class="bg-base-200 rounded-br-xl w-96 p-4 min-h-[660px]">
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
                class="!tooltip-top flex"
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
import { computed, onMounted, onUpdated, type Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconHorizontalDots from '@/components/icons/IconHorizontalDots.vue';
import IconImportantSmall from '@/components/icons/IconImportantSmall.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import TaskCheckbox from '@/components/tasks/card/TaskCheckbox.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskEditorSlim from '@/components/tasks/editor/TaskEditorSlim.vue';
import SubtaskAddButton from '@/components/tasks/modal/SubtaskAddButton.vue';
import TaskModalAction from '@/components/tasks/modal/TaskModalAction.vue';
import TaskModalOption from '@/components/tasks/modal/TaskModalOption.vue';
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
const projectId = route.params.id as string;
const taskId = computed(() => route.params.taskid as string);
const task = computed(() => store.getTaskById(taskId.value)!);
const initialTasks = store.getProjectTasks(projectId);
const taskProject = computed(() => storeProjects.getProjectById(task.value.projectId));
const selectedProject = ref(taskProject.value);

const currentDate = computed(() => store.getTaskDate(task.value.id));
const date: Ref<Date | undefined> = ref(task.value.date);
const datepicker = ref();
const startTime = ref({ hours: 12, minutes: 0 });
const target = ref();
const isTaskEditorActive = ref(false);
const isSubtaskEdtiorActive = ref(false);

onMounted(() => {
  isSubtaskEdtiorActive.value = !!(route.hash === '#subtask');
});

onUpdated(() => {
  // console.log(currentDate.value);
  // console.log(date.value);
});

async function moveToPrevTask(): Promise<void> {
  try {
    const idx = findIndex(taskId.value, initialTasks);

    if (idx <= 0) return;
    const { id: prevId } = findItem(initialTasks[idx - 1].id, initialTasks);

    await router.push({ name: 'task', params: { taskid: prevId } });
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

    await router.push({ name: 'task', params: { taskid: nextId } });
    selectedProject.value = taskProject.value;
    date.value = currentDate.value;
  } catch (error) {
    console.log(error);
  }
}

function handleUpdateDate(date: Date): void {
  store.updateDate(taskId.value, date);
}

function openTaskEditor(): void {
  isTaskEditorActive.value = true;
  isSubtaskEdtiorActive.value = false;
}

function openSubtaskEditor(): void {
  isTaskEditorActive.value = false;
  isSubtaskEdtiorActive.value = true;
}

function handleUpdateTask(content: Partial<Task>): void {
  store.updateTask(taskId.value, content);
  closeEditors();
}

function toggleIsDone(): void {
  store.toggleIsDone(taskId.value);
}

function closeEditors(): void {
  isTaskEditorActive.value = false;
  isSubtaskEdtiorActive.value = false;
}

function handleMoveTask(): void {
  if (selectedProject.value) {
    store.moveTask(task.value.id, selectedProject.value.id);
  }
}

function togglePriority(): void {
  store.toggleIsPriority(task.value.id);
}

function closeModal(): void {
  router.push({ name: 'project', params: { id: projectId } });
}
onClickOutside(target, () => router.push({ name: 'project', params: { id: projectId } }));
useFocusTrap(target, {
  immediate: true,
});
</script>
