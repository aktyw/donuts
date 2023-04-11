<template>
  <div
    ref="dropdown"
    class="dropdown dropdown-left h-0 overflow-visible"
    :class="!isRoomForDropdown ? 'dropdown-top' : 'dropdown-bottom'">
    <button
      tabindex="0"
      aria-label="Show task options"
      class="btn btn-square rounded-md btn-xs bg-base-100 hover:bg-base-200 border-0 focus:bg-base-200">
      <IconVerticalDots class="fill-base-content" />
    </button>

    <ul
      ref="dropList"
      role="menu"
      tabindex="0"
      class="dropdown-content menu py-0.5 shadow rounded-md w-52 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <OptionListButton @click="handleEditTask(taskId)">
        <template #icon>
          <IconPen />
        </template>
        <template #default>Edit Task</template>
      </OptionListButton>

      <OptionListButton @click="handleAddSubtask(taskId)">
        <template #icon>
          <IconAddSubtask />
        </template>
        <template #default>Add Subtask</template>
      </OptionListButton>

      <OptionListButton @click="handleDuplicateTask(taskId)">
        <template #icon>
          <IconDuplicate />
        </template>
        <template #default>Duplicate Task</template>
      </OptionListButton>

      <BaseDividerSmall />

      <OptionListButton
        :class="priorityStyle"
        @click="handleTogglePriority(taskId)">
        <template #icon>
          <IconImportant />
        </template>
        <template #default>Toggle Priority</template>
      </OptionListButton>

      <OptionListButton
        :class="doneStyle"
        @click="handleToggleIsDone(taskId)">
        <template #icon>
          <IconDone />
        </template>
        <template #default>Toggle Done</template>
      </OptionListButton>

      <BaseDividerSmall />

      <Datepicker
        v-show="showPicker"
        ref="datepicker"
        :value="currentDate"
        :teleport="true"
        :alt-position="setCustomPosition"
        :min-date="new Date()"
        :start-time="startTime"
        @update:model-value="handleDate" />
      <OptionListButton
        ref="calendarOption"
        @click="handleCalendar">
        <template #icon>
          <IconClock />
        </template>
        <template #default>{{ showInputDetailTime || 'Set Date' }}</template>
      </OptionListButton>

      <OptionListButton>
        <template #icon>
          <IconBell />
        </template>
        <template #default>Set Reminder</template>
      </OptionListButton>

      <BaseDividerSmall />

      <OptionListButton
        class="hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content"
        @click="handleDeleteTask(taskId)">
        <template #icon>
          <IconRecycleBin />
        </template>
        <template #default>Delete Task</template>
      </OptionListButton>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { Task } from '@/types/models/Task';
import Datepicker from '@vuepic/vue-datepicker';
import blurElement from '@/helpers/blur';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { useTasksStore } from '@/stores/TasksStore';
import { useElementBounding, useWindowSize } from '@vueuse/core';
import IconVerticalDots from '@/components/icons/IconVerticalDots.vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconDuplicate from '@/components/icons/IconDuplicate.vue';
import IconImportant from '@/components/icons/IconImportant.vue';
import IconAddSubtask from '@/components/icons/IconAddSubtask.vue';
import IconDone from '@/components/icons/IconDone.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconBell from '@/components/icons/IconBell.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import BaseDividerSmall from '@/components/ui/BaseDividerSmall.vue';
import OptionListButton from '@/components/tasks/OptionListButton.vue';

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
  (e: 'pickerOpen'): void;
}>();

const store = useTasksStore();
const { task, taskId } = toRefs(props);

const date: Ref<Date | undefined> = ref();
const currentDate = computed(() => store.getTaskDate(props.task.id));
const { showInputDetailTime } = useTimeDetail(currentDate);
const datepicker = ref();
const showPicker = ref(false);
const startTime = ref({ hours: 12, minutes: 0 });

const activeStyle = ['active-state', 'active:bg-base-200', 'font-semibold'];
const doneStyle = computed(() => (task.value.done ? activeStyle : ''));
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
  console.log('sub', taskId);
}

function handleEditTask(taskId: string): void {
  emit('editTask', taskId);
}
</script>
