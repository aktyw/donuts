<template>
  <div
    ref="dropdown"
    class="dropdown dropdown-left h-0 overflow-visible"
    :class="!isRoomForDropdown ? 'dropdown-top' : 'dropdown-bottom'">
    <button
      tabindex="0"
      aria-label="Show task options"
      class="btn btn-square rounded-md btn-xs bg-base-100 hover:bg-base-200 border-0 focus:bg-base-200 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
      <IconVerticalDots class="fill-base-content" />
    </button>

    <ul
      ref="dropList"
      role="menu"
      tabindex="1"
      class="dropdown-content menu py-0.5 shadow rounded-md w-60 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <OptionListButton @click="handleEditTask(taskId)">
        <template #icon>
          <IconPen />
        </template>
        Edit Task
      </OptionListButton>

      <OptionListButton @click="handleAddSubtask(taskId)">
        <template #icon>
          <IconAddSubtask />
        </template>
        Add Subtask
      </OptionListButton>

      <OptionListButton @click="openProjectList">
        <template #icon>
          <IconMove />
        </template>
        Move To Project
      </OptionListButton>

      <Teleport to="body">
        <ProjectListModal
          v-if="isProjectListActive"
          modal-title="Move to project"
          :current-project="currentProject"
          :task="props.task"
          @close-editor="closeProjectList">
        </ProjectListModal>
      </Teleport>

      <OptionListButton @click="handleDuplicateTask(taskId)">
        <template #icon>
          <IconDuplicate />
        </template>
        Duplicate Task
      </OptionListButton>

      <OptionListButton @click="handleCopyLinkTask">
        <template #icon>
          <IconLink />
        </template>
        Copy link to task
      </OptionListButton>

      <BaseDividerSmall />

      <OptionListButton
        :class="priorityStyle"
        @click="handleTogglePriority(taskId)">
        <template #icon>
          <IconImportant />
        </template>
        Toggle Priority
      </OptionListButton>

      <OptionListButton
        :class="doneStyle"
        @click="handleToggleIsDone(taskId)">
        <template #icon>
          <IconDone />
        </template>
        Toggle Done
      </OptionListButton>

      <BaseDividerSmall />

      <Datepicker
        v-if="storeSettings.getModalStatus('task')"
        v-show="showPicker"
        ref="datepicker"
        :value="currentDate"
        teleport="#subtasksList"
        position="right"
        :min-date="new Date()"
        :start-time="startTime"
        @open="storeSettings.setModal({ modal: 'calendar', value: true })"
        @closed="storeSettings.setModal({ modal: 'calendar', value: false })"
        @update:model-value="handleDate" />

      <Datepicker
        v-else
        v-show="showPicker"
        ref="datepicker"
        :value="currentDate"
        :teleport="true"
        :alt-position="setCustomPosition"
        :min-date="new Date()"
        :start-time="startTime"
        @open="storeSettings.setModal({ modal: 'calendar', value: true })"
        @closed="storeSettings.setModal({ modal: 'calendar', value: false })"
        @update:model-value="handleDate" />

      <OptionListButton
        ref="calendarOption"
        @click="handleCalendar">
        <template #icon>
          <IconClock />
        </template>
        {{ showInputDetailTime || 'Set Date' }}
      </OptionListButton>

      <OptionListButton>
        <template #icon>
          <IconBell />
        </template>
        Set Reminder
      </OptionListButton>

      <BaseDividerSmall />

      <OptionListButton
        class="hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content"
        @click="handleDeleteTask(taskId)">
        <template #icon>
          <IconRecycleBin />
        </template>
        Delete Task
      </OptionListButton>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import { useElementBounding, useWindowSize } from '@vueuse/core';
