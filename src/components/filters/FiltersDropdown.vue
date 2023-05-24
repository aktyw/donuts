<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <label
      tabindex="0"
      class="outline-custom">
      <button
        tabindex="1"
        class="w-full hover:bg-base-200 focus:bg-base-200 btn btn-square rounded-md btn-xs bg-base-100 border-0 text-slate-900 font-normal normal-case outline-custom">
        <span class="flex flex-row gap-1">
          <IconSettings />
          <span class="inline-flex items-center text-base-content">View</span>
        </span>
      </button>
    </label>
    <ul
      tabindex="1"
      role="menu"
      aria-label="Show all tasks menu"
      class="dropdown-content menu py-0.5 shadow rounded-md w-52 bg-base-100 border border-base-300 text-base-content fill-base-content">
      <FiltersDropdownHeading :is-first="true">Sort</FiltersDropdownHeading>
      <FiltersDropdownButtonItem
        :is-active="sortTypeStatus === SortFilters.Default"
        @action="store.setSortType(SortFilters.Default)">
        <IconChaos />
        Default
      </FiltersDropdownButtonItem>
      <FiltersDropdownButtonItem
        :is-active="sortTypeStatus === SortFilters.Date"
        @action="store.setSortType(SortFilters.Date)">
        <IconCalendarToday />
        Due date
      </FiltersDropdownButtonItem>
      <FiltersDropdownButtonItem
        :is-active="sortTypeStatus === SortFilters.Created"
        @action="store.setSortType(SortFilters.Created)">
        <IconStart />
        Added date
      </FiltersDropdownButtonItem>
      <FiltersDropdownButtonItem
        :is-active="sortTypeStatus === SortFilters.Title"
        @action="store.setSortType(SortFilters.Title)">
        <IconAlphabet />
        Name
      </FiltersDropdownButtonItem>

      <ul v-if="sortTypeStatus !== SortFilters.Default && tasks.length > 0">
        <BaseDividerSmall />

        <FiltersDropdownHeading>Order</FiltersDropdownHeading>
        <FiltersDropdownButtonItem @action="store.sortTasksChangeOrder()">
          <IconSouth v-if="sortOrderStatus === SortOrder.Ascending" />
          <IconNorth v-else />
          {{ sortOrderStatus }}
        </FiltersDropdownButtonItem>
        <BaseDividerSmall />

        <FiltersDropdownHeading>Filters</FiltersDropdownHeading>
        <FiltersDropdownButtonItem
          :is-active="currentFilter === Filters.Active"
          @action="store.setFilter(Filters.Active)">
          <IconCircle />
          {{ Filters.Active }}
        </FiltersDropdownButtonItem>
        <FiltersDropdownButtonItem
          :is-active="currentFilter === Filters.Completed"
          @action="store.setFilter(Filters.Completed)">
          <IconCircleCheck />
          {{ Filters.Completed }}
        </FiltersDropdownButtonItem>
        <FiltersDropdownButtonItem
          :is-active="currentFilter === Filters.Priority"
          @action="store.setFilter(Filters.Priority)">
          <IconImportantSmall />
          {{ Filters.Priority }}
        </FiltersDropdownButtonItem>
        <FiltersDropdownButtonItem
          :is-active="currentFilter === Filters.All"
          @action="store.setFilter(Filters.All)">
          <IconListAlt />
          {{ Filters.All }}
        </FiltersDropdownButtonItem>
      </ul>
      <BaseDividerSmall v-if="sortTypeStatus !== SortFilters.Default || currentProject" />

      <FiltersDropdownHeading v-if="sortTypeStatus !== SortFilters.Default || currentProject"
        >Actions</FiltersDropdownHeading
      >
      <FiltersDropdownButtonItem
        v-if="tasks && currentProject"
        :disabled="!tasks.length"
        :is-danger="true"
        @action="handleDeleteTasks()">
        <IconRecycleBin />
        Delete all
      </FiltersDropdownButtonItem>
      <FiltersDropdownButtonItem
        v-if="sortTypeStatus !== SortFilters.Default"
        :is-danger="true"
        @action="store.resetView()">
        <IconFiltersOff />
        Reset all
      </FiltersDropdownButtonItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { inject, type Ref } from 'vue';

import BaseDividerSmall from '@/components/base/BaseDividerSmall.vue';
import FiltersDropdownButtonItem from '@/components/filters/FiltersDropdownButtonItem.vue';
import FiltersDropdownHeading from '@/components/filters/FiltersDropdownHeading.vue';
import IconAlphabet from '@/components/icons/IconAlphabet.vue';
import IconCalendarToday from '@/components/icons/IconCalendarToday.vue';
import IconChaos from '@/components/icons/IconChaos.vue';
import IconCircle from '@/components/icons/IconCircle.vue';
import IconCircleCheck from '@/components/icons/IconCircleCheck.vue';
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
import type { Project } from '@/types/models/Projects';
import { SortFilters, SortOrder } from '@/types/models/Sort';
import type { Task } from '@/types/models/Task';

const store = useTasksStore();

const {
  getSortType: sortTypeStatus,
  getSortOrder: sortOrderStatus,
  getCurrentFilter: currentFilter,
} = storeToRefs(store);

const tasks = inject<Task[]>('tasks') ?? [];
const currentProject = inject<Ref<Project>>('currentProject');

const emit = defineEmits<{
  (e: 'deleteTasks', currentProject?: Project): void;
}>();

function handleDeleteTasks(): void {
  blurElement();
  emit('deleteTasks', currentProject?.value);
}
</script>
