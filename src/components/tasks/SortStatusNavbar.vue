<template>
  <div class="flex w-full justify-end gap-2 border-b border-base-200 pb-3">
    <button
      class="btn-xs hover:bg-base-200 rounded p-0"
      @click="toggleSortOrder()">
      <svg
        v-if="sortOrderStatus === SortOrder.Ascending"
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20">
        <path d="m10 17.542-5.229-5.209.771-.771 3.916 3.917V2.375h1.084v13.104l3.916-3.937.771.791Z" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20">
        <path d="M9.458 17.542V4.438L5.542 8.375l-.771-.771L10 2.375l5.229 5.229-.771.771-3.916-3.917v13.084Z" />
      </svg>
    </button>
    <span class="text-xs font-semibold inline-flex items-center">Sorted {{ sortTypeStatus }}</span>
    <button
      class="btn-xs hover:bg-base-200 rounded p-0"
      @click="reset">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20">
        <path
          d="m6.062 14.708-.77-.77L9.229 10 5.292 6.062l.77-.77L10 9.229l3.938-3.937.77.77L10.771 10l3.937 3.938-.77.77L10 10.771Z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStoreTasks } from '@/stores/TasksStore';
import { storeToRefs } from 'pinia';
import { SortOrder } from '@/types/models/Sort';

const store = useStoreTasks();

const { getSortType: sortTypeStatus, getSortOrder: sortOrderStatus } = storeToRefs(store);

function toggleSortOrder(): void {
  store.sortTasksChangeOrder();
}

function reset() {
  store.sortToDefault();
}
</script>
