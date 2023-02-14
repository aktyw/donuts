<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <label tabindex="0">
      <slot name="btn"></slot>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu py-0.5 shadow rounded-md w-44 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200"
    >
      <li>
        <button class="btn-md md:btn-sm" :disabled="tasks.length < 2">
          <svg
            class="fill-base-content"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
          >
            <path
              d="M5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V2.775H8.45V5h7.175V2.775h1V5h1.75q.7 0 1.163.463.462.462.462 1.162v12.75q0 .7-.462 1.163-.463.462-1.163.462Zm0-1h12.75q.25 0 .437-.188.188-.187.188-.437v-8.75H5v8.75q0 .25.188.437.187.188.437.188ZM5 9.625h14v-3q0-.25-.188-.437Q18.625 6 18.375 6H5.625q-.25 0-.437.188Q5 6.375 5 6.625Zm0 0V6v3.625Z"
            />
          </svg>
          Sort by Date
        </button>
      </li>
      <li>
        <button class="btn-md md:btn-sm" :disabled="tasks.length < 2">
          <svg
            class="fill-base-content"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
          >
            <path
              d="m2.625 16.575 3.7-9.15H7.35l3.675 9.15H9.9l-.875-2.35h-4.4l-.95 2.35Zm2.325-3.25h3.7l-1.8-4.6h-.1Zm9.175 3.25v-.925l5.2-7.3h-5v-.925h6.2v.925l-5.2 7.3h5.25v.925ZM9.45 4.8 12 2.275 14.55 4.8ZM12 21.725 9.45 19.2h5.1Z"
            />
          </svg>
          Sort by Title
        </button>
      </li>
      <li>
        <button class="btn-md md:btn-sm" :disabled="tasks.length < 2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M13.55 20.7q-.275.3-.7.3-.425 0-.725-.3l-8.8-8.8q-.15-.15-.237-.338Q3 11.375 3 11.15V4q0-.4.3-.7.3-.3.7-.3h7.15q.2 0 .388.075.187.075.337.225l8.8 8.8q.3.3.313.737.012.438-.288.713Zm-.725-.7L20 12.85 11.15 4H4v7.15ZM6.5 7.5q.425 0 .713-.287.287-.288.287-.713t-.287-.713Q6.925 5.5 6.5 5.5t-.713.287Q5.5 6.075 5.5 6.5t.287.713q.288.287.713.287ZM4 4Z"
            />
          </svg>
          Sort by Tag
        </button>
      </li>
      <li id="separator" class="border-1 m-1" aria-hidden="true"></li>
      <li>
        <button
          :disabled="!tasks.length"
          class="btn-md hover:text-error hover:fill-error focus:text-error focus:fill-error md:btn-sm fill-base-content"
          @click="handleDeleteTask(taskId)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M7.625 20q-.675 0-1.15-.475Q6 19.05 6 18.375V6H5V5h4v-.775h6V5h4v1h-1v12.375q0 .7-.462 1.163-.463.462-1.163.462ZM17 6H7v12.375q0 .275.175.45t.45.175h8.75q.25 0 .437-.188.188-.187.188-.437ZM9.8 17h1V8h-1Zm3.4 0h1V8h-1ZM7 6v13-.625Z"
            />
          </svg>
          Delete All Tasks
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStoreTasks } from '@/stores/TasksStore';
import blurElement from '@/helpers/blur';
const store = useStoreTasks();
const tasks = computed(() => store.getAllTasks);

const emits = defineEmits(['deleteTasks']);

function handleDeleteTask() {
  blurElement();
  emits('deleteTasks');
}
</script>
