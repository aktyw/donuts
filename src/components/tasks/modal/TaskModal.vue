<template>
  <div
    ref="target"
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div
      id="task-modal"
      class="!rounded-xl modal-box !max-h-screen overflow-visible p-0 md:min-w-[720px] min-h-[600px]">
      <div class="flex justify-between items-center border-b px-4 h-14">
        <div>
          <ProjectLink
            class="hover:!bg-base-100 hover:underline"
            :to="{ name: 'project', params: { id: currentProject?.id } }"
            :name="currentProject?.name"
            :custom-tooltip="true"
            :fill="currentProject?.color"
            @click="closeModal">
            <span class="items-center">{{ currentProject?.name }}</span>
          </ProjectLink>
        </div>
        <nav class="flex gap-2 items-center">
          <TaskModalAction tooltip-data="Previous task">
            <IconChevronDown class="rotate-180" />
          </TaskModalAction>
          <TaskModalAction tooltip-data="Next task">
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
              @click="toggleIsDone" />
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
                class="select-sm px-2 bg-base-200 hover:bg-base-100 transition duration-300 border-none w-full max-w-[16rem]"
                :current-project="currentProject" />
            </TaskModalOption>
            <TaskModalOption title="Due date">
              <Datepicker
                ref="datepicker"
                v-model="date"
                position="center"
                :min-date="new Date()"
                :start-time="startTime" />
            </TaskModalOption>
            <TaskModalOption title="Priority"> </TaskModalOption>

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
import { computed, onMounted, onUpdated, type Ref, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconHorizontalDots from '@/components/icons/IconHorizontalDots.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import TaskCheckbox from '@/components/tasks/card/TaskCheckbox.vue';
import TaskEditor from '@/components/tasks/editor/TaskEditor.vue';
import TaskEditorSlim from '@/components/tasks/editor/TaskEditorSlim.vue';
import SubtaskAddButton from '@/components/tasks/modal/SubtaskAddButton.vue';
import TaskModalAction from '@/components/tasks/modal/TaskModalAction.vue';
import TaskModalOption from '@/components/tasks/modal/TaskModalOption.vue';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

const route = useRoute();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
  (event: 'closeModal'): void;
}>();

const storeProjects = useProjectsStore();
const store = useTasksStore();

const projectId = route.params.id as string;
const taskId = route.params.taskid as string;
const task = computed(() => store.getTaskById(taskId));
const currentProject = computed(() => storeProjects.getProjectById(projectId));
const currentDate = computed(() => store.getTaskDate(taskId));
const date: Ref<Date | undefined> = ref(currentDate.value);
const datepicker = ref();
const startTime = ref({ hours: 12, minutes: 0 });
const target = ref();
const isTaskEditorActive = ref(false);
const isSubtaskEdtiorActive = ref(false);

onMounted(() => {
  isSubtaskEdtiorActive.value = !!(route.hash === '#subtask');
});

onUpdated(() => {
  console.log(task.value);
});

function openTaskEditor(): void {
  isTaskEditorActive.value = true;
  isSubtaskEdtiorActive.value = false;
}

function openSubtaskEditor(): void {
  isTaskEditorActive.value = false;
  isSubtaskEdtiorActive.value = true;
}

function handleUpdateTask(content: Partial<Task>): void {
  store.updateTask(taskId, content);
  closeEditors();
}

function toggleIsDone(): void {
  store.toggleIsDone(taskId);
}

function closeEditors(): void {
  isTaskEditorActive.value = false;
  isSubtaskEdtiorActive.value = false;
}

function closeModal(): void {
  emit('closeModal');
}

onClickOutside(target, () => closeModal());

useFocusTrap(target, {
  immediate: true,
});
</script>
