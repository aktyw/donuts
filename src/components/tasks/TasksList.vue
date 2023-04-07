<template>
  <section class="w-full">
    <!-- <ul
      v-if="allowDrag"
      class="w-1/4">
      <draggable
        v-model="store.tasks.default"
        item-key="id"
        @start="drag = true"
        @end="drag = false">
        <template #item="{ element }">
          <TaskCard
            :key="element.id"
            :task="element">
          </TaskCard>
        </template>
      </draggable>
    </ul> -->

    <ul>
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task">
      </TaskCard>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTasksStore } from '@/stores/TasksStore';
import { storeToRefs } from 'pinia';
import { SortFilters } from '@/types/models/Sort';
import TaskCard from '@/components/tasks/TaskCard.vue';
import draggable from 'vuedraggable';
import type { Task } from '@/types/models/Task';

type Props = {
  tasks: Task[];
};

const props = defineProps<Props>();

const drag = ref(true);
const allowDrag = computed(() => sortTypeStatus.value === SortFilters.Default);

const store = useTasksStore();
const { getSortType: sortTypeStatus } = storeToRefs(store);
</script>