import { useClipboard } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, type Ref, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import BaseDividerSmall from '@/components/base/BaseDividerSmall.vue';
import IconAddSubtask from '@/components/icons/IconAddSubtask.vue';
import IconBell from '@/components/icons/IconBell.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconDone from '@/components/icons/IconDone.vue';
import IconDuplicate from '@/components/icons/IconDuplicate.vue';
import IconImportant from '@/components/icons/IconImportant.vue';
import IconLink from '@/components/icons/IconLink.vue';
import IconMove from '@/components/icons/IconMove.vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import IconVerticalDots from '@/components/icons/IconVerticalDots.vue';
import ProjectListModal from '@/components/projects/ProjectListModal.vue';
import OptionListButton from '@/components/tasks/list/OptionListButton.vue';
import { useNotification } from '@/composables/useNotification';
import { useTimeDetail } from '@/composables/useTimeDetail';
import blurElement from '@/helpers/blur';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import type { Task } from '@/types/models/Task';

type Props = {
  task: Task;
  taskId: string;
  coords: {
    cardX: number;
    cardY: number;
    cardBottom: number;
  };
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'deleteTask', id: string): void;
  (e: 'toggleIsPriority', id: string): void;
  (e: 'toggleIsDone', id: string): void;
  (e: 'handleDate', date: Date): void;
  (e: 'editTask', id: string): void;
  (e: 'duplicateTask', id: string): void;
  (e: 'addSubtask', id: string): void;
  (e: 'pickerOpen'): void;
}>();

const store = useTasksStore();
const storeProjects = useProjectsStore();
const storeSettings = useSettingsStore();

const route = useRoute();
const { task, taskId } = toRefs(props);
const { getProjectById } = storeToRefs(storeProjects);
const currentProject = getProjectById.value(props.task.projectId);
const isProjectListActive = ref(false);
const date: Ref<Date | undefined> = ref();
const currentDate = computed(() => store.getTaskDate(props.task.id));
const { showInputDetailTime } = useTimeDetail(currentDate);
const datepicker = ref();
const showPicker = ref(false);
const startTime = ref({ hours: 12, minutes: 0 });
const activeStyle = ['active-state', 'active:bg-base-200', 'font-semibold'];
const doneStyle = computed(() => (task.value.isDone ? activeStyle : ''));
const priorityStyle = computed(() => (task.value.isPriority ? activeStyle : ''));

const body = ref();
const calendarOption: Ref<HTMLElement | undefined> = ref();
const dropdown: Ref<HTMLElement | undefined> = ref();
const dropList: Ref<HTMLElement | undefined> = ref();
const { height: listHeight } = useElementBounding(dropList);
const { bottom: dropBottom } = useElementBounding(dropdown);
const { y: bodyY } = useElementBounding(body);
const { height: windowHeight } = useWindowSize();
const SAFE_BOTTOM_MARGIN = 50;
const isRoomForDropdown = computed(
  () => dropBottom.value - windowHeight.value + SAFE_BOTTOM_MARGIN <= -listHeight.value
);

const source = ref(route.fullPath);
const { copy } = useClipboard({ source });

function handleCopyLinkTask(): void {
  copy(`${source.value}/task/${props.task.id}`);
  useNotification(NotificationMessage.CopyLink);
}

function setCustomPosition() {
  return {
    top: props.coords.cardBottom + -bodyY.value,
    left: props.coords.cardX,
  };
}

onMounted(() => {
  body.value = document.body;
});

function handleCalendar() {
  datepicker.value.openMenu();
  emit('pickerOpen');
}

defineExpose({ handleCalendar });

function handleDate(modelData: Date): void {
  date.value = modelData;
  emit('handleDate', date.value);
}

function handleDeleteTask(taskId: string): void {
  blurElement();
  emit('deleteTask', taskId);
}

function handleDuplicateTask(taskId: string): void {
  blurElement();
  emit('duplicateTask', taskId);
}

function handleTogglePriority(taskId: string): void {
  emit('toggleIsPriority', taskId);
}

function handleToggleIsDone(taskId: string): void {
  emit('toggleIsDone', taskId);
}

function handleAddSubtask(taskId: string): void {
  emit('addSubtask', taskId);
}

function handleEditTask(taskId: string): void {
  emit('editTask', taskId);
}

function openProjectList(): void {
  isProjectListActive.value = true;
}

function closeProjectList(): void {
  isProjectListActive.value = false;
}
</script>
