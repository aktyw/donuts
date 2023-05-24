<template>
  <form
    id="form"
    class="relative my-1.5 w-full rounded-lg border px-4 focus-within:border-accent-content">
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
          <ButtonBadgeMedium @click.prevent="handleCalendar">
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
          </ButtonBadgeMedium>
        </TheTooltip>

        <TheTooltip
          class="!tooltip-top flex"
          data="Clear date">
          <BaseButton
            v-if="date"
            aria-label="Clear date"
            class="btn-ghost btn-xs rounded border border-base-300 p-0 hover:bg-base-200"
            @click.prevent="clearDate">
            <template #icon>
              <IconClose />
            </template>
          </BaseButton>
        </TheTooltip>

        <TheTooltip
          class="!tooltip-top flex"
          data="Set priority">
          <ButtonBadgeMedium
            class="ml-3 pl-0.5"
            :is-toggle="taskIsPriority"
            @click.prevent="togglePriority"
            ><template #icon>
              <IconImportantSmall />
            </template>
            Priority
          </ButtonBadgeMedium>
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
          v-if="!quickTask && !isSubTask"
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
        <ButtonSecondaryAction @click.prevent="closeEditor">Cancel</ButtonSecondaryAction>
        <ButtonMainAction
          v-if="!isEdit"
          :disabled="!taskTitle || !selectedProject"
          @click.prevent="handleAddTask"
          >Add task</ButtonMainAction
        >

        <ButtonMainAction
          v-else
          :disabled="!taskTitle || !selectedProject"
          @click.prevent="handleUpdateTask"
          >Save</ButtonMainAction
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
      :start-time="startTime"
      @open="storeSettings.setModal({ modal: 'calendar', value: true })"
      @closed="storeSettings.setModal({ modal: 'calendar', value: false })" />
  </form>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';

import Datepicker from '@vuepic/vue-datepicker';
import { storeToRefs } from 'pinia';
import { type Ref, ref, watch, watchEffect } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconImportantSmall from '@/components/icons/IconImportantSmall.vue';
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import ProjectModal from '@/components/projects/ProjectModal.vue';
import TaskTimeDetail from '@/components/tasks/card/TaskTimeDetail.vue';
import TaskEditorInput from '@/components/tasks/editor/TaskEditorInput.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import ButtonBadgeMedium from '@/components/ui/buttons/ButtonBadgeMedium.vue';
import ButtonMainAction from '@/components/ui/buttons/ButtonMainAction.vue';
import ButtonSecondaryAction from '@/components/ui/buttons/ButtonSecondaryAction.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { vFocus } from '@/directives/vAutoFocus';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Project } from '@/types/models/Projects';
import type { Task } from '@/types/models/Task';

type Props = {
  isEdit?: boolean;
  currentProject?: Project | undefined;
  quickTask?: boolean;
  isSubTask?: boolean;
  task?: Task;
  isPriority?: boolean;
  date?: Date;
  title?: string;
  description?: string;
};

const emit = defineEmits<{
  (e: 'closeEditor'): void;
  (e: 'addTask'): void;
  (e: 'updateTask', options: Partial<Task>): void;
}>();

const props = defineProps<Props>();
const projectsStore = useProjectsStore();
const storeSettings = useSettingsStore();
const store = useTasksStore();
const taskTitle = ref(props.title || '');
const taskDescription = ref(props.description || '');
const taskTitleInput: Ref<InstanceType<typeof HTMLInputElement> | null> = ref(null);
const taskDescriptionInput: Ref<HTMLInputElement | null> = ref(null);
const date: Ref<Date | undefined> = ref(props.date);
const datepicker = ref();
const showPicker = ref(false);
const { showInputDetailTime } = useTimeDetail(date);
const startTime = ref({ hours: 0, minutes: 0 });
const inputTaskDate: Ref<Date | undefined> = ref();
const taskIsPriority = ref(props.isPriority);
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

function handleAddTask(): void {
  const options = {
    title: taskTitle.value,
    description: taskDescription.value,
    isPriority: taskIsPriority.value,
    date: date.value,
    projectId: selectedProject.value?.id ?? 'inbox',
    parentId: selectedProject.value?.id === props?.task?.projectId ? props?.task?.id : null,
  };

  store.addTask(options);
  taskTitle.value = '';
  taskDescription.value = '';
  taskIsPriority.value = false;
  taskTitleInput.value?.focus();
  clearDate();

  emit('addTask');
}

function handleUpdateTask(): void {
  const options = {
    title: taskTitle.value,
    description: taskDescription.value,
    date: date.value,
    isPriority: taskIsPriority.value,
    projectId: selectedProject.value?.id ?? 'inbox',
  };

  emit('updateTask', options);
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
  handleCloseEditor();
}
</script>
