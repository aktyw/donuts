<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <label tabindex="0">
      <slot name="btn" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu py-0.5 shadow rounded-md w-52 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <li>
        <button
          class="btn-md md:btn-sm"
          :disabled="tasks.length < 2"
          @click="handleSortTasks(SortFilters.Date)">
          <svg
            class="fill-base-content"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V2.775H8.45V5h7.175V2.775h1V5h1.75q.7 0 1.163.463.462.462.462 1.162v12.75q0 .7-.462 1.163-.463.462-1.163.462Zm0-1h12.75q.25 0 .437-.188.188-.187.188-.437v-8.75H5v8.75q0 .25.188.437.187.188.437.188ZM5 9.625h14v-3q0-.25-.188-.437Q18.625 6 18.375 6H5.625q-.25 0-.437.188Q5 6.375 5 6.625Zm0 0V6v3.625Z" />
          </svg>
          Sort by Date
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          :disabled="tasks.length < 2"
          @click="handleSortTasks(SortFilters.Title)">
          <svg
            class="fill-base-content"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="m2.625 16.575 3.7-9.15H7.35l3.675 9.15H9.9l-.875-2.35h-4.4l-.95 2.35Zm2.325-3.25h3.7l-1.8-4.6h-.1Zm9.175 3.25v-.925l5.2-7.3h-5v-.925h6.2v.925l-5.2 7.3h5.25v.925ZM9.45 4.8 12 2.275 14.55 4.8ZM12 21.725 9.45 19.2h5.1Z" />
          </svg>
          Sort by Title
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          :disabled="tasks.length < 2"
          @click="handleSortTasks(SortFilters.Created)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M8 15.425q1.4 0 2.413-1.013Q11.425 13.4 11.425 12t-1.012-2.413Q9.4 8.575 8 8.575T5.588 9.587Q4.575 10.6 4.575 12t1.013 2.412Q6.6 15.425 8 15.425Zm0 1q-1.85 0-3.137-1.288Q3.575 13.85 3.575 12t1.288-3.138Q6.15 7.575 8 7.575q1.725 0 2.963 1.125 1.237 1.125 1.412 2.8h8.55v1h-8.55q-.175 1.675-1.412 2.8Q9.725 16.425 8 16.425ZM8 12Z" />
          </svg>
          Sort by Created Date
        </button>
      </li>
      <li
        id="separator"
        class="border-1 m-1"
        aria-hidden="true" />
      <li>
        <button
          :disabled="!tasks.length"
          class="btn-md hover:text-error hover:fill-error focus:text-error focus:fill-error md:btn-sm fill-base-content"
          @click="handleDeleteTask()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M7.625 20q-.675 0-1.15-.475Q6 19.05 6 18.375V6H5V5h4v-.775h6V5h4v1h-1v12.375q0 .7-.462 1.163-.463.462-1.163.462ZM17 6H7v12.375q0 .275.175.45t.45.175h8.75q.25 0 .437-.188.188-.187.188-.437ZM9.8 17h1V8h-1Zm3.4 0h1V8h-1ZM7 6v13-.625Z" />
          </svg>
          Delete All Tasks
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import blurElement from '@/helpers/blur';
import { SortFilters } from '@/types/models/SortFilters';

const store = useStoreTasks();
const tasks = computed(() => store.getAllTasks);

const emit = defineEmits<{
  (e: 'deleteTasks'): void;
  (e: 'sortTasks', value: SortFilters): void;
}>();

function handleDeleteTask(): void {
  blurElement();
  emit('deleteTasks');
}

function handleSortTasks(type: SortFilters): void {
  emit('sortTasks', type);
}
</script>
