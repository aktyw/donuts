<template>
  <TheTooltip
    class="!tooltip-top w-full h-full border-r"
    data="Open parent task">
    <RouterLink
      :to="{ params: { taskid: parent?.id } }"
      class="flex gap-1 items-center justify-center w-full h-full hover:bg-base-200 transition duration-300">
      <IconCircle />
      <span>{{ parent?.title }}</span>
    </RouterLink>
  </TheTooltip>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import IconCircle from '@/components/icons/IconCircle.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import type { Task } from '@/types/models/Task';

const parent = inject<Task>('parentTask');
</script>
