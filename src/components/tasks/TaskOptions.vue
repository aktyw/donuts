<template>
  <div
    id="drop"
    class="dropdown md:dropdown-bottom dropdown-left h-0">
    <button
      tabindex="0"
      class="btn btn-square rounded-md btn-xs bg-base-100 hover:bg-base-200 border-0 focus:bg-base-200">
      <svg
        class="fill-base-content"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24">
        <path
          d="M12 19.275q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.063q.437-.437 1.062-.437t1.062.437q.438.438.438 1.063t-.438 1.062q-.437.438-1.062.438Zm0-5.775q-.625 0-1.062-.438Q10.5 12.625 10.5 12t.438-1.062Q11.375 10.5 12 10.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm0-5.775q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.063q.437-.437 1.062-.437t1.062.437q.438.438.438 1.063t-.438 1.062q-.437.438-1.062.438Z" />
      </svg>
    </button>
    <ul
      tabindex="0"
      class="dropdown-content menu py-0.5 shadow rounded-md w-52 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <li>
        <button
          class="btn-md md:btn-sm"
          @click="handleEditTask(taskId)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M5.3 19h1.075l9.9-9.9L15.2 8.025l-9.9 9.9ZM18.425 8.375l-2.5-2.475 1.2-1.2q.3-.325.725-.325t.725.325l1.05 1.025q.3.3.3.725t-.3.725ZM17.7 9.1 6.8 20H4.3v-2.5L15.2 6.6Zm-1.975-.55-.525-.525L16.275 9.1Z" />
          </svg>
          Edit Task
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          @click="handleAddSubtask(taskId)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3q1.525 0 2.9.475T17.4 4.8l-.725.75Q15.7 4.8 14.513 4.4 13.325 4 12 4 8.675 4 6.338 6.337 4 8.675 4 12t2.338 5.663Q8.675 20 12 20q.875 0 1.7-.188.825-.187 1.6-.512l.75.75q-.925.45-1.937.7Q13.1 21 12 21Zm7.5-1.5v-3h-3v-1h3v-3h1v3h3v1h-3v3Zm-8.95-3.6L7 12.35l.7-.7 2.85 2.85 9.75-9.75.7.725Z" />
          </svg>
          Add Subtask
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          @click="handleDuplicateTask(taskId)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M13 13.5h1v-3h3v-1h-3v-3h-1v3h-3v1h3ZM8.125 17q-.7 0-1.162-.462-.463-.463-.463-1.163V4.625q0-.7.463-1.163Q7.425 3 8.125 3h10.75q.7 0 1.163.462.462.463.462 1.163v10.75q0 .7-.462 1.163-.463.462-1.163.462Zm0-1h10.75q.25 0 .437-.188.188-.187.188-.437V4.625q0-.25-.188-.437Q19.125 4 18.875 4H8.125q-.25 0-.437.188-.188.187-.188.437v10.75q0 .25.188.437.187.188.437.188Zm-3 4q-.7 0-1.163-.462-.462-.463-.462-1.163V6.625h1v11.75q0 .25.188.437.187.188.437.188h11.75v1ZM7.5 4v12V4Z" />
          </svg>
          Duplicate Task
        </button>
      </li>

      <li
        id="separator"
        class="border-1 m-1"
        aria-hidden="true" />

      <li>
        <button
          class="btn-md md:btn-sm"
          :class="importantStyle"
          @click="handleToggleImportant(taskId)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M12 18.85q-.425 0-.712-.3-.288-.3-.288-.7 0-.425.288-.712.287-.288.712-.288t.713.288q.287.287.287.712 0 .4-.287.7-.288.3-.713.3Zm-.725-3.8V4.15h1.45v10.9Z" />
          </svg>
          Toggle Important
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          :class="doneStyle"
          @click="handleToggleIsDone(taskId)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path d="m9.55 17.3-4.975-4.95.725-.725 4.25 4.25 9.15-9.15.725.725Z" />
          </svg>
          Toggle Done
        </button>
      </li>
      <li
        id="separator"
        class="border-1 m-1"
        aria-hidden="true" />
      <li>
        <Datepicker
          v-show="showPicker"
          ref="datepicker"
          v-model="currentDate"
          :value="date"
          teleport="#drop"
          position="right"
          :min-date="new Date()"
          start-date="currentDate"
          @update:model-value="handleDate" />
        <button
          class="btn-md md:btn-sm"
          @click="handleCalendar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="m15.65 16.35.7-.7-3.85-3.85V7h-1v5.2ZM12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm0-9Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z" />
          </svg>
          Set Date
        </button>
      </li>
      <li>
        <button class="btn-md md:btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M4.5 18.725v-1h2v-7.5q0-2 1.275-3.513Q9.05 5.2 11 4.825v-.7q0-.45.288-.725.287-.275.712-.275t.713.275q.287.275.287.725v.7q1.95.375 3.225 1.887Q17.5 8.225 17.5 10.225v7.5h2v1Zm7.5-7Zm0 9.9q-.65 0-1.137-.462-.488-.463-.488-1.163h3.25q0 .7-.462 1.163-.463.462-1.163.462Zm-4.5-3.9h9v-7.5q0-1.875-1.312-3.188Q13.875 5.725 12 5.725q-1.875 0-3.188 1.312Q7.5 8.35 7.5 10.225Z" />
          </svg>
          Set Reminder
        </button>
      </li>
      <li
        id="separator"
        class="border-1 m-1"
        aria-hidden="true" />
      <li>
        <button
          class="btn-md hover:text-error hover:fill-error focus:text-error focus:fill-error md:btn-sm fill-base-content"
          @click="handleDeleteTask(taskId)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M7.625 20q-.675 0-1.15-.475Q6 19.05 6 18.375V6H5V5h4v-.775h6V5h4v1h-1v12.375q0 .7-.462 1.163-.463.462-1.163.462ZM17 6H7v12.375q0 .275.175.45t.45.175h8.75q.25 0 .437-.188.188-.187.188-.437ZM9.8 17h1V8h-1Zm3.4 0h1V8h-1ZM7 6v13-.625Z" />
          </svg>
          Delete Task
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, ref, toRef } from 'vue';
import type { Ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import blurElement from '@/helpers/blur';
import '@vuepic/vue-datepicker/dist/main.css';

type Props = {
  taskContent: string;
  taskId: string;
  taskIsDone: boolean;
  taskIsImportant: boolean;
  taskDate?: Date;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'deleteTask', id: string): void;
  (e: 'toggleIsImportant', id: string): void;
  (e: 'toggleIsDone', id: string): void;
  (e: 'handleDate', date: Date): void;
  (e: 'editTask', id: string): void;
  (e: 'duplicateTask', id: string): void;
}>();

const { taskId, taskIsDone: isDone, taskIsImportant: isImportant } = toRefs(props);
const date: Ref<Date | undefined> = ref();
const currentDate = toRef(props, 'taskDate');
const datepicker = ref();
const showPicker = ref(false);
const activeStyle = ['active-state', 'active:bg-base-200', 'focus:fill-accent', 'fill-accent', 'text-accent'];
const doneStyle = computed(() => (isDone.value ? activeStyle : ''));
const importantStyle = computed(() => (isImportant.value ? activeStyle : ''));

function handleDate(modelData: Date): void {
  date.value = modelData;
  emit('handleDate', date.value);
}

function handleCalendar(): void {
  datepicker.value.openMenu();
}

function handleDeleteTask(taskId: string): void {
  blurElement();
  emit('deleteTask', taskId);
}

function handleDuplicateTask(taskId: string): void {
  emit('duplicateTask', taskId);
}

function handleToggleImportant(taskId: string): void {
  emit('toggleIsImportant', taskId);
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
