<template>
  <form
    id="form"
    class="relative flex lg:flex-row flex-col lg:items-start items-end lg:gap-8 gap-4 [&>(#cal)]:fill-white">
    <input
      ref="taskInput"
      v-model.trim="taskContent"
      v-focus
      type="text"
      maxlength="100"
      placeholder="What's on your mind?"
      class="input input-bordered w-80 md:w-full"
      :class="{ 'pr-36': date, 'pr-8': !date }" />

    <BaseButton
      v-if="largerThanSm"
      :disabled="!taskContent"
      class="btn btn-accent sm:absolute sm:-right-32"
      @click.prevent="addTask">
      <template #default> Add task </template>
    </BaseButton>

    <BaseButton
      v-else-if="smAndSmaller && taskContent"
      class="btn btn-accent btn-circle btn-lg fixed bottom-8 right-8 fill-white z-50"
      @click.prevent="addTask">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          width="40">
          <path
            d="M20 30.833q-.292 0-.5-.208-.208-.208-.208-.5v-9.417H9.875q-.292 0-.5-.208-.208-.208-.208-.5 0-.292.208-.5.208-.208.5-.208h9.417V9.875q0-.292.208-.5.208-.208.5-.208.292 0 .5.208.208.208.208.5v9.417h9.417q.292 0 .5.208.208.208.208.5 0 .292-.208.5-.208.208-.5.208h-9.417v9.417q0 .292-.208.5-.208.208-.5.208Z" />
        </svg>
      </template>
    </BaseButton>

    <div class="absolute h-full right-0 flex justify-between items-center">
      <TaskTimeDetail
        v-if="date && taskContent"
        class="mx-1">
        <template #time>
          <span class="pt-0.5">{{ showInputDetailTime }}</span>
        </template>
      </TaskTimeDetail>
      <BaseButton
        v-if="date && taskContent"
        class="btn-ghost btn-xs hover:bg-transparent p-0 mx-1"
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
        v-if="taskContent"
        class="fill-base-content mr-2"
        @click.prevent="handleCalendar">
        <template #icon>
          <svg
            id="cal"
            class="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V2.775H8.45V5h7.175V2.775h1V5h1.75q.7 0 1.163.463.462.462.462 1.162v5.225h-1v-1.225H5v8.75q0 .25.188.437.187.188.437.188h4.6v1Zm14.65-5.2-1.425-1.45.725-.725q.15-.15.35-.15.2 0 .35.15l.725.725q.175.175.175.363 0 .187-.175.362ZM13 21.625V20.2l5.15-5.15 1.425 1.45-5.15 5.125Zm-8-12h14v-3q0-.25-.188-.437Q18.625 6 18.375 6H5.625q-.25 0-.437.188Q5 6.375 5 6.625Zm0 0V6v3.625Z" />
          </svg>
        </template>
      </BaseButton>
    </div>

    <Datepicker
      v-show="showPicker"
      ref="datepicker"
      v-model="date"
      teleport="#form"
      position="left"
      :min-date="new Date()"
      :start-time="startTime"
      :disabled="!taskContent" />
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import { vFocus } from '@/directives/vAutoFocus';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import TaskTimeDetail from '@/components/tasks/TaskTimeDetail.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useTimeDetail } from '@/composables/useTimeDetail';
import { getBreakpoints } from '@/composables/useBreakpoints';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import { useNotification } from '@/composables/useNotification';

const store = useStoreTasks();
const date: Ref<Date | undefined> = ref();
const datepicker = ref();
const showPicker = ref(false);
const startTime = ref({ hours: 0, minutes: 0 });
const inputTaskDate: Ref<Date | undefined> = ref();
const taskContent = ref('');
const { showInputDetailTime } = useTimeDetail(date);
const taskInput: Ref<HTMLInputElement | null> = ref(null);
const { smAndSmaller, largerThanSm } = getBreakpoints();

watch(date, (newDate) => {
  inputTaskDate.value = newDate;
});

function addTask(): void {
  store.addTask(taskContent.value, inputTaskDate.value);
  taskContent.value = '';
  taskInput.value?.focus();
  datepicker.value?.clearValue();
  useNotification(NotificationMessage.TaskAdd);
}

function handleCalendar(): void {
  datepicker.value?.openMenu();
}

function clearDate(): void {
  datepicker.value?.clearValue();
}
</script>
