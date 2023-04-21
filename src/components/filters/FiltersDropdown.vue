<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <label tabindex="0">
      <button
        class="w-full hover:bg-base-200 focus:bg-base-200 btn btn-square rounded-md btn-xs bg-base-100 border-0 text-slate-900 font-normal normal-case focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
        <span class="flex flex-row gap-1">
          <IconSettings />
          <span class="inline-flex items-center text-base-content">View</span>
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
          :class="{ 'font-semibold': sortTypeStatus === SortFilters.Default }"
          class="btn-md md:btn-sm"
          @click="store.setSortType(SortFilters.Default)">
          <IconChaos />
          Default
        </button>
      </li>
      <li>
        <button
          :class="{ 'font-semibold': sortTypeStatus === SortFilters.Date }"
          class="btn-md md:btn-sm"
          @click="store.setSortType(SortFilters.Date)">
          <IconCalendarToday />
          Due date
        </button>
      </li>
      <li>
        <button
          :class="{ 'font-semibold': sortTypeStatus === SortFilters.Created }"
          class="btn-md md:btn-sm"
          @click="store.setSortType(SortFilters.Created)">
          <IconStart />
          Added date
        </button>
      </li>
      <li>
        <button
          :class="{ 'font-semibold': sortTypeStatus === SortFilters.Title }"
          class="btn-md md:btn-sm"
          @click="store.setSortType(SortFilters.Title)">
          <IconAlphabet />
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
            @click="store.sortTasksChangeOrder()">
            <IconSouth v-if="sortOrderStatus === SortOrder.Ascending" />
            <IconNorth v-else />
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
            :class="{ 'font-semibold': currentFilter === Filters.All }"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.All)">
            <IconListAlt />
            {{ Filters.All }}
          </button>
        </li>

        <li>
          <button
            :disabled="!tasks.length"
            :class="{ 'font-semibold': currentFilter === Filters.Priority }"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.Priority)">
            <IconImportantSmall />
            {{ Filters.Priority }}
          </button>
        </li>
        <li>
          <button
            :disabled="!tasks.length"
            :class="{ 'font-semibold': currentFilter === Filters.Completed }"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.Completed)">
            <IconCircleCheck />
            {{ Filters.Completed }}
          </button>
        </li>
        <li>
          <button
            :disabled="!tasks.length"
            :class="{ 'font-semibold': currentFilter === Filters.NotCompleted }"
            class="btn-md md:btn-sm"
            @click="store.setFilter(Filters.NotCompleted)">
            <IconCircle />
            {{ Filters.NotCompleted }}
          </button>
        </li>
      </ul>

      <li
        class="border m-1"
        aria-hidden="true" />
      <li class="px-4 py-1.5 font-semibold text-sm">Actions</li>

      <li>
        <button
          :disabled="!tasks.length"
          class="btn-md hover:text-error hover:fill-error focus:text-error focus:fill-error md:btn-sm fill-base-content"
          @click="handleDeleteTask()">
          <IconRecycleBin />
          Delete all
        </button>
      </li>
      <li v-if="sortTypeStatus !== SortFilters.Default">
        <button
          class="btn-md hover:text-error hover:fill-error focus:text-error focus:fill-error md:btn-sm fill-base-content"
          @click="store.resetView()">
          <IconFiltersOff />
          Reset all
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import IconAlphabet from '@/components/icons/IconAlphabet.vue';
import IconCalendarToday from '@/components/icons/IconCalendarToday.vue';
import IconChaos from '@/components/icons/IconChaos.vue';
import IconCircle from '@/components/icons/IconCircle.vue';
import IconCircleCheck from '@/components/icons/IconCircleCheck.vue';
// import Icon from '@/components/icons/Icon.vue';
import IconFiltersOff from '@/components/icons/IconFiltersOff.vue';
import IconImportantSmall from '@/components/icons/IconImportantSmall.vue';
import IconListAlt from '@/components/icons/IconListAlt.vue';
import IconNorth from '@/components/icons/IconNorth.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconSouth from '@/components/icons/IconSouth.vue';
import IconStart from '@/components/icons/IconStart.vue';
import blurElement from '@/helpers/blur';
import { useTasksStore } from '@/stores/TasksStore';
import { Filters } from '@/types/models/Filters';
import { SortFilters, SortOrder } from '@/types/models/Sort';

const store = useTasksStore();
const {
  getAllTasks: tasks,
  getSortType: sortTypeStatus,
  getSortOrder: sortOrderStatus,
  getCurrentFilter: currentFilter,
} = storeToRefs(store);

const emit = defineEmits<{
  (e: 'deleteTasks'): void;
}>();

function handleDeleteTask(): void {
  blurElement();
  emit('deleteTasks');
}
</script>
