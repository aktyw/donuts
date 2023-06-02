<template>
  <div class="navbar-end hidden md:flex">
    <ul class="flex flex-row items-center gap-4">
      <StatsDropdown />
      <QuickTaskButton @click="isQuickTaskActive = true">
        <template #icon>
          <IconAdd class="fill-base-content" />
        </template>
      </QuickTaskButton>
      <UserDropdown />
    </ul>
  </div>

  <Teleport to="body">
    <TaskQuickAdd
      v-if="isQuickTaskActive"
      @close-editor="handleCloseEditor" />
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import IconAdd from '@/components/icons/IconAdd.vue';
import StatsDropdown from '@/components/stats/dropdown/StatsDropdown.vue';
import TaskQuickAdd from '@/components/tasks/quick-task/QuickTaskAdd.vue';
import QuickTaskButton from '@/components/tasks/quick-task/QuickTaskButton.vue';
import UserDropdown from '@/components/user/dropdown/UserDropdown.vue';

const isQuickTaskActive = ref(false);

function handleCloseEditor(): void {
  isQuickTaskActive.value = false;
}
</script>
