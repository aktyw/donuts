<template>
  <TheTooltip
    class="!tooltip-bottom h-full w-full border-r"
    data="Open parent task">
    <RouterLink
      :to="{ params: { taskid: parent?.id } }"
      class="flex h-full w-full items-center justify-center gap-1 transition duration-300 hover:bg-base-200">
      <IconCircle />
      <span>{{ parent?.title.slice(0, 15) }}</span>
    </RouterLink>
  </TheTooltip>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import IconCircle from '@/components/icons/IconCircle.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
import type { Task } from '@/types/models/Task';

const parent = inject<Task>('parentTask');
</script>
