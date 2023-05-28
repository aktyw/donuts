<template>
  <div class="flex w-full justify-end gap-2 border-b border-base-200 pb-3">
    <TheTooltip
      class="!tooltip-top"
      data="Reverse order">
      <button
        class="btn-xs hover:bg-base-200 rounded p-0 outline-custom"
        aria-label="Reverse order"
        @click="toggleSortOrder()">
        <IconSouthSmall
          v-if="sortOrderStatus === SortOrder.Ascending"
          aria-label="Change to descending order" />
        <IconNorthSmall
          v-else
          aria-label="Change to ascending order" />
      </button>
    </TheTooltip>
    <span class="inline-flex items-center text-xs font-semibold">Sorted {{ sortTypeStatus }}</span>
    <TheTooltip
      class="!tooltip-top"
      data="Reset sorting options">
      <button
        class="btn-xs hover:bg-base-200 rounded p-0 outline-custom"
        aria-label="Reset sorting options"
        @click="reset">
        <IconCloseSmall aria-label="Reset sorting options" />
      </button>
    </TheTooltip>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import IconCloseSmall from '@/components/icons/IconCloseSmall.vue';
import IconNorthSmall from '@/components/icons/IconNorthSmall.vue';
import IconSouthSmall from '@/components/icons/IconSouthSmall.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import { useTasksStore } from '@/stores/TasksStore';
import { SortOrder } from '@/types/models/Sort';

const store = useTasksStore();

const { getSortType: sortTypeStatus, getSortOrder: sortOrderStatus } = storeToRefs(store);

function toggleSortOrder(): void {
  store.sortTasksChangeOrder();
}

function reset() {
  store.resetSortSettings();
}
</script>
