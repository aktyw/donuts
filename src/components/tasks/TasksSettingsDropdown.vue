<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <label tabindex="0">
      <button
        class="w-full hover:bg-base-200 focus:bg-base-200 btn btn-square rounded-md btn-xs bg-base-100 border-0 focus:outline focus:outline-1 text-slate-900 font-normal normal-case">
        <span class="flex flex-row gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M6.225 13.5q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062Q5.6 10.5 6.225 10.5t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Zm5.775 0q-.625 0-1.062-.438Q10.5 12.625 10.5 12t.438-1.062Q11.375 10.5 12 10.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm5.775 0q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Z" />
          </svg>
          <span class="inline-flex items-center">View</span>
        </span>
      </button>
    </label>
    <ul
      tabindex="0"
      role="menu"
      aria-label="Show all tasks menu"
      class="dropdown-content menu py-0.5 shadow rounded-md w-52 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <li class="px-4 py-1.5 font-semibold text-sm">Sort</li>
      <li>
        <button
          class="btn-md md:btn-sm"
          @click="handleSortTasks(SortFilters.Default)">
          <svg
            class="fill-base-content"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M16.775 19.775q-1.25 0-2.125-.888-.875-.887-.875-2.112 0-1.25.875-2.125t2.125-.875q1.225 0 2.113.875.887.875.887 2.125 0 1.225-.887 2.112-.888.888-2.113.888Zm0-1q.825 0 1.413-.587.587-.588.587-1.413 0-.825-.587-1.412-.588-.588-1.413-.588-.825 0-1.412.588-.588.587-.588 1.412t.588 1.413q.587.587 1.412.587Zm0-2Zm-9.55 0q-1.225 0-2.112-.888-.888-.887-.888-2.112 0-1.25.888-2.125.887-.875 2.112-.875 1.25 0 2.125.875t.875 2.125q0 1.225-.875 2.112-.875.888-2.125.888Zm0-1q.825 0 1.412-.587.588-.588.588-1.413 0-.825-.588-1.413-.587-.587-1.412-.587t-1.413.587q-.587.588-.587 1.413 0 .825.587 1.413.588.587 1.413.587Zm0-2ZM11 9.375q-1.25 0-2.125-.875T8 6.375q0-1.225.875-2.113.875-.887 2.125-.887t2.125.887Q14 5.15 14 6.375q0 1.25-.875 2.125T11 9.375Zm0-1q.825 0 1.413-.588Q13 7.2 13 6.375t-.587-1.412q-.588-.588-1.413-.588-.825 0-1.412.588Q9 5.55 9 6.375t.588 1.412q.587.588 1.412.588Zm0-2Z" />
          </svg>
          Default
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          @click="handleSortTasks(SortFilters.Date)">
          <svg
            class="fill-base-content"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V2.775H8.45V5h7.175V2.775h1V5h1.75q.7 0 1.163.463.462.462.462 1.162v12.75q0 .7-.462 1.163-.463.462-1.163.462Zm0-1h12.75q.25 0 .437-.188.188-.187.188-.437v-8.75H5v8.75q0 .25.188.437.187.188.437.188ZM5 9.625h14v-3q0-.25-.188-.437Q18.625 6 18.375 6H5.625q-.25 0-.437.188Q5 6.375 5 6.625Zm0 0V6v3.625Z" />
          </svg>
          Due date
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          @click="handleSortTasks(SortFilters.Created)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M8 15.425q1.4 0 2.413-1.013Q11.425 13.4 11.425 12t-1.012-2.413Q9.4 8.575 8 8.575T5.588 9.587Q4.575 10.6 4.575 12t1.013 2.412Q6.6 15.425 8 15.425Zm0 1q-1.85 0-3.137-1.288Q3.575 13.85 3.575 12t1.288-3.138Q6.15 7.575 8 7.575q1.725 0 2.963 1.125 1.237 1.125 1.412 2.8h8.55v1h-8.55q-.175 1.675-1.412 2.8Q9.725 16.425 8 16.425ZM8 12Z" />
          </svg>
          Added date
        </button>
      </li>
      <li>
        <button
          class="btn-md md:btn-sm"
          @click="handleSortTasks(SortFilters.Title)">
          <svg
            class="fill-base-content"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="m2.625 16.575 3.7-9.15H7.35l3.675 9.15H9.9l-.875-2.35h-4.4l-.95 2.35Zm2.325-3.25h3.7l-1.8-4.6h-.1Zm9.175 3.25v-.925l5.2-7.3h-5v-.925h6.2v.925l-5.2 7.3h5.25v.925ZM9.45 4.8 12 2.275 14.55 4.8ZM12 21.725 9.45 19.2h5.1Z" />
          </svg>
          Name
        </button>
      </li>

      <ul v-if="sortTypeStatus !== SortFilters.Default">
        <li
          class="border-1 m-1"
          aria-hidden="true" />

        <li class="px-4 py-1.5 font-semibold text-sm">Order</li>
        <li>
          <button
            class="btn-md md:btn-sm"
            @click="toggleSortOrder()">
            <svg
              v-if="sortOrderStatus === SortOrder.Ascending"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24">
              <path d="m12 20.925-6.35-6.35.7-.7 5.15 5.15V2.9h1v16.125l5.15-5.15.7.7Z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24">
              <path d="M11.5 20.925V4.775L6.35 9.95l-.7-.7L12 2.9l6.35 6.35-.7.725L12.5 4.8v16.125Z" />
            </svg>
            {{ sortOrderStatus }}
          </button>
        </li>

        <li
          class="border m-1"
          aria-hidden="true" />
        <li class="px-4 py-1.5 font-semibold text-sm">Filters</li>

        <li>
          <button
            :disabled="!tasks.length"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.All)">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M4.15 16.65q-.275 0-.462-.188Q3.5 16.275 3.5 16t.188-.463q.187-.187.462-.187t.463.187q.187.188.187.463t-.187.462q-.188.188-.463.188Zm0-4q-.275 0-.462-.188Q3.5 12.275 3.5 12t.188-.463q.187-.187.462-.187t.463.187q.187.188.187.463t-.187.462q-.188.188-.463.188Zm0-4q-.275 0-.462-.188Q3.5 8.275 3.5 8t.188-.463q.187-.187.462-.187t.463.187Q4.8 7.725 4.8 8t-.187.462q-.188.188-.463.188Zm3.075 7.85v-1H20.5v1Zm0-4v-1H20.5v1Zm0-4v-1H20.5v1Z"/></svg>
            {{ Filters.All }}
          </button>
        </li>

        <li>
          <button
            :disabled="!tasks.length"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.Priority)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20">
              <path
                d="M10 15.208q-.292 0-.479-.198-.188-.198-.188-.468 0-.292.198-.48.198-.187.469-.187.292 0 .479.198.188.198.188.469 0 .27-.198.468t-.469.198Zm-.438-3.166V3.958h.876v8.084Z" />
            </svg>
            {{ Filters.Priority }}
          </button>
        </li>
        <li>
          <button
            :disabled="!tasks.length"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.Completed)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24">
              <path
                d="m10.55 15.9 6.4-6.4-.7-.7-5.7 5.7-2.85-2.85-.7.7ZM12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm0-1q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z" />
            </svg>
            {{ Filters.Completed }}
          </button>
        </li>
        <li>
          <button
            :disabled="!tasks.length"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.Uncompleted)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24">
              <path
                d="M12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm0-1q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z" />
            </svg>
            {{ Filters.Uncompleted }}
          </button>
        </li>
      </ul>

      <li
        class="border m-1"
        aria-hidden="true" />
      <li class="px-4 py-1.5 font-semibold text-sm">Tasks</li>

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
          Delete all
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStoreTasks } from '@/stores/TasksStore';
import { storeToRefs } from 'pinia';
import blurElement from '@/helpers/blur';
import { SortFilters, SortOrder } from '@/types/models/Sort';
import { Filters } from '@/types/models/Filters';

const store = useStoreTasks();
const { getAllTasks: tasks, getSortType: sortTypeStatus, getSortOrder: sortOrderStatus } = storeToRefs(store);

const emit = defineEmits<{
  (e: 'deleteTasks'): void;
}>();

function handleDeleteTask(): void {
  blurElement();
  emit('deleteTasks');
}

function handleSortTasks(type: SortFilters): void {
  store.sortTasks(type);
}

function toggleSortOrder(): void {
  store.sortTasksChangeOrder();
}
</script>
