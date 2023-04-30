<template>
  <BaseDropdown class="flex items-center w-full h-full hover:bg-base-200">
    <template #icon>
      <IconSubTask />
    </template>
    <template #content> {{ subtasks.length }}</template>
    <template #list>
      <li
        v-for="sub in subtasks"
        :key="sub.id">
        {{ sub.title }}
      </li>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import IconSubTask from '@/components/icons/IconSubTask.vue';
import type { Task } from '@/types/models/Task';

type Props = {
  subtasks: Task[];
};

defineProps<Props>();
</script>
