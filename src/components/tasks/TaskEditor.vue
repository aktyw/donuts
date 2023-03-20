import BaseButton from '@/components/ui/BaseButton.vue';
<template>
  <form
    id="form"
    class="relative border w-full rounded-lg focus-within:border-accent-content">
    <div class="p-2">
      <TaskEditorInput
        ref="taskTitleInput"
        v-model.trim="taskTitle"
        v-focus
        type="text"
        maxlength="100"
        placeholder="Task name">
      </TaskEditorInput>
      <TaskEditorInput
        ref="taskDescriptionInput"
        v-model.trim="taskDescription"
        type="text"
        maxlength="240"
        placeholder="Description">
      </TaskEditorInput>
      <div class="mt-2 flex">
        <BaseButton
          class="btn btn-xs btn-ghost rounded border border-base-300 font-normal"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              class="mr-1">
              <path
                d="M12.417 15q-.646 0-1.115-.469t-.469-1.114q0-.646.469-1.115t1.115-.469q.645 0 1.114.469.469.469.469 1.115 0 .645-.469 1.114-.469.469-1.114.469Zm-7.25 1.917q-.479 0-.782-.313-.302-.312-.302-.771V6.167q0-.459.302-.771.303-.313.782-.313H7.5v-2.25H8v2.25h4.083v-2.25h.417v2.25h2.333q.479 0 .782.313.302.312.302.771v9.666q0 .459-.302.771-.303.313-.782.313Zm0-.417h9.666q.25 0 .459-.208.208-.209.208-.459V9.667h-11v6.166q0 .25.208.459.209.208.459.208ZM4.5 9.25h11V6.167q0-.25-.208-.459-.209-.208-.459-.208H5.167q-.25 0-.459.208-.208.209-.208.459Zm0 0V5.5v3.75Z" />
            </svg>
          </template>
        </BaseButton>
        <BaseButton
          v-if="date"
          class="btn-ghost btn-xs p-0 border border-base-300 rounded"
          @click.prevent="clearDate">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24">
              <path d="m6.4 18.3-.7-.7 5.6-5.6-5.6-5.6.7-.7 5.6 5.6 5.6-5.6.7.7-5.6 5.6 5.6 5.6-.7.7-5.6-5.6Z" />
            </svg>
          </template>
        </BaseButton>
        <BaseButton
          class="btn btn-xs btn-ghost rounded border border-base-300 font-normal pl-0.5 ml-3"
          :class="{ 'bg-base-300': taskIsPriority }"
          @click.prevent="togglePriority"
          ><template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20">
              <path
                d="M10 15.208q-.292 0-.479-.198-.188-.198-.188-.468 0-.292.198-.48.198-.187.469-.187.292 0 .479.198.188.198.188.469 0 .27-.198.468t-.469.198Zm-.438-3.166V3.958h.876v8.084Z" />
            </svg>
          </template>
          <template #default>Priority</template></BaseButton
        >
      </div>
    </div>
    <div class="flex justify-between border-t p-2">
      <div>Project</div>
      <div>
        <BaseButton
          class="btn btn-xs border-transparent mr-2 bg-base-200 hover:bg-base-300 text-neutral-focus"
          @click.prevent="closeEditor"
          >Cancel</BaseButton
        >
        <BaseButton
          class="btn btn-xs bg-accent border-transparent hover:bg-accent-focus text-neutral-content"
          :disabled="!taskTitle"
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
      position="right"
      :min-date="new Date()"
      :start-time="startTime" />
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import BaseButton from '@/components/ui/BaseButton.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { vFocus } from '@/directives/vAutoFocus';
import TaskEditorInput from '@/components/tasks/TaskEditorInput.vue';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';

const store = useStoreTasks();
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

const emit = defineEmits<{
  (e: 'closeEditor'): void;
}>();

watch(date, (newDate) => {
  inputTaskDate.value = newDate;
});

function addTask(): void {
  const options = {
    title: taskTitle.value,
    description: taskDescription.value,
    date: date.value,
    isPriority: taskIsPriority.value,
  };

  store.addTask(options);
  taskTitle.value = '';
  taskDescription.value = '';
  taskIsPriority.value = false;
  taskTitleInput.value?.focus();
  datepicker.value?.clearValue();
  clearDate();

  useNotification(NotificationMessage.TaskAdd);
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
</script>
