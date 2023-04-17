<template>
  <form
    id="form"
    class="relative border w-full rounded-lg focus-within:border-accent-content my-1.5 px-4">
    <div class="py-3">
      <TaskEditorInput
        ref="taskTitleInput"
        v-model.trim="taskTitle"
        v-focus
        maxlength="100"
        placeholder="Task name"
        class="font-semibold">
      </TaskEditorInput>
      <TaskEditorInput
        ref="taskDescriptionInput"
        v-model.trim="taskDescription"
        maxlength="240"
        placeholder="Description">
      </TaskEditorInput>

      <div class="mt-2 flex">
        <TheTooltip
          class="!tooltip-top"
          data="Set due date">
          <BaseButton
            class="btn btn-xs btn-ghost rounded border border-base-300 hover:bg-base-200 font-normal"
            @click.prevent="handleCalendar">
            <template v-if="date">
              <TaskTimeDetail class="mx-1">
                <template #time>
                  <span class="pt-0.5">{{ showInputDetailTime }}</span>
                </template>
              </TaskTimeDetail>
            </template>
            <template v-else> Due Date </template>
            <template
              v-if="!date"
              #icon>
              <IconCalendar class="mr-1" />
            </template>
          </BaseButton>
        </TheTooltip>
        <TheTooltip
          class="!tooltip-top flex"
          data="Clear date">
          <BaseButton
            v-if="date"
            aria-label="Clear date"
            class="btn-ghost btn-xs p-0 border border-base-300 hover:bg-base-200 rounded"
            @click.prevent="clearDate">
            <template #icon>
              <IconClose />
            </template>
          </BaseButton>
        </TheTooltip>

        <TheTooltip
          class="!tooltip-top flex"
          data="Set priority">
          <BaseButton
            class="btn btn-xs btn-ghost rounded border border-base-300 hover:bg-base-200 font-normal pl-0.5 ml-3"
            :class="{ 'bg-base-300': taskIsPriority }"
            @click.prevent="togglePriority"
            ><template #icon>
              <IconImportantSmall />
            </template>
            Priority
          </BaseButton>
        </TheTooltip>
      </div>
    </div>

    <div class="flex justify-between border-t py-3">
      <div class="flex gap-1">
        <TheTooltip
          class="!tooltip-top flex"
          data="Select a project">
          <ProjectList
            v-model="selectedProject"
            :current-project="currentProject || inbox" />
        </TheTooltip>

        <ProjectAddButton
          class="h-full"
          @click.prevent="handleAddProject"></ProjectAddButton>

        <teleport to="body">
          <ProjectModal
            v-if="isProjectModalOpen"
            modal-title="Add project"
            action-title="Add"
            @action="addProject"
            @close-editor="handleCloseEditor">
          </ProjectModal>
        </teleport>
      </div>

      <div>
        <BaseButton
          class="btn btn-sm border-transparent mr-2 bg-base-200 hover:bg-base-300 text-neutral-focus"
          @click.prevent="closeEditor"
          >Cancel</BaseButton
        >

        <BaseButton
          class="btn btn-sm bg-accent border-transparent hover:bg-accent-focus text-neutral-content"
          :disabled="!taskTitle || !selectedProject"
          @click.prevent="addTask"
          >Add task</BaseButton
        >
      </div>
    </div>

    <Datepicker
      v-show="showPicker"
      ref="datepicker"
      v-model="date"
      teleport="#form"
      position="left"
      :min-date="new Date()"
      :start-time="startTime" />
  </form>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';

import Datepicker from '@vuepic/vue-datepicker';
import { storeToRefs } from 'pinia';
import { type Ref, ref, watch, watchEffect } from 'vue';

import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconImportantSmall from '@/components/icons/IconImportantSmall.vue';
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import ProjectModal from '@/components/projects/ProjectModal.vue';
import TaskEditorInput from '@/components/tasks/TaskEditorInput.vue';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useNotification } from '@/composables/useNotification';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { vFocus } from '@/directives/vAutoFocus';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import type { Project } from '@/types/models/Projects';

type Props = {
  currentProject?: Project | undefined;
};

const emit = defineEmits<{
  (e: 'closeEditor'): void;
}>();

const props = defineProps<Props>();
const projectsStore = useProjectsStore();
const store = useTasksStore();
const taskTitle = ref('');
const taskDescription = ref('');
const taskTitleInput: Ref<InstanceType<typeof HTMLInputElement> | null> = ref(null);
const taskDescriptionInput: Ref<HTMLInputElement | null> = ref(null);
const date: Ref<Date | undefined> = ref();
const datepicker = ref();
const showPicker = ref(false);
const { showInputDetailTime } = useTimeDetail(date);
const startTime = ref({ hours: 0, minutes: 0 });
const inputTaskDate: Ref<Date | undefined> = ref();
const taskIsPriority = ref(false);
const isProjectModalOpen = ref(false);
const { getProjectById } = storeToRefs(projectsStore);
const inbox = getProjectById.value('inbox');
const selectedProject = ref(props.currentProject);

watch(date, (newDate) => {
  inputTaskDate.value = newDate;
});

watchEffect(() => {
  selectedProject.value = props.currentProject || inbox;
});

function addTask(): void {
  const options = {
    title: taskTitle.value,
    description: taskDescription.value,
    date: date.value,
    isPriority: taskIsPriority.value,
    projectId: selectedProject.value?.id ?? 'inbox',
  };

  store.addTask(options);
  taskTitle.value = '';
  taskDescription.value = '';
  taskIsPriority.value = false;
  taskTitleInput.value?.focus();
  clearDate();

  useNotification(NotificationMessage.TaskAdd);
}

function handleCloseEditor(): void {
  isProjectModalOpen.value = false;
}

function handleAddProject(): void {
  isProjectModalOpen.value = true;
}

function handleCalendar(): void {
  datepicker.value?.openMenu();
}

function togglePriority(): void {
  taskIsPriority.value = !taskIsPriority.value;
}

function clearDate(): void {
  datepicker.value?.clearValue();
}

function closeEditor(): void {
  emit('closeEditor');
}

function addProject(project: Project): void {
  projectsStore.addProject(project);
  useNotification(NotificationMessage.AddProject);
  handleCloseEditor();
}
</script>
